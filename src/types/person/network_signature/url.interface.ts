import type { CommonFields } from "@/types/base.interface";
import { SocialPlatform } from "../personal_details/socialPlatforms";

export type Url = CommonFields & {
  instagram_fb_link_on_profile?: string[];
  criminal_db_url?: string[];
  legal_db_url?: string[];
  fb_instagram_url?: string[];
  fb_linkedin_url?: string[];
  fb_twitter_url?: string[];
} & {
  [K in SocialPlatform as `${K}_profile_url`]?: string[];
};
