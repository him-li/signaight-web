import { CSSProperties } from "react";
import { Project } from "@/types/project.interface";

export type ProjectItemProps = {
  registerChild: (element?: Element | null) => void;
  data: Project & {
    isSelected?: boolean;
  };
  style: CSSProperties;
  key: string;
  index: number;
};

export type ProjectsListProps = {
  type: "menu" | "search";
  itemHeight?: number;
  listHeight?: number;
};
