import type { CommonFields } from "@/types/base.interface";

export interface Period extends CommonFields {
  date_from?: string;
  date_to?: string;
}

export type Duration = {
  years?: number;
  months?: number;
};
