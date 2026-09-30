"use client";

import { ThemeProvider } from "next-themes";
import ErrorClient from "./Error";

export default function ErrorBoundary({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableColorScheme
      enableSystem
    >
      <ErrorClient reset={reset} />
    </ThemeProvider>
  );
}
