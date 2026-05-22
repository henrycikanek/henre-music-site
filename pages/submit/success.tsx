import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SubmitSuccess() {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-white/70 text-lg mb-2">
          Your project has been submitted and payment received.
        </p>
        <p className="text-white/50 mb-8">
          I&apos;ll review your files and get back to you within 24–48 hours.
        </p>

        {session_id && (
          <p className="text-sm text-white/40 mb-8">
            Payment reference:{" "}
            <span className="font-mono">{session_id}</span>
          </p>
        )}

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 border border-white/20 rounded-md hover:bg-white/5 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/submit"
            className="px-6 py-3 bg-accent text-gray-900 rounded-md font-semibold hover:bg-accent/90 transition-colors"
          >
            Submit Another Project
          </Link>
        </div>
      </div>
    </Layout>
  );
}
