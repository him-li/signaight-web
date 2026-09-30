import type { Person } from "@/types/person/index.interface";
import getLinkedinURL from "@/utils/getLinkedinURL";
import { Button, ButtonGroup } from "@heroui/react";
import Link from "next/link";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";

interface Props {
  subject: Person;
}

const Facebook = getSocialMediaIcon("facebook");
const Instagram = getSocialMediaIcon("instagram");
const Linkedin = getSocialMediaIcon("linkedin");
const Tiktok = getSocialMediaIcon("tiktok");
const Twitter = getSocialMediaIcon("twitter");

export default function SocialConnections({ subject }: Props) {
  return (
    <ButtonGroup variant="tertiary" className="justify-start rounded-full">
      {(subject.network_signature?.url?.facebook_profile_url ||
        subject.network_signature?.user_id?.facebook_user_id) && (
        <Link
          key="Facebook"
          href={`${
            subject.network_signature?.url?.facebook_profile_url ??
            `https://www.facebook.com/profile.php?id=${subject.network_signature?.user_id?.facebook_user_id}`
          }`}
          target="_blank"
        >
          <Button>
            <Facebook />
          </Button>
        </Link>
      )}
      {(subject.network_signature?.username?.instagram_username ||
        subject.network_signature?.user_id?.instagram_user_id) && (
        <Link
          key="Instagram"
          href={
            "https://www.instagram.com/" +
            subject.network_signature.username?.instagram_username
          }
          target="_blank"
        >
          <Button>
            <Instagram />
          </Button>
        </Link>
      )}
      {(subject.network_signature?.url?.linkedin_profile_url ||
        subject.network_signature?.user_id?.linkedin_user_id) && (
        <Link
          key="LinkedIn"
          href={getLinkedinURL(subject)}
          target={
            subject.network_signature?.url?.linkedin_profile_url
              ? "_blank"
              : "_self"
          }
        >
          <Button>
            <Linkedin />
          </Button>
        </Link>
      )}
      {subject.network_signature?.url?.tiktok_profile_url && (
        <Link
          key="TikTok"
          href={
            Array.isArray(subject.network_signature?.url?.tiktok_profile_url)
              ? subject.network_signature?.url?.tiktok_profile_url[0]
              : subject.network_signature?.url?.tiktok_profile_url
          }
          target="_blank"
        >
          <Button>
            <Tiktok />
          </Button>
        </Link>
      )}
      {subject.network_signature?.user_id?.twitter_user_id && (
        <Link href="">
          <Button>
            <Twitter />
          </Button>
        </Link>
      )}
    </ButtonGroup>
  );
}
