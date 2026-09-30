import type { CommonFields } from "@/types/base.interface";
import { SocialPlatform } from "./socialPlatforms";

export interface Name extends CommonFields {
  first_name: FirstName;
  last_name: LastName;
  full_name: FullName;
  middle_name?: MiddleName;
  nickname?: Nickname;
}
export type FirstName = CommonFields & {
  f_name: string | null;
} & {
  [K in SocialPlatform as `${K}_f_name`]?: string;
};

export type LastName = CommonFields & {
  l_name: string | null;
} & {
  [K in SocialPlatform as `${K}_l_name`]?: string;
};
export interface FullName extends CommonFields {
  full_name: string;
  linkedin_full_name?: string;
  facebook_full_name?: string;
  instagram_full_name?: string;
  tiktok_full_name?: string;
  twitter_full_name?: string;
  xing_full_name?: string;
  eumw_full_name?: string;
  interpol_full_name?: string;
}
export interface MiddleName extends CommonFields {
  mid_name?: string;
}
interface Nickname extends CommonFields {
  other_names?: string;
  fb_nicknames?: string;
  fb_other_names?: string;
}
