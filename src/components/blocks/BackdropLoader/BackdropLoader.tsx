import { Modal, Spinner } from "@heroui/react";
import { modal } from "styles/styles";
type BackdropLoaderProps = {
  isOpen: boolean;
  text?: string;
};

export function BackdropLoader({ isOpen, text }: BackdropLoaderProps) {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop isDismissable={false}>
        <Modal.Container>
          <Modal.Dialog className={modal.base}>
            <Modal.Body className="flex flex-col items-center justify-center py-10 gap-3">
              <Spinner size="lg" />
              {text && <p className="text-sm text-gray-600">{text}</p>}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
