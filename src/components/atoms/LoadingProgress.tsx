"use client";
import { ProgressBar } from "@heroui/react";

export default function LoadingProgress() {
  return (
    <ProgressBar isIndeterminate size="sm">
      <ProgressBar.Output />
      <ProgressBar.Track className="bg-transparent">
        <ProgressBar.Fill className="bg-accent" />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
