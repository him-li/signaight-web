import { useEffect, useRef, useState } from "react";
import { MergeField } from "./types";
import { buildInitialSelection, unflattenToObject } from "../utils";
import { PersonMeta, Side } from "../types";
import { usePersonsMergeActions } from "@/contexts/personsMergeContext/PersonsMergeContext";
import { useTableActions } from "@/contexts/tableContext/TableContext";

type MergePersonsWrapperProps = {
  fields: MergeField[];
  onClose: () => void;
  personMeta: Record<Side, PersonMeta>;
};

export default function AutoMergePersonsWrapper({
  fields,
  onClose,
  personMeta,
}: MergePersonsWrapperProps) {
  const autoMergeRanRef = useRef(false);
  const [selection] = useState<Record<string, Side>>(() =>
    buildInitialSelection(fields, personMeta),
  );
  const { mergePersons } = usePersonsMergeActions();
  const { setSelectedKeys } = useTableActions();

  const handleConfirm = () => {
    const merged: Record<string, unknown> = {};

    for (const field of fields) {
      const side = selection[field.path];
      if (!side) continue;

      merged[field.path] =
        side === "first"
          ? field.firstValue
          : side === "second"
            ? field.secondValue
            : field.thirdValue;
    }

    const flatMergedResult = unflattenToObject(merged);
    mergePersons({ merged_person: flatMergedResult, merge_mode: "auto" });
    setSelectedKeys(new Set([]), false);
    onClose();
  };

  useEffect(() => {
    if (autoMergeRanRef.current) return;
    if (!fields?.length || !personMeta) return;
    autoMergeRanRef.current = true;
    handleConfirm();
  }, []);

  return null;
}
