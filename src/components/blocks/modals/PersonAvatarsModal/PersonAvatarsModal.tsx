import { Modal } from "@heroui/react";
import PersonAvatars from "./PersonAvatars";
import { modal } from "styles/styles";

type LinkAnalysisModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PersonAvatarsModal({
  isOpen,
  onClose,
}: LinkAnalysisModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container scroll="inside">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Select Default Profile Picture</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <PersonAvatars />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
