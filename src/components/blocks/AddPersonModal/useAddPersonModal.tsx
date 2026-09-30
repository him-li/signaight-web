import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";

const AddPersonModal = dynamic(
  () => import("@/components/blocks/AddPersonModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function useAddPersonModal() {
  const state = useOverlayState();
  const modal = useMemo(
    () => <AddPersonModal state={state} />,

    [state],
  );

  return { modal, state };
}
