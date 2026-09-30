import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";
const DeleteProjectModal = dynamic(
  () => import("@/components/blocks/DeleteProjectModal/DeleteProjectModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
import type { Project } from "@/types/project.interface";

export default function useDeleteProjectModal(project: Project) {
  const state = useOverlayState();
  const modal = useMemo(
    () => <DeleteProjectModal state={state} project={project} />,

    [state],
  );

  return { modal, state };
}
