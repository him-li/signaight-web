import type { CommonFields } from "@/types/base.interface";

export interface Organization extends CommonFields {
  organization_id: string;
  description?: string;
  end_month_year?: string;
  name?: string;
  occupation?: string;
  position?: string;
  start_month_year?: string;
}
