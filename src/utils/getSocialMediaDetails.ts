/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person } from "@/types/person/index.interface";
import { gravatarUrl } from "./gravatarUrl";

export function getSocialMediaDetails(
  platform: keyof NonNullable<
    NonNullable<Person["network_signature"]>["matched_profiles"]
  >,
  person: Person & { resource?: string },
) {
  if (person.resource === "fixture") {
    return { found: true, match: null, url: "" };
  }
  const networkSignature = person.network_signature;
  const userIdKey = `${platform}_user_id` as keyof NonNullable<
    Person["network_signature"]
  >["user_id"];
  const userNameKey = `${platform}_username` as keyof NonNullable<
    Person["network_signature"]
  >["username"];
  const urlKey = `${platform}_profile_url` as keyof NonNullable<
    Person["network_signature"]
  >["matched_profiles"];
  const found = !!networkSignature?.matched_profiles?.[platform];
  const match =
    (networkSignature?.matched_profiles?.[platform] as any)
      ?.primary_candidate ||
    networkSignature?.[userIdKey] ||
    networkSignature?.username?.[userNameKey];
  let url = networkSignature?.url?.[urlKey] ?? "";

  switch (platform) {
    case "facebook":
      if (networkSignature?.user_id?.[userIdKey]) {
        url = `https://www.facebook.com/profile.php?id=${networkSignature?.user_id?.[userIdKey]}`;
      }

      break;
    case "instagram":
      if (networkSignature?.username?.[userNameKey]) {
        url = `https://www.instagram.com/${networkSignature?.username?.[userNameKey]}`;
      }
      break;
    case "telegram":
      {
        if (networkSignature?.username?.tgm_profile_username) {
          url = `https://t.me/${networkSignature?.username?.tgm_profile_username}`;
        } else if (networkSignature?.user_id?.tgm_profile_user_id) {
          url = `https://t.me/${networkSignature?.user_id?.tgm_profile_user_id}`;
        }
      }

      break;
    case "skype":
      if (networkSignature?.user_id?.[userIdKey]) {
        url = `skype:${networkSignature?.user_id?.[userIdKey]}?chat`;
      }
      break;
    case "runkeeper":
      if (networkSignature?.username?.[userNameKey]) {
        url = `https://runkeeper.com/user/${networkSignature?.username?.[userNameKey]}`;
      }
      break;
    case "dropbox":
      if (networkSignature?.user_id?.dropbox_user_id) {
        url = `Dropbox id: ${networkSignature?.user_id?.dropbox_user_id}`;
      }
      break;
    case "myfitnesspal":
      if (networkSignature?.username?.myfitnesspal_username) {
        url = `https://www.myfitnesspal.com/profile/${networkSignature?.username?.myfitnesspal_username}`;
      }
      break;
    case "paypal": {
      const personalDetails = person.personal_details;
      if (personalDetails?.email?.paypal_email_part?.[0]) {
        url = `PayPal email part: ${personalDetails.email?.paypal_email_part[0]}`;
      }
      if (personalDetails?.phone?.paypal_phone_part?.[0]) {
        url = `PayPal phone part: ${personalDetails.phone?.paypal_phone_part?.[0]}`;
      }
      break;
    }
    case "microsoft": {
      const personalDetails = person.personal_details;
      if (personalDetails?.email?.microsoft_email_part?.[0]) {
        url = `Microsoft email part: ${personalDetails.email?.microsoft_email_part[0]}`;
      }
      if (personalDetails?.phone?.microsoft_phone_part?.[0]) {
        url = `Microsoft phone part: ${personalDetails.phone?.microsoft_phone_part?.[0]}`;
      }
      break;
    }
    case "xing": {
      const personalDetails = person.personal_details;
      if (personalDetails?.email?.xing_business_email) {
        url = `Xing bussiness email: ${personalDetails.email?.xing_business_email}`;
      }
      if (personalDetails?.email?.xing_private_email) {
        url = `Xing private email: ${personalDetails.email?.xing_private_email}`;
      }
      if (personalDetails?.phone?.xing_business_phone) {
        url = `Xing bussiness phone: ${personalDetails.phone?.xing_business_phone}`;
      }
      break;
    }
    case "apple": {
      const personalDetails = person.personal_details;
      if (personalDetails?.phone?.apple_phone_part?.[0]) {
        url = `Apple phone part: ${personalDetails.phone?.apple_phone_part?.[0]}`;
      }
      if (personalDetails?.email?.apple_email_part?.[0]) {
        url = `Apple email part: ${personalDetails.email?.apple_email_part?.[0]}`;
      }
      if (personalDetails?.email?.apple_email) {
        url = `Apple email: ${personalDetails.email?.apple_email}`;
      }
      break;
    }
    case "samsung": {
      const personalDetails = person.personal_details;
      if (personalDetails?.phone?.samsung_phone_part?.[0]) {
        url = `Samsung phone part: ${personalDetails.phone?.samsung_phone_part?.[0]}`;
      }
      break;
    }
    case "gravatar": {
      if (networkSignature?.username?.gravatar_username) {
        url = `https://gravatar.com/${networkSignature?.username?.gravatar_username}`;
      }
      const personalDetails = person.personal_details;
      if (personalDetails?.email?.email_address?.[0]) {
        url = gravatarUrl(personalDetails.email?.email_address?.[0]);
      }
      break;
    }
    case "ebay": {
      const personalDetails = person.personal_details;
      if (personalDetails?.phone?.ebay_phone_part?.[0]) {
        url = `eBay phone part: ${personalDetails.phone?.ebay_phone_part?.[0]}`;
      }
      break;
    }

    default:
      break;
  }

  return { found, match, url };
}
