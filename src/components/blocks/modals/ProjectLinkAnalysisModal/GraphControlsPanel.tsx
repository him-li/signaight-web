import { Card, Button, Form } from "@heroui/react";
import { useForm } from "react-hook-form";
import { GraphFormValues } from "./types";
import ConnectionSettings from "./ConnectionSettings";
import { useProjectLinkAnalysisActions } from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { useTableState } from "@/contexts/tableContext/TableContext";
import { button } from "styles/styles";

const connectionsType = [
  { anchorKey: "unidirectional", currentKey: "unidirectional" },
];

export default function GraphControlsPanel() {
  const { getGraphData } = useProjectLinkAnalysisActions();
  const { selectedKeys } = useTableState();
  const { control, handleSubmit } = useForm<GraphFormValues>({
    defaultValues: {
      layout: "force",
      connectionType: ["bidirectional", "unidirectional", "groups", "likes"],
      threshold: 2,
      photos: false,
      posts: false,
      interests: false,
      toxicity: false,
      terminology: false,
    },
  });

  const onSubmit = (data: GraphFormValues) => {
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
      min_degree: data.threshold,
      connection_type: data.connectionType,
    });
    console.log("Graph settings:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
      <Card className="w-full">
        <Card.Header>
          <Card.Title className="text-xl">Graph Controls</Card.Title>
        </Card.Header>

        <Card.Content className="space-y-6">
          {/* <LayoutOptions control={control} /> */}
          <ConnectionSettings control={control} />
        </Card.Content>
        <Card.Footer>
          <Button variant="ghost" type="submit" className={button.ghost_accent}>
            Update Graph
          </Button>
        </Card.Footer>
      </Card>

      {/* <Card className="w-[380px] border-2 rounded-xl shadow-lg mt-6">
        <Card.Header className="text-2xl font-bold">
          AI Network Analysis
        </Card.Header>

        <Card.Content>
          <AINetworkAnalysis control={control} />
          <Button type="submit" className="mt-6 w-full">
            Discover & Analyse
          </Button>
        </Card.Content>
      </Card> */}
    </Form>
  );
}
