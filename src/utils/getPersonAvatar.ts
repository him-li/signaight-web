import type { ProfilePhoto } from "@/types/person/personal_details/visuals.interface";
const AVATAR_PRIORITY_LIST = [
  "profile_picture",
  "linkedin_profile_picture",
  "facebook_profile_picture",
  "instagram_profile_picture",
  "twitter_profile_picture",
  "tiktok_profile_picture",
  "twitter_cover_photo",
  "google_profile_picture",
  "xing_profile_picture",
  "eumw_profile_picture",
  "tgm_profile_picture",
  "skype_profile_picture",
  "truecaller_profile_picture",
  "icq_profile_picture",
  "sporttracks_profile_picture",
  "runkeeper_profile_picture",
  "goodreads_profile_picture",
  "garminconnect_profile_picture",
  "flickr_profile_picture",
  "fitbit_profile_picture",
  "duolingo_profile_picture",
  "deezer_profile_picture",
  "adidas_profile_picture",
  "gravatar_profile_picture",
  "foursquare_profile_picture",
  "vivino_profile_picture",
  "aboutme_profile_picture",
  "bitbucket_profile_picture",
  "interpol_profile_picture",
  "dropbox_profile_picture",
  "youtube_profile_picture",
  "khanacademy_profile_picture",
  "strava_profile_picture",
  "medium_profile_picture",
  "notion_profile_picture",
  "wattpad_profile_picture",
  "scribd_profile_picture",
  "edx_profile_picture",
  "teamtreehouse_profile_picture",
  "datacamp_profile_picture",
  "academia_profile_picture",
  "scholar_profile_picture",
  "babelio_profile_picture",
  "wikipedia_profile_picture",
  "inkitt_profile_picture",
  "github_profile_picture",
  "yelp_profile_picture",
  "myfitnesspal_profile_picture",
  "eyecon_profile_picture",
  "callapp_profile_picture",
  "whatsapp_profile_picture",
  "bluesky_profile_picture",
] as const;

export function getPersonAvatar(avatar?: ProfilePhoto): string | undefined {
  if (!avatar) return undefined;
  for (const key of AVATAR_PRIORITY_LIST) {
    const value = avatar[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
}
