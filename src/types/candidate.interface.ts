import type { Person } from "@/types/person/index.interface";

export interface Candidate extends Person {
  name: string;
  city: string;
  profile_photo: string;
  primary: boolean;
  search_id: string;
  searched_at: Date;
  source_id: string;
  source: string;
  resource?: string;
  person?: {
    id?: string;
    collection?: string;
  };
  f_name?: string;
  l_name?: string;
  projects_list?: string[];
}
