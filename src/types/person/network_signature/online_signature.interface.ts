import type { CommonFields } from "@/types/base.interface";

export interface OnlineSignature extends CommonFields {
  instagram_followers_count?: number;
  instagram_following_count?: number;
  instagram_following_tag_count?: number;
  instagram_posts_count?: number;
  fb_followers_count?: number;
  fb_following_count?: number;
  fb_friends_count?: number;
  fb_followers?: number;
  linkedin_connections_count?: number;
  linkedin_followers_count?: number;
  linkedin_following_count?: number;
  linkedin_joined?: number;
  linkedin_has_premium?: boolean;
  linkedin_is_influencer?: boolean;
  linkedin_is_creator?: boolean;
  linkedin_associated_hashtags?: string[];
  twitter_created_at?: string;
  twitter_posts_count?: number;
  twitter_favorites_count?: number;
  twitter_followers_count?: number;
  twitter_following_count?: number;
  twitter_media_count?: number;
  twitter_statuses_count?: number;
  twitter_professional_type?: string;
  twitter_professional_category?: string;
  twitter_professional_category_id?: string;
  xing_contacts?: XingContactDetails;
  flickr_posts_count?: number;
  flickr_following_count?: number;
  flickr_followers_count?: number;
  vivino_followers_count?: number;
  vivino_following_count?: number;
  vivino_posts_count?: number;
  twitter_creator_subscription_count?: number;
  twitter_list_count?: number;
}

type XingContact = {
  address?: string;
  email?: string;
  mobile?: string;
};

type XingContactDetails = {
  business?: XingContact;
  private?: XingContact;
};
