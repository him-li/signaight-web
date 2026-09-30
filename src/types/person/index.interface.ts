/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonFields } from "@/types/base.interface";
import { PersonalDetails } from "@/types/person/personal_details/index.interface";
import { BiographicDetails } from "@/types/person/biographic_details/index.interface";
import { NetworkSignature } from "@/types/person/network_signature/index.interface";
import { Post } from "@/types/person/posts/index.interface";
import { IRedFlag } from "@/types/person/red_flag/index.interface";
import { Interests } from "@/types/person/interests.interface";
import { MergeMetadata } from "@/types/person/mergemetadata.interface";
import { Connections } from "@/types/person/connections.interface";
import { SearchState } from "@/types/person/searchstate.interface";
import { Scores } from "@/types/person/scores.interface";
import { Compatibility } from "@/types/person/compatibility.interface";
import { Comment } from "@/types/person/comments.interface";
import { RecruitingSource } from "@/types/person/recruitingsource.interface";
import { PersonPNR } from "@/types/person/pnr.interface";

export interface PersonCreate extends CommonFields {
  id?: string;
  personal_details?: PersonalDetails;
  biographic_details?: BiographicDetails;
  network_signature?: NetworkSignature;
  posts?: Post[];
  interests?: Interests;
  nationality?: string;
  comments?: Comment[];
  signaight_score?: number;
  risk_score?: number;
  recruiting_source?: RecruitingSource;
  compatibility?: Compatibility;
  scores?: Scores;
  demo_data?: boolean;
  red_flags?: IRedFlag[];
  search_ready?: boolean;
  search_state?: SearchState;
  geo_trace?: any;
  created_at?: string;
  last_update?: string;
  search_id?: string;
  is_favorite?: boolean;
  is_attention?: boolean;
  red_flags_count?: number;
  alerts_count?: number;
  evaluation_count?: number;
}

export interface PersonProject {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_email: string;
  image: string;
  description: string;
  person_ruleset: any[];
  project_platform: string;
}

export interface Person extends PersonCreate {
  personal_details: PersonalDetails;
  project?: Partial<PersonProject>;
  last_edited_by?: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
  merge_metadata?: MergeMetadata;
  connections?: Connections;
  pnr_data?: PersonPNR;
  connection_graph?: { [key: string]: any };
}

export interface Candidate extends PersonCreate {
  source?: string;
  resource?: string;
  primary?: boolean;
}

export interface PersonQuery {
  f_name__like: string;
  l_name__like: string;
  email_address__like: string;
  location__like: string;
  order_by: string | string[];
  status: string;
  compatibility?: string;
  signaight_score__gte?: number | string;
  signaight_score__lt?: number | string;
  signaight_score__lte?: number | string;
  is_favorite?: boolean | string;
  is_attention?: boolean | string;
  compatibility__in?: string[];
  status__in?: string[];
  ids__in?: string;
}

export interface PersonDemoData extends CommonFields {
  f_name: string;
  l_name: string;
  email_address: string;
  demo_data: boolean;
}
