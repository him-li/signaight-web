import { Modal } from "@heroui/react";
import { ControlProps } from "@jsonforms/core";
import UpdateJsonFormControl from "./UpdateJsonFormControl";
import UpdateJsonFormControlModalFooter from "./UpdateJsonFormControlModalFooter";
import { modal } from "styles/styles";

type UpdateJsonFormControlModalProps = {
  isOpen: boolean;
  onClose: () => void;
} & ControlProps;

export default function UpdateJsonFormControlModal({
  isOpen,
  onClose,
  ...props
}: UpdateJsonFormControlModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit {props.label} Schema Settings</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="w-full grid grid-cols-1 gap-2">
              <UpdateJsonFormControl {...props} />
            </Modal.Body>
            <Modal.Footer className="w-full justify-between">
              <UpdateJsonFormControlModalFooter onClose={onClose} />
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
