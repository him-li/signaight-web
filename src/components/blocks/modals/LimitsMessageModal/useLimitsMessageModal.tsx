import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const LimitsMessageModal = dynamic(() => import("./LimitsMessageModal"), {
  loading: () => <div />,
  ssr: false,
});

export const useLimitsMessageModal = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [cb, setCb] = useState<() => void>(() => {});
  const setOpenModal = useCallback(
    ({ message, cb }: { message?: string; cb: () => void }) => {
      setMessage(message);
      setCb(() => cb);
    },
    [],
  );

  const modal = useMemo(
    () => (
      <LimitsMessageModal
        isOpen={!!message}
        onClose={() => {
          setOpenModal({ cb: () => {} });
        }}
        message={message}
        cb={cb}
      />
    ),

    [cb, message, setOpenModal],
  );

  return { modal, setOpenModal };
};
