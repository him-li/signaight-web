import { Button } from "@heroui/react";
import clsx from "clsx";
import { MergeField } from "./types";
import { Side } from "../types";
import { button } from "styles/styles";

type HeaderProps = {
  field: MergeField;
  handleSelectAll: (side: Side) => void;
};

export default function Header({ field, handleSelectAll }: HeaderProps) {
  return (
    <div
      className={clsx(
        "grid text-xs font-semibold sticky top-0 z-10 rounded-xl bg-default-hover/75 backdrop-blur-lg",
        !field.withoutThird
          ? "grid-cols-[1fr_1fr_1fr_1fr_1fr]"
          : "grid-cols-[1fr_1fr_1fr_1fr]",
      )}
    >
      {/* Path */}
      <div className="px-3 py-2 border-r break-all text-pretty flex items-center-safe">
        Field Path
      </div>

      {/* First (optional) */}
      <div className="px-3 py-2 border-r break-all text-pretty flex justify-between items-center-safe">
        First Subject
        <Button
          variant="ghost"
          onPress={() => handleSelectAll("first")}
          size="sm"
          className={button.ghost_accent + " text-xs"}
        >
          Select All
        </Button>
      </div>

      {/* Second */}
      <div className="px-3 py-2 border-r break-all text-pretty flex justify-between items-center-safe">
        Second Subject
        <Button
          variant="ghost"
          onPress={() => handleSelectAll("second")}
          size="sm"
          className={button.ghost_accent + " text-xs"}
        >
          Select All
        </Button>
      </div>

      {/* Third */}
      {field.withoutThird ? null : (
        <div className="px-3 py-2 border-r break-all text-pretty flex justify-between items-center-safe">
          Third Subject
          <Button
            variant="ghost"
            onPress={() => handleSelectAll("third")}
            size="sm"
            className={button.ghost_accent + " text-xs"}
          >
            Select All
          </Button>
        </div>
      )}

      {/* Result */}
      <div className="px-3 py-2 break-all flex items-center-safe">Result</div>
    </div>
  );
}
