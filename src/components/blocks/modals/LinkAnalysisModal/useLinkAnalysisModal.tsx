import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useProjectLinkAnalysisActions } from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { IGetGraphData } from "@/contexts/projectLinkAnalisysContext/types";

const LinkAnalysisModal = dynamic(() => import("./LinkAnalysisModal"), {
  loading: () => <div />,
  ssr: false,
});

export const useLinkAnalysisModal = () => {
  const [open, setOpen] = useState(false);
  const { getGraphData } = useProjectLinkAnalysisActions();

  const setOpenModal = useCallback(
    (open: boolean, graphParams?: IGetGraphData) => {
      setOpen(open);
      if (open && graphParams) {
        getGraphData(graphParams);
      }
    },
    [getGraphData],
  );

  const modal = useMemo(
    () => (
      <LinkAnalysisModal
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
