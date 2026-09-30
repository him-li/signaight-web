import type { CommonFields } from "@/types/base.interface";

export interface DescriptionBioIntro extends CommonFields {
  introduction?: string;
  linkedin_headline?: string;
  linkedin_profile_description?: string;
  instagram_bio?: string;
  biography_with_entities?: EntityInBiography[];
  instagram_bio_links?: string[];
  instagram_fb_link_on_profile?: string;
  twitter_description?: TwitterDescription;
  fb_profile_intro?: FbProfileIntro;
  xing_profile_about_me?: string;
  tgm_profile_bio?: string;
  goodreads_bio?: string;
  garminconnect_bio?: string;
  flickr_bio?: string;
  foursquare_bio?: string;
  google_bio?: string;
  dropbox_bio?: string;
  youtube_profile_bio?: string;
  khanacademy_bio?: string;
  medium_bio?: string;
  notion_bio?: string;
}
interface EntityInBiography extends CommonFields {
  instagram_userid?: string;
  instagram_username?: string;
}

type TwitterMentionedUser = {
  twitter_user_id?: string;
  twitter_full_name?: string;
  twitter_username?: string;
};

type TwitterUrl = {
  description_url_expanded?: string;
  description_url_on_twitter?: string;
};

export interface FacebookTaggedPerson {
  fb_user_id?: string;
  fb_full_name?: string;
  fb_profile_url?: string;
}

export interface InstagramTaggedPerson {
  instagram_id?: string;
  instagram_username?: string;
  instagram_full_name?: string;
  instagram_is_private?: boolean;
  instagram_is_verified?: boolean;
  instagram_profile_picture?: string;
}

export interface LinkedinTaggedPerson {
  linkedin_f_name?: string;
  linkedin_l_name?: string;
  linkedin_headline?: string;
  linkedin_profile_picture?: string;
  linkedin_profile_url?: string;
}

export interface TwitterTaggedPerson {
  twitter_user_id?: string;
  twitter_full_name?: string;
  twitter_username?: string;
}

export type TaggedPerson = FacebookTaggedPerson &
  InstagramTaggedPerson &
  LinkedinTaggedPerson &
  TwitterTaggedPerson;

type TwitterDescription = CommonFields & {
  description_text?: string;
  urls?: TwitterUrl[];
  mentioned_users?: TwitterMentionedUser[];
  description_hashtags?: string[];
  description_symbols?: string[];
  tagged_profiles?: TaggedPerson;
};

interface FbProfileIntro extends CommonFields {
  fb_profile_intro_id?: string;
  fb_profile_intro_text?: string;
}
