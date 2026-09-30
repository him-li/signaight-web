"use client";
import Link from "next/link";
import { Button, Tooltip } from "@heroui/react";
import {
  getSocialMediaIcon,
  socialMediaIcon,
} from "@/constants/socialMediaIcon";
import { socialMediaName } from "@/constants/socialMediaName";
import Capitalize from "@/utils/capitalize";
import { useMemo, type ElementType } from "react";
import { button } from "styles/styles";
import type { Person } from "@/types/person/index.interface";

interface Props {
  person: Person;
}

export default function SocialLinks({ person }: Props) {
  const links = useMemo(() => {
    if (!person?.network_signature) return null;
    const profileUrls = person?.network_signature?.url ?? {};
    const websites = person?.personal_details?.websites?.websites ?? [];
    const socialLinks = Object.entries(profileUrls)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, url]) => !!url)
      .map(([key, url]) => {
        const platform = key.replace(/_profile_url$/, "");
        return { platform, url };
      });

    const websiteLinks = websites
      ?.filter((site) => !!site.url)
      .map((site) => ({
        platform: "Website",
        url: site.url,
      }));
    return [...(socialLinks || []), ...(websiteLinks || [])];
  }, [person]);

  if (!links) return null;
  return (
    <>
      {links.map(({ platform, url }, index) => {
        const key = `${platform}-${index}`;
        const iconKey = platform.toLowerCase();
        const Icon: ElementType =
          getSocialMediaIcon(iconKey as keyof typeof socialMediaIcon) ??
          socialMediaIcon.default;
        const displayName =
          socialMediaName[iconKey as keyof typeof socialMediaName] ??
          Capitalize(platform);

        return (
          <Tooltip key={key}>
            <Tooltip.Trigger>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
              >
                <Button isIconOnly variant="ghost" size="sm">
                  <Icon />
                </Button>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content>{displayName}</Tooltip.Content>
          </Tooltip>
        );
      })}
    </>
  );
}
