import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";
import type { Person } from "@/types/person/index.interface";
const DeletePersonModal = dynamic(
  () => import("@/components/blocks/DeletePersonModal/DeletePersonModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const DeleteMultiplePersonsModal = dynamic(
  () => import("@/components/blocks/DeletePersonModal/DeleteMultipleModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function useDeletePersonModal(person: Person) {
  const state = useOverlayState();
  const modal = useMemo(
    () => <DeletePersonModal person={person} state={state} />,
    [state],
  );

  return { modal, state };
}
