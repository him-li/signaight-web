import type { CommonFields } from "@/types/base.interface";
import type { Member } from "@/types/person/biographic_details/work/member.interface";

export interface Publication extends CommonFields {
  publication_id: string;
  authors: [Member];
  publication_date?: Date;
  description?: string;
  name: string;
  publisher?: string;
  url?: string;
}
