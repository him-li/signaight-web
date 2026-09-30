import { Button } from "@heroui/react";
import Link from "next/link";
import { Icons } from "@/components/atoms/Icons";
import { ROUTES } from "@/constants/routes";
import type { Person } from "@/types/person/index.interface";

export default function View({ person }: { person: Person }) {
  return (
    <Link href={`${ROUTES.ANALYSIS}/${person?.id}`} className="mx-auto">
      <Button isIconOnly variant="ghost" className="grow rounded-full">
        <Icons.Eye />
      </Button>
    </Link>
  );
}
