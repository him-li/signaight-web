import type { NetworkSignature } from "@/types/person/network_signature/index.interface";
export default function getLinkedinURL(person?: NetworkSignature) {
  return (
    (Array.isArray(person?.url?.linkedin_profile_url)
      ? person?.url?.linkedin_profile_url[0]
      : person?.url?.linkedin_profile_url) ??
    `https://www.linkedin.com/in/${person?.username?.linkedin_username ?? person?.user_id?.linkedin_user_id}`
  );
}
