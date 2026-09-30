"use client";

import { ProgressBar } from "@heroui/react";

export default function PageLoader() {
  return (
    <ProgressBar
      aria-label="Page Loader"
      size="sm"
      isIndeterminate
      className="fixed top-0 w-full z-50 gap-0"
    >
      <ProgressBar.Track className="h-full">
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
