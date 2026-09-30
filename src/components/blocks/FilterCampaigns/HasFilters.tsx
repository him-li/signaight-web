import { ReactNode, useMemo } from "react";
import { Badge } from "@heroui/react";
import { useSearchParams } from "next/navigation";

type Props = { children: ReactNode };

export default function HasFilters({ children }: Props) {
  const searchParams = useSearchParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(searchParams!);

  const isAvailable = useMemo(
    () => params.get("title__like") || params.get("description__like"),
    [params],
  );

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
