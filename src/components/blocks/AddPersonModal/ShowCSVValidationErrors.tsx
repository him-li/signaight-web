import { Button } from "@heroui/react";
import { useCSVValidationErrorsModal } from "../modals/CSVValidationErrorsModal/useCSVValidationErrorsModal";

export default function ShowCSVValidationErrors() {
  const { modal, setOpenModal } = useCSVValidationErrorsModal();
  return (
    <>
      <Button
        className="rounded-full"
        onPress={() => {
          setOpenModal(true);
        }}
      >
        Details
      </Button>
      {modal}
    </>
  );
}
