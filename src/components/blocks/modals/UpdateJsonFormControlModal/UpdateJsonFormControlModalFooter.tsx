import { Button, Form } from "@heroui/react";
import { useFormContext } from "react-hook-form";

export default function UpdateJsonFormControlModalFooter({
  onClose,
}: {
  onClose: () => void;
}) {
  const { handleSubmit } = useFormContext();

  const onSubmit = () => {
    onClose();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Button type="submit" className="mt-2">
        Update
      </Button>
    </Form>
  );
}
