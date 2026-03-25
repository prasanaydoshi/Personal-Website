"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="font-mono text-sm mb-8 inline-block transition-opacity hover:opacity-100 cursor-pointer bg-transparent border-none p-0"
      style={{ color: "var(--color-accent-thread)", opacity: 0.7 }}
    >
      &larr; Back to main page
    </button>
  );
}
