import type { CommonFields } from "@/types/base.interface";

export interface Nationality extends CommonFields {
  nationalities?: string[];
  eumw_nationality?: string;
  interpol_nationality?: string[];
}
