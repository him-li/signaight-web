import { IConnectionType } from "@/contexts/projectLinkAnalisysContext/types";

export type LayoutType = "force" | "radial" | "tree" | "cluster";

export interface GraphFormValues {
  layout: LayoutType;
  connectionType: IConnectionType[];
  threshold: number;
  photos: boolean;
  posts: boolean;
  interests: boolean;
  toxicity: boolean;
  terminology: boolean;
}
