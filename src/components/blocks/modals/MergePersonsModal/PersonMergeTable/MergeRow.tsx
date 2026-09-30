import { Avatar, Link, Tooltip } from "@heroui/react";
import ImageZoom from "@/components/atoms/ImageZoom";
import clsx from "clsx";
import { MergeField } from "./types";
import Cell from "./Cell";
import { isEmpty, isImageUrl, isLinkUrl, toHumanTitle } from "../utils";
import React from "react";
import EntityArray from "./EntityArray";
import EntityObject from "./EntityObject";
import { Side } from "../types";

type MergeRowProps = {
  field: MergeField;
  value?: Side;
  onSelect: (side: Side) => void;
  selected: Side;
};

export function renderValue(value: unknown) {
  if (isEmpty(value)) {
    return <span className="italic">—</span>;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return <EntityObject value={value} />;
  }
  if (Array.isArray(value)) {
    return <EntityArray value={value} />;
  }

  if (isImageUrl(value)) {
    return (
      <ImageZoom src={value}>
        <Avatar>
          <Avatar.Image alt="profile" src={value} />
        </Avatar>
      </ImageZoom>
    );
  }

  if (isLinkUrl(value)) {
    return (
      <Tooltip>
        <Tooltip.Trigger>
          <Link href={value} className="rounded-full">
            Link
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>{value}</Tooltip.Content>
      </Tooltip>
    );
  }

  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);

  return <span className="text-xs break-all">{JSON.stringify(value)}</span>;
}

function MergeRow({ field, value, onSelect }: MergeRowProps) {
  const resultValue =
    value === "first"
      ? field.firstValue
      : value === "second"
        ? field.secondValue
        : value === "third"
          ? field.thirdValue
          : undefined;

  return (
    <div
      className={clsx(
        "grid text-xs",
        !field.withoutThird
          ? "grid-cols-[1fr_1fr_1fr_1fr_1fr]"
          : "grid-cols-[1fr_1fr_1fr_1fr]",
      )}
    >
      {/* Path */}
      <div className="px-3 py-2 border-r break-all">
        {toHumanTitle(field.path)}
      </div>

      {/* First (optional) */}
      <Cell selected={value === "first"} onClick={() => onSelect("first")}>
        {renderValue(field.firstValue)}
      </Cell>

      {/* Second */}
      <Cell selected={value === "second"} onClick={() => onSelect("second")}>
        {renderValue(field.secondValue)}
      </Cell>

      {/* Third */}
      {field.withoutThird ? null : (
        <Cell selected={value === "third"} onClick={() => onSelect("third")}>
          {renderValue(field.thirdValue)}
        </Cell>
      )}

      {/* Result */}
      <div className="px-3 py-2 font-medium break-all text-center">
        {renderValue(resultValue)}
      </div>
    </div>
  );
}

const MergeRowMemo = React.memo(MergeRow);

export default MergeRowMemo;
