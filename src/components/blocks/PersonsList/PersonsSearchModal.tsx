"use client";
import dynamic from "next/dynamic";
import AnalysisProvider from "@/contexts/analisysContext/AnalysisContext";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import { useAppSelector } from "@/store/store";
import { Modal, type UseOverlayStateReturn } from "@heroui/react";
import { ALL_PROJECTS } from "@/constants/projects";
const PersonsSearchList = dynamic(
  () => import("@/components/blocks/PersonsList/PersonsSearchList"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
type PersonsSearchModalProps = {
  pathname: string;
  state: UseOverlayStateReturn;
  isMergeMode?: boolean;
};

export default function PersonsSearchModal({
  pathname,
  state,
  isMergeMode = false,
}: PersonsSearchModalProps) {
  const projectId = useAppSelector(selectCurrentProjectId)!;

  return (
    <AnalysisProvider
      isNewSearch={state.isOpen}
      projectId={isMergeMode ? ALL_PROJECTS : projectId}
    >
      <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Modal.Backdrop>
          <Modal.Container size="lg">
            <PersonsSearchList pathname={pathname} isMergeMode={isMergeMode} />
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </AnalysisProvider>
  );
}
