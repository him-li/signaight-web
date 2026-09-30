/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from "react";
import { Avatar, Card, Chip, Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Link from "next/link";
import ImageZoom from "@/components/atoms/ImageZoom";
import Display from "@/components/atoms/Display";
import NotFound from "@/components/atoms/Icons/NotFound";
import {
  getSocialMediaIcon,
  socialMediaIcon,
} from "@/constants/socialMediaIcon";
import { socialMediaName } from "@/constants/socialMediaName";

type SocialMediaKeys = keyof typeof socialMediaName;
type NetworkProfileProps = {
  socialMedia: SocialMediaKeys;
  username?: string;
  user_url: string | string[];
  user_id?: string;
  followers?: string;
  following?: string;
  misc?: string;
  bio?: string;
  type?: string;
  profile_picture?: string | string[];
  isCardView?: boolean;
  friendsCount?: number;
};

export default function NetworkProfile({
  socialMedia,
  username,
  user_url,
  user_id,
  followers,
  following,
  misc,
  bio,
  profile_picture,
  isCardView = false,
  friendsCount,
}: NetworkProfileProps) {
  const getSocialMediaTitle = (
    socialMedia: SocialMediaKeys,
  ): string | undefined => {
    switch (socialMedia) {
      case "instagram":
        return username ?? bio;
      default:
        return bio ?? username ?? "";
    }
  };

  const getSocialMediaFollowers = (
    socialMedia: SocialMediaKeys,
  ): string | undefined => {
    switch (socialMedia) {
      case "facebook": {
        return followers || following
          ? `${followers ?? "--"} followers | ${following ?? "--"} following`
          : friendsCount
            ? `${friendsCount} friends`
            : undefined;
      }
      case "instagram":
      case "tiktok":
      case "flickr":
      case "vivino":
        return `${followers ?? "--"} followers | ${
          following ?? "--"
        } following`;
      case "linkedin":
      case "twitter":
      case "xing":
        return `${followers ?? "--"} followers | ${friendsCount ?? misc ?? "--"} connections`;

      default:
        return "";
    }
  };

  const getSocialMediaLinks = (socialMedia: SocialMediaKeys): string => {
    if (Array.isArray(user_url) && user_url.length > 0) {
      return user_url[0];
    }
    if (typeof user_url === "string" && user_url.trim() !== "") {
      return user_url;
    }
    switch (socialMedia) {
      case "instagram":
      case "linkedin":
      case "tiktok":
      case "google":
      case "truecaller":
        return `www.${socialMedia}.com/${user_id}`;
      case "skype":
      case "icq":
      case "sporttracks":
      case "runkeeper":
      case "goodreads":
      case "garminconnect":
      case "deezer":
      case "fitbit":
      case "flickr":
      case "gravatar":
      case "duolingo":
      case "foursquare":
      case "adidas":
      case "vivino":
      case "pulsstory":
      case "bitbucket":
      case "aboutme":
      case "apple":
      case "dropbox":
      case "youtube":
      case "medium":
      case "strava":
        return `${socialMedia}.com/${user_id}`;
      case "facebook": {
        return user_id
          ? `https://www.facebook.com/profile.php?id=${user_id}`
          : "";
      }
      case "twitter":
        return `x.com/${user_id}`;
      case "xing":
        return `www.xing.com/profile/${user_id}`;
      case "telegram":
        return `t.me/${user_id}`;

      case "askfm":
        return `ask.fm/${user_id}`;
      case "notion":
        return `notion.so/${user_id}`;
      case "khanacademy":
        return `khanacademy.org/${user_id}`;
      default:
        return `${socialMedia}.com/${user_id}`;
    }
  };
  const IconComponent =
    getSocialMediaIcon(socialMedia as keyof typeof socialMediaIcon) ??
    socialMediaIcon.default;
  const icon = createElement(IconComponent);

  let link = getSocialMediaLinks(socialMedia);
  link = typeof link === "string" ? link : link?.[0];
  const isDemoLink = link?.includes("example.invalid") || link?.includes("fixture-");
  const picture = Array.isArray(profile_picture)
    ? profile_picture[0]
    : profile_picture;

  return (
    <Display
      when={isCardView}
      fallback={
        <div className="flex justify-between items-center gap-1 text-xs">
          <div className="flex items-center gap-1">
            <div>
              <Chip
                variant="tertiary"
                className="p-0 font-semibold text-xs ps-0"
              >
                {socialMedia?.replace(/\b\w/g, (l: any) => l.toUpperCase())}
                {icon}
              </Chip>
              {getSocialMediaTitle(socialMedia) &&
                getSocialMediaTitle(socialMedia) !== "" && (
                  <Tooltip>
                    <Tooltip.Trigger>
                      <p className="font-medium line-clamp-3">
                        {getSocialMediaTitle(socialMedia)}
                      </p>
                    </Tooltip.Trigger>
                    <Tooltip.Content className="max-w-100 ">
                      {getSocialMediaTitle(socialMedia)}
                    </Tooltip.Content>
                  </Tooltip>
                )}
              <p color="light_grey">{getSocialMediaFollowers(socialMedia)}</p>
              {isDemoLink ? <p className="text-warning">Demo profile — not a live account</p> : null}
              {(user_url || user_id) && link !== "" && !isDemoLink && (
                <div className="flex items-center">
                  <Link href={link} target="blank">
                    {"View Profile on "}
                    {socialMedia?.replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Link>
                  <Snippet hideContent hideSymbol>
                    {getSocialMediaLinks(socialMedia)}
                  </Snippet>
                </div>
              )}
            </div>
          </div>
          <ImageZoom src={picture}>
            <Avatar size="sm" className="min-w-8">
              <Avatar.Image src={picture} />
            </Avatar>
          </ImageZoom>
        </div>
      }
    >
      <Card className="w-full max-w-44 h-72 relative m-2">
        <Avatar
          size="sm"
          className="absolute top-0 z-0 w-full h-full object-cover blur-3xl rounded-none"
        >
          <Avatar.Image src={picture} />
        </Avatar>
        <Card.Header className="flex flex-col justify-start z-20 hover:bg-default-50/75 hover:backdrop-blur-sm hover:ease-in-out duration-300 p-0">
          <Display
            when={picture}
            fallback={
              <NotFound size={100} text="No Profile Picture Detected" />
            }
          >
            <Avatar className="w-full h-full rounded-none">
              <Avatar.Image src={picture} />
            </Avatar>
          </Display>
        </Card.Header>
        <Card.Content className="overflow-y-auto text-xs z-20 hover:bg-default-50/75 hover:backdrop-blur-sm hover:ease-in-out duration-300">
          <p>{username ? username : "No User Name"}</p>
          <p>
            {socialMedia
              ? getSocialMediaFollowers(socialMedia)
              : "No Social Media Info Collected"}
          </p>
        </Card.Content>
        <Card.Footer className="flex p-0 min-h-10 bg-default-50/75 border-t border-zinc-100/50 justify-center z-20">
          <Chip variant="tertiary" className="p-0 font-semibold">
            {icon}
            {socialMedia?.replace(/\b\w/g, (l: any) => l.toUpperCase())}
          </Chip>
          {isDemoLink ? <span className="text-warning">Demo profile</span> : (
            <Link href={link} target="_blank">View Link</Link>
          )}
        </Card.Footer>
      </Card>
    </Display>
  );
}
