import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, artistName, serviceType, message } =
    req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const projectId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    // Create project folder in Dropbox
    await fetch("https://api.dropboxapi.com/2/files/create_folder_v2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: `/${projectId}`,
        autorename: false,
      }),
    });

    // Send notification email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "cikanekmgmt@gmail.com",
      subject: `New Project Submission: ${artistName || firstName} — ${serviceType}`,
      html: `
        <h2>New Project Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Artist Name</td><td style="padding:8px">${artistName || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${serviceType}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Project ID</td><td style="padding:8px">${projectId}</td></tr>
        </table>
        <h3>Message</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ projectId });
  } catch (err) {
    console.error("submit-project error:", err);
    return res.status(500).json({ error: "Failed to submit project" });
  }
}
