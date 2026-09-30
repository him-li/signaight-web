"use client";
import { useCallback } from "react";
import { Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";

export default function NoPersonFallback({
  personNaming,
}: {
  personNaming: string;
}) {
  const { deleteQueries } = useSearchParamsActions();

  const handleReset = useCallback(async () => {
    deleteQueries({});
  }, [deleteQueries]);
  return (
    <div className="m-auto p-5 text-center rounded-2xl text-foreground gap-2">
      <p className="font-semibold">No {personNaming} to display</p>
      <span>
        Please add {personNaming} or{" "}
        <Button
          variant="tertiary"
          onPress={handleReset}
          className="rounded-full"
        >
          <Icons.Undo />
          Reset Search Queries
        </Button>{" "}
        to get started.
      </span>
    </div>
  );
}
