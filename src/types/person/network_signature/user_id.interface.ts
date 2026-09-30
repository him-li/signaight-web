import type { CommonFields } from "@/types/base.interface";
import { SocialPlatform } from "../personal_details/socialPlatforms";

export type UserId = CommonFields & {
  [K in SocialPlatform as `${K}_user_id`]?: string[];
};
