import type { ReactNode } from "react";

export type ColumnType = {
  key: string;
  label: ReactNode;
  align?: "start" | "center" | "end";
  isSortable?: boolean;
  isFilterable?: boolean;
  isRowHeader: boolean;
};

export type IPagination = {
  page: number;
  pages: number;
  size: number;
  total: number;
};
