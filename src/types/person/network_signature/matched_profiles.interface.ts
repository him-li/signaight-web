import { SocialPlatform } from "../personal_details/socialPlatforms";

export type UUID = string; // represent UUID as string in TS

export type HttpUrl = string; // AnyHttpUrl → string

export type S3Path = string; // serialized to string in API layer

export type ISODateString = string; // date serialized to ISO string

export interface PrimaryCandidateInfo {
  f_name?: string;
  l_name?: string;
  creation_date?: string; // ISO string
  location?: string;
  birthdate?: string;
  profile_id?: string;
  profile_url?: string | string[];
  profile_username?: string;
  profile_picture?: string;
  full_name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  friends?: number;
}

export interface SourceInfo {
  primary_candidate?: Record<string, PrimaryCandidateInfo>;
  candidates_count: number;
}

export type MatchedProfiles = Partial<Record<SocialPlatform, SourceInfo>>;
