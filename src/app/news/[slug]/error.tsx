"use client";

import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-400 mb-8">
          {error.message || "Failed to load the article. Please try again."}
        </p>

        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded-lg border border-[var(--matrix-color-30)] hover:border-[var(--matrix-color)] transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
