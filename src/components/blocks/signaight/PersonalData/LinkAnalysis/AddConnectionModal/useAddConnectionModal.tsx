import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";

const AddConnectionModal = dynamic(() => import("."), {
  loading: () => <div />,
  ssr: false,
});

export default function useAddConnectionModal() {
  const state = useOverlayState();
  const modal = useMemo(() => <AddConnectionModal state={state} />, [state]);
  return { modal, state };
}
