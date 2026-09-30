"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button, ButtonGroup } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { Icons } from "@/components/atoms/Icons";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import type { Person } from "@/types/person/index.interface";
import { ROUTES } from "@/constants/routes";

const MarkPerson = dynamic(() => import("@/components/blocks/MarkPerson"), {
  loading: () => <div />,
  ssr: false,
});
const CommentsModal = dynamic(
  () => import("@/components/blocks/CommentsModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const ItemMenu = dynamic(() => import("@/components/blocks/ItemMenu"), {
  ssr: false,
  loading: () => <div />,
});

export default function Actions({ person }: { person: Person }) {
  const projectId = useAppSelector(selectCurrentProjectId);

  return (
    <div className="flex items-center-safe">
      <MarkPerson person={person} />
      <Link href={`${ROUTES.SCREENING}/${projectId}/evaluation/${person?.id}`}>
        <Button isIconOnly variant="ghost">
          <Icons.Eye />
        </Button>
      </Link>
      <CommentsModal person={person} />
      <ItemMenu person={person} />
    </div>
  );
}
