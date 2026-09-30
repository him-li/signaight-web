"use client";

import { Button, Tooltip } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import useAddConnectionModal from "./AddConnectionModal/useAddConnectionModal";

type AddConnectionButtonProps = {
  className?: string;
  personId: string;
};

export default function AddConnectionButton({
  className = "",
  personId: _personId,
}: AddConnectionButtonProps) {
  const { modal, state } = useAddConnectionModal();

  return (
    <>
      {modal}
      <Tooltip>
        <Tooltip.Content>
          <p>Add Connection</p>
        </Tooltip.Content>
        <Button
          isIconOnly
          variant="primary"
          onPress={() => state.setOpen(true)}
          aria-label="Add connection"
          className={`
            absolute
            top-4
            right-4
            z-20
            min-w-0
            w-10
            h-10
            shadow-md
            ${className}
          `}
        >
          <FaPlus size={20} />
        </Button>
      </Tooltip>
    </>
  );
}
