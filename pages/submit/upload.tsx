import Layout from "@/components/Layout";
import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { services, formatPrice } from "@/data/services";

const CHUNK_SIZE = 4 * 1024 * 1024; // 4 MB

interface FileUpload {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

async function uploadFile(
  file: File,
  projectId: string,
  onProgress: (pct: number) => void
) {
  // Start upload session
  const startRes = await fetch("/api/dropbox/upload?action=start", {
    method: "POST",
  });
  if (!startRes.ok) throw new Error("Failed to start upload session");
  const { sessionId } = await startRes.json();

  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let offset = 0;

  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(offset, offset + CHUNK_SIZE);
    const buf = await chunk.arrayBuffer();

    const appendRes = await fetch(
      `/api/dropbox/upload?action=append&sessionId=${sessionId}&offset=${offset}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: buf,
      }
    );
    if (!appendRes.ok) throw new Error(`Failed to upload chunk ${i + 1}`);

    offset += buf.byteLength;
    onProgress(Math.round(((i + 1) / totalChunks) * 100));
  }

  const path = `/Submissions/${projectId}/${file.name}`;
  const finishRes = await fetch(
    `/api/dropbox/upload?action=finish&sessionId=${sessionId}&offset=${offset}&path=${encodeURIComponent(path)}`,
    { method: "POST" }
  );
  if (!finishRes.ok) throw new Error("Failed to finalize upload");
  return finishRes.json();
}

export default function UploadPage() {
  const router = useRouter();
  const { projectId, service } = router.query as {
    projectId?: string;
    service?: string;
  };

  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedService = services.find((s) => s.id === service);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const additions: FileUpload[] = Array.from(newFiles).map((file) => ({
      file,
      progress: 0,
      status: "pending" as const,
    }));
    setFiles((prev) => [...prev, ...additions]);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const startUpload = async () => {
    if (!projectId || files.length === 0) return;
    setIsUploading(true);

    const updated = [...files];
    let allSucceeded = true;

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === "done") continue;
      updated[i].status = "uploading";
      setFiles([...updated]);

      try {
        await uploadFile(updated[i].file, projectId, (pct) => {
          updated[i].progress = pct;
          setFiles([...updated]);
        });
        updated[i].status = "done";
        updated[i].progress = 100;
      } catch (err) {
        updated[i].status = "error";
        updated[i].error =
          err instanceof Error ? err.message : "Upload failed";
        allSucceeded = false;
      }
      setFiles([...updated]);
    }

    setIsUploading(false);
    if (allSucceeded) setAllDone(true);
  };

  const proceedToCheckout = async () => {
    if (!selectedService) return;
    setCheckoutLoading(true);

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          projectId,
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setCheckoutLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-accent mb-2 tracking-wide">
          UPLOAD FILES
        </h1>
        {selectedService && (
          <p className="text-white/80 mb-8">
            Service: <span className="text-accent font-medium">{selectedService.name}</span> ({formatPrice(selectedService.price)})
          </p>
        )}

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 sm:p-12 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-accent bg-accent/10"
              : "border-gray-600 hover:border-gray-400"
          }`}
        >
          <svg
            className="mx-auto h-12 w-12 text-white/40 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-white/70 text-base sm:text-lg mb-1">
            Drag & drop files here, or tap to browse
          </p>
          <p className="text-white/40 text-sm">
            WAV, AIFF, FLAC, MP3, or any audio format
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={onFileSelect}
            className="hidden"
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-8 space-y-3">
            {files.map((f, i) => (
              <div
                key={`${f.file.name}-${i}`}
                className="bg-gray-900 rounded-lg p-4 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{f.file.name}</p>
                  <p className="text-sm text-white/50">
                    {formatFileSize(f.file.size)}
                  </p>
                </div>

                {(f.status === "uploading" || f.status === "done") && (
                  <div className="w-32 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                    {f.status === "done" ? (
                      <span className="text-green-400 text-xs font-medium whitespace-nowrap">Done</span>
                    ) : (
                      <span className="text-xs text-white/50 whitespace-nowrap">{f.progress}%</span>
                    )}
                  </div>
                )}

                {f.status === "error" && (
                  <span className="text-red-400 text-sm">{f.error}</span>
                )}

                {f.status === "pending" && !isUploading && (
                  <button
                    onClick={() => removeFile(i)}
                    className="text-white/40 hover:text-white transition"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {!allDone && (
            <button
              onClick={startUpload}
              disabled={files.length === 0 || isUploading}
              className={`w-full sm:w-auto px-10 py-4 text-lg font-semibold rounded-lg transition-all ${
                files.length === 0 || isUploading
                  ? "bg-gray-700 text-white/40 cursor-not-allowed"
                  : "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-accent/40"
              }`}
            >
              {isUploading ? "Uploading..." : `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`}
            </button>
          )}

          {allDone && selectedService && (
            <button
              onClick={proceedToCheckout}
              disabled={checkoutLoading}
              className="w-full sm:w-auto px-10 py-4 text-lg bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all"
            >
              {checkoutLoading
                ? "Redirecting to checkout..."
                : `Proceed to Payment — ${formatPrice(selectedService.price)}`}
            </button>
          )}

          {allDone && !selectedService && (
            <div className="bg-green-800/40 border border-green-700 text-white p-4 rounded-lg">
              Files uploaded successfully! We&apos;ll be in touch about your project.
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-white/10">
          <h3 className="font-bold mb-3">File Guidelines</h3>
          <ul className="text-white/60 text-sm space-y-2">
            <li>
              <strong className="text-white/80">Mixing:</strong> Tracked-out
              stems in WAV format (24-bit, 48kHz minimum). Label each stem
              clearly.
            </li>
            <li>
              <strong className="text-white/80">Mastering:</strong> Final stereo
              mix with at least 3–6 dB of headroom. No limiting on the master
              bus.
            </li>
            <li>
              <strong className="text-white/80">Production:</strong> Reference
              tracks, demos, or notes on the style/direction you&apos;re going for.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
