import { useCallback, useMemo } from "react";
import MergeRow from "./MergeRow";
import { MergeField } from "./types";
import {
  formatLabel,
  groupMergeFields2Level,
  LEVEL1_LABELS,
  LEVEL2_LABELS,
} from "../utils";
import { Accordion } from "@heroui/react";
import Header from "./Header";
import { Side } from "../types";

type MergeTableProps = {
  fields: MergeField[];
  selection: Record<string, "first" | "second" | "third">;
  onChange: (path: string, side: "first" | "second" | "third") => void;
  handleSelectAll: (side: "first" | "second" | "third") => void;
};

export function PersonMergeTable({
  fields,
  selection,
  onChange,
  handleSelectAll,
}: MergeTableProps) {
  const groups = useMemo(() => groupMergeFields2Level(fields), [fields]);

  const handleSelect = useCallback(
    (path: string, side: Side) => {
      onChange(path, side);
    },
    [onChange],
  );

  return (
    <div className="relative overflow-y-auto w-full">
      <Header
        field={Object.entries(Object.entries(groups)[0][1])[0][1][0]}
        handleSelectAll={handleSelectAll}
      />
      <Accordion hideSeparator allowsMultipleExpanded>
        {Object.entries(groups).map(([lvl1, lvl2Groups]) => (
          <Accordion.Item id={lvl1} key={lvl1}>
            <Accordion.Heading>
              <Accordion.Trigger className="text-xs uppercase font-bold">
                {LEVEL1_LABELS[lvl1] ?? formatLabel(lvl1)}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <Accordion className="text-xs py-2" allowsMultipleExpanded>
                  {Object.entries(lvl2Groups).map(([lvl2, rows]) => (
                    <Accordion.Item id={lvl2} key={lvl2}>
                      <Accordion.Heading>
                        <Accordion.Trigger className="text-xs font-semibold">
                          {LEVEL2_LABELS[lvl2] ?? formatLabel(lvl2)}
                          <Accordion.Indicator />
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body className="text-xs">
                          {rows.map((field) => (
                            <MergeRow
                              key={field.path}
                              field={field}
                              value={selection[field.path]}
                              onSelect={(side) =>
                                handleSelect(field.path, side)
                              }
                              selected={selection[field.path]}
                            />
                          ))}
                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
