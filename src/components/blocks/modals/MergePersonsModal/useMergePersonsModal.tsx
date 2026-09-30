import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";
const MergePersonsModal = dynamic(
  () =>
    import("@/components/blocks/modals/MergePersonsModal/MergePersonsModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
import type { Person } from "@/types/person/index.interface";

export default function useMergePersonsModal(persons: Person[]) {
  const state = useOverlayState();
  const modal = useMemo(
    () => <MergePersonsModal state={state} persons={persons} />,
    [state],
  );

  return { modal, state };
}
