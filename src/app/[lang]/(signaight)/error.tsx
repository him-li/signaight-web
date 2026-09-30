"use client";

import ErrorBoundary from "@/components/blocks/ErrorBoundary/ErrorBoundary";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorBoundary error={error} />;
}
