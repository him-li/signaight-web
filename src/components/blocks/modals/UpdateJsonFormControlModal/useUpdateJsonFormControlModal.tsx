import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ControlProps } from "@jsonforms/core";

const UpdateJsonFormControlModal = dynamic(
  () => import("./UpdateJsonFormControlModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export const useUpdateJsonFormControlModal = (props: ControlProps) => {
  const [open, setOpen] = useState(false);

  const setOpenModal = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const modal = useMemo(
    () => (
      <UpdateJsonFormControlModal
        {...props}
        isOpen={open}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, setOpenModal],
  );

  return { modal, setOpenModal };
};
