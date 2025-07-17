"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("reason") || "An unexpected error occurred.";

  return (
    <div className="flex items-center justify-center h-screen text-center p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">❌ Error ❌</h1>
        <p className="text-sm text-gray-600">reason : {message}</p>
      </div>
    </div>
  );
}
