import type { CommonFields } from "@/types/base.interface";

interface InterestPage extends CommonFields {
  fb_page_name: string;
  fb_page_profile_photo: string;
  fb_page_cover_photo?: string;
  fb_page_url: string;
  fb_page_id?: string;
}

interface TelegramMessage {
  date?: string;
  media_code?: any;
  media_name?: any;
  message_id?: number;
  reply_to_message_id?: number;
  text?: string;
}

interface TelegramGroup {
  telegram_public_group_id?: string;
  telegram_public_group_screen_name?: string;
  title?: string;
  lastseen?: Date;
  messages?: TelegramMessage[];
}

interface Groups {
  telegram_groups?: TelegramGroup[];
}

export interface LinkedinInterests {
  linkedin_full_name: string;
  linkedin_headline: string;
  linkedin_followers_count: number;
  linkedin_profile_url: string;
  linkedin_profile_picture: string;
  linkedin_is_influencer: boolean;
}

export type PartialLinkedinInterests = Partial<LinkedinInterests>;

export interface Interests extends CommonFields {
  pages?: InterestPage[];
  followed_hashtags: any;
  groups?: Groups;
  xing_interests_hobbies?: string[];
  linkedin_interests?: PartialLinkedinInterests[];
  xing_interests?: string[];
}
