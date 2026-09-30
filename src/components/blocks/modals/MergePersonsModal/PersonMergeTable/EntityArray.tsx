import { Tooltip } from "@heroui/react";
import { toHumanTitle } from "../utils";
import { renderValue } from "./MergeRow";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EntityArray({ value }: { value: any[] }) {
  return (
    <div className="space-y-1">
      {value.map((item, idx) =>
        typeof item === "string" ? (
          <Tooltip key={item}>
            <Tooltip.Trigger>
              <span>{item.slice(0, 20)}</span>
            </Tooltip.Trigger>
            <Tooltip.Content>{item}</Tooltip.Content>
          </Tooltip>
        ) : (
          <div key={idx} className="border p-2">
            {Object.entries(item).map(([k, v]) =>
              v ? (
                <div key={k} className="grid grid-cols-[1fr_1fr] gap-2 mb-2">
                  <span className="font-medium">{toHumanTitle(k)}:</span>{" "}
                  <span>{renderValue(v)}</span>
                </div>
              ) : null,
            )}
          </div>
        ),
      )}
    </div>
  );
}
