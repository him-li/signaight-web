import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";

const AddProjectModal = dynamic(
  () => import("@/components/blocks/AddProjectModal/AddProjectModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function useAddProjectModal() {
  const state = useOverlayState();
  const modal = <AddProjectModal state={state} />;

  return { modal, state };
}
