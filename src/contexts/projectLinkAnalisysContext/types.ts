export type ProjectLinkAnalysisContextProps = {
  graphData: any | null;
  loading: boolean;
};

export type IConnectionType =
  | "bidirectional"
  | "unidirectional"
  | "groups"
  | "likes"
  | "all";

export type IGetGraphData = {
  selectedKeys: "all" | Set<string | number>;
  edge_types: string[];
  nodes_type: string[];
  min_degree: number;
  connection_type: IConnectionType[];
};
