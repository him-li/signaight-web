import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const DynamicCSVValidationErrorsModal = dynamic(
  () => import("./CSVValidationErrorsModal"),
  {
    ssr: false,
  },
);

export const useCSVValidationErrorsModal = () => {
  const [open, setOpen] = useState(false);
  const setOpenModal = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const modal = useMemo(
    () => (
      <DynamicCSVValidationErrorsModal
        isOpen={open}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    ),

    [open, setOpenModal],
  );

  return { modal, setOpenModal };
};
