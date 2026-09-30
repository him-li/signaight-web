import { useOverlayState } from "@heroui/react";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useProjectLinkAnalysisActions } from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { useTableState } from "@/contexts/tableContext/TableContext";
const ProjectLinkAnalysisModal = dynamic(
  () => import("./ProjectLinkAnalysisModal"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function useProjectLinkAnalysisModal() {
  const state = useOverlayState();
  const { getGraphData } = useProjectLinkAnalysisActions();
  const { selectedKeys } = useTableState();

  useEffect(() => {
    if (state.isOpen) {
      getGraphData({
        selectedKeys,
        edge_types: [
          "primary_candidate",
          "friend",
          "follows",
          "likes_page",
          "member_of_group",
        ],
        nodes_type: ["person", "candidate", "interest_page", "interest_group"],
        min_degree: 2,
        connection_type: ["all"],
      });
    }
  }, [state.isOpen]);

  const modal = useMemo(
    () => <ProjectLinkAnalysisModal state={state} />,
    [state],
  );

  return { modal, state };
}
