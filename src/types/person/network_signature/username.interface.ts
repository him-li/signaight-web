import type { CommonFields } from "@/types/base.interface";
import { SocialPlatform } from "../personal_details/socialPlatforms";

export type Username = CommonFields & {
  linkedin_twitter_aliases?: string[];
  fb_instagram_username?: string[];
  fb_linkedin_username?: string[];
  fb_twitter_username?: string[];
  tgm_profile_username?: string[];
} & {
  [K in SocialPlatform as `${K}_username`]?: string[];
};
