import type { DescriptionBioIntro } from "@/types/person/biographic_details/description_bio_intro.interface";

export default function getPersonIntro(
  intro?: DescriptionBioIntro,
  isAllIntro: boolean | undefined = false,
): string | string[] | null {
  if (!intro) return isAllIntro ? [] : null;

  const intros: string[] = [];

  if (intro.introduction) intros.push(intro.introduction);

  if (intro.linkedin_headline) intros.push(intro.linkedin_headline);
  if (intro.linkedin_profile_description)
    intros.push(intro.linkedin_profile_description);

  if (intro.fb_profile_intro?.fb_profile_intro_text)
    intros.push(intro.fb_profile_intro.fb_profile_intro_text);

  if (intro.instagram_bio) intros.push(intro.instagram_bio);

  if (intro.twitter_description?.description_text)
    intros.push(intro.twitter_description.description_text);

  const otherKeys: (keyof DescriptionBioIntro)[] = [
    "xing_profile_about_me",
    "tgm_profile_bio",
    "goodreads_bio",
    "garminconnect_bio",
    "flickr_bio",
    "foursquare_bio",
    "google_bio",
    "dropbox_bio",
    "youtube_profile_bio",
    "khanacademy_bio",
  ];

  otherKeys.forEach((key) => {
    const value = intro[key];
    if (typeof value === "string" && value.trim()) {
      intros.push(value);
    }
  });

  if (isAllIntro) {
    return intros;
  }

  return intros.length > 0 ? intros[0] : null;
}
