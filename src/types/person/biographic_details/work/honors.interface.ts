import type { CommonFields } from "@/types/base.interface";

export interface Honor extends CommonFields {
  honor_id: string;
  description?: string;
  issue_date?: string;
  issuer?: string;
  occupation?: string;
  title: string;
}
