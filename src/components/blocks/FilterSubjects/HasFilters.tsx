import type { ReactNode } from "react";
import { Badge } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { SEARCH_QURIES } from "@/constants/search";

type Props = { children: ReactNode };

const NO_FILTERS_QUERIES = [
  SEARCH_QURIES.PAGE,
  SEARCH_QURIES.ORDER_BY,
  SEARCH_QURIES.ITEM,
];

export default function HasFilters({ children }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);

  let isAvailable = false;
  params.forEach((value, key) => {
    if (!NO_FILTERS_QUERIES.includes(key)) {
      isAvailable = true;
    }
  });

  if (isAvailable) {
    return (
      <Badge.Anchor>
        {children}
        <Badge content="" placement="top-left" color="accent" size="sm" />
      </Badge.Anchor>
    );
  }

  return <>{children}</>;
}
