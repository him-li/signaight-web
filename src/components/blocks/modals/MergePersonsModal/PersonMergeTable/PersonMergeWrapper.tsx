import { useCallback, useState } from "react";
import { Button, Modal } from "@heroui/react";
import { MergeField } from "./types";
import {
  buildBulkSelection,
  buildInitialSelection,
  unflattenToObject,
} from "../utils";
import { Icons } from "@/components/atoms/Icons";
import { PersonMergeTable } from "./PersonMergeTable";
import { PersonMeta, Side } from "../types";
import { usePersonsMergeActions } from "@/contexts/personsMergeContext/PersonsMergeContext";
import { useTableActions } from "@/contexts/tableContext/TableContext";
import { button } from "styles/styles";

type MergePersonsWrapperProps = {
  fields: MergeField[];
  onClose: () => void;
  personMeta: Record<Side, PersonMeta>;
};

export default function MergePersonsWrapper({
  fields,
  onClose,
  personMeta,
}: MergePersonsWrapperProps) {
  const [selection, setSelection] = useState<Record<string, Side>>(() =>
    buildInitialSelection(fields, personMeta),
  );
  const { mergePersons } = usePersonsMergeActions();
  const { setSelectedKeys } = useTableActions();

  const handleChange = useCallback((path: string, side: Side) => {
    setSelection((prev) =>
      prev[path] === side ? prev : { ...prev, [path]: side },
    );
  }, []);

  const handleSelectAll = useCallback(
    (side: Side) => {
      setSelection(() => buildBulkSelection(fields, side));
    },
    [fields],
  );

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
    mergePersons({ merged_person: flatMergedResult, merge_mode: "manual" });
    setSelectedKeys(new Set([]), false);
    onClose();
  };

  return (
    <>
      <PersonMergeTable
        fields={fields}
        selection={selection}
        onChange={handleChange}
        handleSelectAll={handleSelectAll}
      />
      <Modal.Footer>
        <Button
          variant="ghost"
          onPress={onClose}
          className={button.ghost_danger}
        >
          <Icons.Cancel />
          Cancel
        </Button>
        <Button
          variant="ghost"
          onPress={handleConfirm}
          className={button.ghost_accent}
        >
          <Icons.Merge />
          Confirm
        </Button>
      </Modal.Footer>
    </>
  );
}
