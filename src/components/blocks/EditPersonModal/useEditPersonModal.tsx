import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";

const EditPersonModal = dynamic(
  () => import("@/components/blocks/EditPersonModal/EditPersonModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function useEditPersonModal(personId: string) {
  const state = useOverlayState();
  const modal = useMemo(
    () => <EditPersonModal state={state} personId={personId} />,

    [state],
  );

  return { modal, state };
}
