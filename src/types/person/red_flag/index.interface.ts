import type { IRedFlagFactor } from "@/types/person/red_flag/factor.interface";

export type SubCategory = {
  category?: string;
  sub_category: string;
  severity: number;
  description?: string;
  factors?: IRedFlagFactor[];
};

export type IRedFlag = {
  category: string;
  severity: number;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  sub_categories?: SubCategory[];
};
