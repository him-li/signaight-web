"use client";
import ErrorBoundary from "@/components/blocks/ErrorBoundary/ErrorBoundary";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ErrorBoundary error={error} />
      </body>
    </html>
  );
}
