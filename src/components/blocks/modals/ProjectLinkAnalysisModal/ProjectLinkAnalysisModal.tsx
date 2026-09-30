import { Modal, UseOverlayStateReturn } from "@heroui/react";
import GraphLinkAnalysis from "./GraphLinkAnalysis";
import GraphControlsPanel from "./GraphControlsPanel";
import { modal } from "styles/styles";

type LinkAnalysisModalProps = {
  state: UseOverlayStateReturn;
};
export default function ProjectLinkAnalysisModal({
  state,
}: LinkAnalysisModalProps) {
  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Backdrop>
        <Modal.Container size="full">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Connection Graph</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex gap-6 p-2">
              <GraphControlsPanel />
              <GraphLinkAnalysis />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
