import type { CommonFields } from "@/types/base.interface";

type Url = string;
type ISODate = string;

export interface PostAuthor {
  // Twitter
  twitter_user_id?: string;
  twitter_created_at?: ISODate;
  twitter_full_name?: string;
  twitter_username?: string;
  twitter_location?: string;
  twitter_favourites_count?: number;
  twitter_followers_count?: number;
  twitter_following_count?: number;
  twitter_media_count?: number;
  twitter_cover_photo?: Url;
  twitter_profile_picture?: Url;
  twitter_is_protected?: boolean;
  twitter_statuses_count?: number;
  twitter_description?: string;

  // LinkedIn
  linkedin_f_name?: string;
  linkedin_l_name?: string;
  title?: string;
  linkedin_profile_picture?: Url;
  linkedin_profile_url?: Url;

  // Facebook
  fb_full_name?: string;
  fb_user_id?: string;
  fb_gender?: string;
  fb_profile_url?: Url;
}

export interface TwitterPostFields {
  twitter_post_id?: string;
  twitter_post_text?: string;
  twitter_post_language?: string;
  twitter_post_view_count?: number;

  twitter_post_likes_count?: number;
  twitter_post_quotes_count?: number;
  twitter_post_replies_count?: number;
  twitter_post_retweets_count?: number;

  twitter_post_photo?: Url;
  twitter_post_urls?: Url[];
  twitter_post_hashtags?: string[];
  twitter_post_symbols?: string[];

  twitter_post_author_user_id?: string;
  twitter_post_possibly_sensitive?: boolean;
  twitter_post_card?: unknown;

  twitter_post_retweeted_status?: unknown;
  twitter_post_quoted_status?: unknown;

  twitter_retweeted_post?: unknown;
  twitter_quoted_post?: unknown;
}

export interface LinkedinPostFields {
  linkedin_post_text?: string;
  linkedin_post_publishment_date?: ISODate;
  linkedin_post_comments_count?: number;
  linkedin_post_likes_count?: number;
  linkedin_post_shares_count?: number;
  linkedin_post_photo?: Url;
  linkedin_post_url?: Url;
}

export interface InstagramPostFields {
  instagram_post_id?: string;
  instagram_post_text?: string;
  instagram_user_id?: string;
  instagram_post_location?: string;
  instagram_post_likes_count?: number;
  instagram_post_photo?: Url;
}

export interface FacebookUploadedPhoto {
  fb_photo_id: string;
  fb_photo_likes_count: number;
  fb_photo_reactions_count: number;
  fb_photo_comments_count: any;
  fb_photo: FbPhoto;
  fb_photo_lq: any;
  fb_photo_mq: any;
  fb_photo_hq: any;
}

export interface FbPhoto {
  url: string;
  width: any;
  height: any;
}

export interface FacebookPostFields {
  fb_post_id?: string;
  fb_post_text?: string;
  fb_post_language?: string;
  fb_post_translated_to?: string;
  fb_post_external_webpages?: Url[];

  fb_post_comments_count?: number;
  fb_post_likers_count?: number;
  fb_post_shares_count?: number;
  fb_post_reactors_count?: number;

  fb_post_photo?: Url;
  fb_uploaded_photo?: FacebookUploadedPhoto;
  fb_post_publish_at_date?: ISODate;
  fb_post_url?: Url;
}

export interface PostReaction {
  type?: string;
  count?: number;
  linkedin_post_reaction_type?: string;
  linkedin_post_reaction_type_count?: number;
}

export interface Post
  extends
    TwitterPostFields,
    LinkedinPostFields,
    InstagramPostFields,
    FacebookPostFields {
  verified?: boolean;
  post_likers?: any;
  post_translation?: any;
  reactions?: PostReaction[];
  post_reaction?: string;
  shared_post?: Post;

  post_author?: PostAuthor;
  tagged_profiles?: TaggedProfile[];

  activity_type?: "post" | "comment" | "share";
}

type FacebookPhotoData = {
  url?: string;
  width?: number;
  height?: number;
};

type FacebookPhoto = {
  fb_photo_id?: string;
  fb_photo_likes_count?: number;
  fb_photo_reactions_count?: number;
  fb_photo?: FacebookPhotoData;
  fb_photo_lq?: FacebookPhotoData;
  fb_photo_mq?: FacebookPhotoData;
  fb_photo_hq?: FacebookPhotoData;
};

interface TaggedProfile extends CommonFields {
  fb_user_id?: string;
  fb_full_name?: string;
  fb_profile_url?: string;
  instagram_id?: string;
  instagram_username?: string;
  instagram_full_name?: string;
  instagram_is_private?: boolean;
  instagram_is_verified?: boolean;
  instagram_profile_picture?: string;
}
interface PostLiker extends CommonFields {
  instagram_id: string;
  instagram_username?: string;
  instagram_full_name?: string;
  instagram_is_private?: string;
  instagram_profile_picture?: string;
}
