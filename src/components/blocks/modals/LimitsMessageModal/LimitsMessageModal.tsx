import { Button, Modal } from "@heroui/react";
import { modal } from "styles/styles";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  cb: () => void;
};

export default function LimitsMessageModal({
  isOpen,
  onClose,
  message,
  cb,
}: Props) {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Limit or Access Issue</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div dangerouslySetInnerHTML={{ __html: message ?? "" }} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={() => {
                  cb?.();
                  onClose();
                }}
                variant="ghost"
                className="rounded-full"
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
