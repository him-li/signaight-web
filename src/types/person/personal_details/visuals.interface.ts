import type { CommonFields } from "@/types/base.interface";
import { SocialPlatform } from "./socialPlatforms";

export interface Visuals extends CommonFields {
  profile_photo?: ProfilePhoto;
  background_image?: string;
  fb_cover_photo?: string;
  twitter_cover_photo?: string;
  eumw_photos?: string[];
  interpol_photos?: string[];
  linkedin_cover_photo?: string;
}
export type ProfilePhoto = CommonFields & {
  profile_picture?: string;
  twitter_cover_photo?: string;
} & {
  [K in SocialPlatform as `${K}_profile_picture`]?: string;
};
