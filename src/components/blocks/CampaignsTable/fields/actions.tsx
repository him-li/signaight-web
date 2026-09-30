import Link from "next/link";
import { Button, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { Project } from "@/types/project.interface";
import { ROUTES } from "@/constants/routes";
import useEditProjectModal from "@/components/blocks/EditProjectModal/useEditProjectModal";
import useDeleteProjectModal from "@/components/blocks/DeleteProjectModal/useDeleteProjectModal";

export default function Actions({ item }: { item: Project }) {
  const { modal: EditProjectModal, state: editState } =
    useEditProjectModal(item);
  const { modal: DeleteProjectModal, state: deleteState } =
    useDeleteProjectModal(item);
  return (
    <div className="w-fit h-full flex justify-between items-center-safe">
      <Tooltip>
        <Tooltip.Trigger>
          <Link
            aria-label="Campaign Settings"
            href={`${ROUTES.SCREENING}/${item.id}/settings`}
          >
            <Button isIconOnly variant="ghost">
              <Icons.Settings />
            </Button>
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>Campaign Settings</Tooltip.Content>
      </Tooltip>
      {item ? (
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              variant="ghost"
              onPress={editState.open}
              className="rounded-full"
            >
              <Icons.Edit />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Edit</Tooltip.Content>
        </Tooltip>
      ) : null}
      {item ? (
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              variant="ghost"
              onPress={deleteState.open}
              className="rounded-full"
            >
              <Icons.Delete />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Delete</Tooltip.Content>
        </Tooltip>
      ) : null}
      {EditProjectModal}
      {DeleteProjectModal}
    </div>
  );
}
