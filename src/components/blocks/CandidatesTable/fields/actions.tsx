"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button, ButtonGroup, Tooltip } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { Icons } from "@/components/atoms/Icons";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import type { Person } from "@/types/person/index.interface";
import { ROUTES } from "@/constants/routes";
const RefreshSearch = dynamic(() => import("../../../atoms/RefreshSearch"), {
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
    <div className="flex w-fit gap-1">
      <RefreshSearch person={person} />
      <Tooltip>
        <Tooltip.Trigger>
          <Link
            href={`${ROUTES.SCREENING}/${projectId}/evaluation/${person?.id}`}
          >
            <Button isIconOnly variant="ghost">
              <Icons.Eye />
            </Button>
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>View Details</Tooltip.Content>
      </Tooltip>
      <CommentsModal person={person} />
      <ItemMenu person={person} />
    </div>
  );
}
