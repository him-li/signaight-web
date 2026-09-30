import type { CommonFields } from "@/types/base.interface";

type Leak = {
  title?: string;
  url?: string;
};

export interface NetworkMisc extends CommonFields {
  instagram_is_verified?: boolean;
  instagram_is_business?: boolean;
  instagram_is_private?: boolean;
  twitter_is_protected?: boolean;
  twitter_is_business_account?: boolean;
  xing_profile_type?: string;
  leaks?: Leak[];
  microsoft_last_seen?: string | Date;
  microsoft_creation_date?: string | Date;
  myfitnesspal_last_seen?: string | Date;
  myfitnesspal_creation_date?: string | Date;
  facebook_last_active?: string | Date;
  facebook_creation_date?: string | Date;
  twitter_is_blue_verified?: boolean;
  twitter_is_verified?: boolean;
}
