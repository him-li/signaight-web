export interface Friends {
  facebook: FacebookFriend[];
}

export interface FacebookFriend {
  facebook_user_id: string;
  facebook_full_name: string;
  facebook_profile_picture: string;
  facebook_profile_url: string;
}

export interface Following {
  facebook?: FacebookFollowing[];
  instagram?: InstagramFollowing[];
}

export interface FacebookFollowing {
  facebook_user_id: string;
  facebook_full_name: string;
  facebook_profile_picture: string;
  facebook_profile_url: string;
}

export interface InstagramFollowing {
  instagram_user_id: string;
  instagram_username: string;
  instagram_full_name: string;
  instagram_is_private: boolean;
  instagram_profile_picture: string;
  instagram_profile_picture_id: string;
  instagram_is_verified: boolean;
}

export interface Connections {
  friends?: Friends;
  following?: Following;
}
