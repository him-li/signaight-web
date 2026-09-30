import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import dynamic from "next/dynamic";

const PersonsSearchModal = dynamic(
  () => import("@/components/blocks/PersonsList/PersonsSearchModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function usePersonsSearchModal(
  pathname: string,
  isMergeMode: boolean,
) {
  const state = useOverlayState();
  const modal = useMemo(
    () => (
      <PersonsSearchModal
        state={state}
        pathname={pathname}
        isMergeMode={isMergeMode}
      />
    ),

    [state],
  );
  return { modal, state };
}
