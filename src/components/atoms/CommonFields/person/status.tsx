"use client";
import type { ReactNode } from "react";
import { Chip, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import {
  SearchStatusEnum,
  type SearchState,
} from "@/types/person/searchstate.interface";

type SearchStatusMapItem = {
  status: string | boolean;
  content: string;
  icon: ReactNode;
  color: "success" | "danger" | "warning" | "default";
};
const sitesToShow = [
  "localhost",
  "signaight-dev.signaight.ai",
  "signaight.signaight.ai",
];

const searchStatusMap: SearchStatusMapItem[] = [
  {
    status: SearchStatusEnum.error,
    content: sitesToShow.includes(location.host)
      ? SearchStatusEnum.error
      : "Searching",
    icon: <Icons.Cancel />,
    color: "danger",
  },
  {
    status: SearchStatusEnum.timeout,
    content: sitesToShow.includes(location.host)
      ? SearchStatusEnum.timeout
      : "Searching",
    icon: <Icons.TimeOut />,
    color: "danger",
  },
  {
    status: SearchStatusEnum.success,
    content: "Completed",
    icon: <Icons.Check />,
    color: "default",
  },
  {
    status: SearchStatusEnum.in_progress,
    content: "Searching",
    icon: <Icons.Pending />,
    color: "warning",
  },
];

export default function SearchStatus({
  searchState,
}: {
  searchState?: SearchState;
}) {
  const matched = searchStatusMap.find(
    (item) => item.status === searchState?.status,
  );

  if (!matched) return null;

  return (
    <Tooltip isDisabled={searchState?.status !== "Error"}>
      <Tooltip.Content className="bg-danger">
        {searchState?.description}
      </Tooltip.Content>
      <Tooltip.Trigger>
        <Chip variant="tertiary" color={matched.color} className="text-xs">
          {matched.icon}
          {matched.content}
        </Chip>
      </Tooltip.Trigger>
    </Tooltip>
  );
}
