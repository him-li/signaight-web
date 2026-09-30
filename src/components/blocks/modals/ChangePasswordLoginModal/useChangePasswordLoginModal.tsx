import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const ChangePasswordLoginModal = dynamic(
  () => import("./ChangePasswordLoginModal"),
  {
    ssr: false,
  },
);

export const useChangePasswordLoginModal = () => {
  const [open, setOpen] = useState(false);
  const setOpenModal = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const modal = useMemo(
    () => (
      <ChangePasswordLoginModal
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
