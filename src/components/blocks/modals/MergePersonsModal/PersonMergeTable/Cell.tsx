import { Button } from "@heroui/react";
import type { ReactNode } from "react";

export default function Cell({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      onPress={onClick}
      className={`${selected ? "bg-teal-100/75" : ""} text-xs h-full w-full min-h-fit rounded-none text-pretty`}
    >
      {children}
    </Button>
  );
}
