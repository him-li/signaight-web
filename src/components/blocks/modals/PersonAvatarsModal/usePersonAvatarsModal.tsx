"use client";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const PersonAvatarsModal = dynamic(() => import("./PersonAvatarsModal"), {
  loading: () => null,
  ssr: false,
});

export const usePersonAvatarsModal = () => {
  const [open, setOpen] = useState(false);

  const setOpenModal = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const modal = useMemo(
    () => (
      <PersonAvatarsModal
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
