import { Modal } from "@heroui/react";
import GraphLinkAnalysis from "./GraphLinkAnalysis";
import { modal } from "styles/styles";

type LinkAnalysisModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function ProjectLinkAnalysisModal({
  isOpen,
  onClose,
}: LinkAnalysisModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container size="full">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Link Analysis</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <GraphLinkAnalysis />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
