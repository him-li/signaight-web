import type { Candidate } from "@/types/candidate.interface";
import type { CommonFields as Verified } from "@/types/base.interface";

export interface Search {
  id: string;
  user_id?: string;
  status: string;
  created_at: Date;
  updated_at?: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any;
  duration?: number;
  retries?: number;
  percent_completed?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flows_list?: any[];
  persons_list?: string[];
}

export interface Searches {
  items?: Search[];
  total?: number;
  page?: number;
  size?: number;
  pages?: number;
}

export interface ActiveSearch extends Search {
  search_results: Candidate[];
  title?: string;
  school?: string;
  location?: string | number;
}

export interface WebSearches extends Verified {
  _id?: string;
  person?: Candidate;
  search_id?: string;
  title?: string;
  source?: string;
  preview?: string;
  content?: string;
  images?: Array<string>;
  is_match?: boolean | null;
}
