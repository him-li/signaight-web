import { useEffect, useCallback } from "react";
import { useLinkAnalysisModal } from "@/components/blocks/modals/LinkAnalysisModal/useLinkAnalysisModal";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";

type Props = { cy: cytoscape.Core };

export default function ClickNode({ cy }: Props) {
  const { modal, setOpenModal } = useLinkAnalysisModal();
  const person = useAppSelector(selectCurrentSubjectData);

  const handleTap = useCallback(
    (evt: any) => {
      const node = evt.target;
      const nodeData = node.data();

      let edge_types: string[] = [];
      let nodes_type: string[] = ["person"];

      switch (nodeData.type) {
        case "education":
          edge_types = ["studied_at"];
          nodes_type.push("school");
          break;
        case "work":
          edge_types = ["worked_at"];
          nodes_type.push("company");
          break;
        case "social_connections":
          edge_types = ["connection_friend"];
          nodes_type.push("social_connections", "candidate");
          break;
        case "has_hometown":
          edge_types = ["hometown"];
          nodes_type.push("hometown");
          break;
        case "check_ins":
          edge_types = ["checked_in"];
          nodes_type.push("check_in_place");
          break;
      }

      if (nodeData.type !== "person") {
        const set = new Set<string>();
        if (person?.id) set.add(person.id);

        setOpenModal(true, {
          selectedKeys: set,
          edge_types,
          nodes_type,
          min_degree: 1,
          connection_type: ["all"],
        });
      }
    },
    [person?.id, setOpenModal],
  );

  useEffect(() => {
    if (!cy) return;

    cy.off("tap", "node", handleTap);

    cy.on("tap", "node", handleTap);

    return () => {
      cy.off("tap", "node", handleTap);
    };
  }, [cy, handleTap]);

  return <>{modal}</>;
}
