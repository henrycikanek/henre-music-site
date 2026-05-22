import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.DROPBOX_REFRESH_TOKEN!,
      client_id: process.env.DROPBOX_APP_KEY!,
      client_secret: process.env.DROPBOX_APP_SECRET!,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to refresh Dropbox token: ${err}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  return cachedToken!;
}

async function readBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const action = req.query.action as string;

  try {
    const token = await getAccessToken();

    if (action === "start") {
      const response = await fetch(
        "https://content.dropboxapi.com/2/files/upload_session/start",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Dropbox-API-Arg": JSON.stringify({ close: false }),
            "Content-Type": "application/octet-stream",
          },
          body: Buffer.alloc(0),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(data));
      return res.status(200).json({ sessionId: data.session_id });
    }

    if (action === "append") {
      const sessionId = req.query.sessionId as string;
      const offset = parseInt(req.query.offset as string, 10);
      const body = await readBody(req);

      const response = await fetch(
        "https://content.dropboxapi.com/2/files/upload_session/append_v2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Dropbox-API-Arg": JSON.stringify({
              cursor: { session_id: sessionId, offset },
              close: false,
            }),
            "Content-Type": "application/octet-stream",
          },
          body,
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
      }
      return res.status(200).json({ ok: true });
    }

    if (action === "finish") {
      const sessionId = req.query.sessionId as string;
      const offset = parseInt(req.query.offset as string, 10);
      const path = req.query.path as string;

      const response = await fetch(
        "https://content.dropboxapi.com/2/files/upload_session/finish",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Dropbox-API-Arg": JSON.stringify({
              cursor: { session_id: sessionId, offset },
              commit: {
                path,
                mode: "add",
                autorename: true,
                mute: false,
              },
            }),
            "Content-Type": "application/octet-stream",
          },
          body: Buffer.alloc(0),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(data));
      return res.status(200).json({ name: data.name, size: data.size });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (err) {
    console.error("dropbox upload error:", err);
    return res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Upload failed" });
  }
}
