import type { CommonFields } from "@/types/base.interface";
import type { Member } from "@/types/person/biographic_details/work/member.interface";

export interface ProjectPartOf extends CommonFields {
  project_id: string;
  description?: string;
  end_month_year?: string;
  members: [Member];
  occupation?: string;
  single_date?: boolean;
  start_month_year?: string;
  title: string;
  url?: string;
}
