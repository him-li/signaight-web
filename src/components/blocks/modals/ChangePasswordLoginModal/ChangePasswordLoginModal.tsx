/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { Modal, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { modal } from "styles/styles";

type CSVValidationErrorsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChangePasswordLoginModal({
  isOpen,
  onClose,
}: CSVValidationErrorsModalProps) {
  const router = useRouter();
  const handleRedirect = useCallback(() => {
    router.replace(ROUTES.LOGOUT);
  }, [router]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container size="sm">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Allow the user to change their password
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              To change your password, you need to log in using your username
              and password. Do you agree to be redirected to the login page?
            </Modal.Body>
            <Modal.Footer className="justify-between">
              <Button className="rounded-full" onPress={onClose}>
                Cancel
              </Button>
              <Button
                variant="danger"
                className="rounded-full"
                onPress={handleRedirect}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
