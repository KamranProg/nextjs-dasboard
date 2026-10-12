"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-red-700">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-red-600">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
