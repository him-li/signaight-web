import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";
import type { Project } from "@/types/project.interface";

const EditProjectModal = dynamic(
  () => import("@/components/blocks/EditProjectModal/EditProjectModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function useEditProjectModal(project: Project) {
  const state = useOverlayState();
  const modal = useMemo(
    () => <EditProjectModal state={state} item={project} />,

    [state],
  );

  return { modal, state };
}
