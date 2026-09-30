/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useMemo, type ElementType, type ReactNode } from "react";
import type { Person } from "@/types/person/index.interface";
import { Badge, Button, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  includeSubjectData,
  setFlows,
  setProfileSelectOpen,
} from "@/store/profileSelectSlice";
import { getSocialMediaDetails } from "@/utils/getSocialMediaDetails";
import { socialMediaName } from "@/constants/socialMediaName";
import { getMatchedProfilePlatforms } from "@/utils/getSocialMedia";
import {
  getSocialMediaIcon,
  socialMediaIcon,
} from "@/constants/socialMediaIcon";
import Capitalize from "@/utils/capitalize";
import { selectProfileSelectFlowsSource } from "@/store/profileSelectSlice/profileSelect.selectors";

interface Props {
  children?: ReactNode;
  person: Person;
  profileSelection?: boolean;
}

export type SocialNetwork = {
  source: string;
  found: boolean;
  matched?: string;
  url: string;
  icon: ElementType;
};

const MAX_SOCIAL_ICON_COUNT = 4;

export default function SocialConnections({
  children,
  person,
  profileSelection,
}: Props) {
  const dispatch = useAppDispatch();
  const source = useAppSelector(selectProfileSelectFlowsSource);
  const platforms = useMemo(() => getMatchedProfilePlatforms(person), [person]);

  const socialNetworks = useMemo(() => {
    let data = platforms
      .reduce((details: any[], platform) => {
        return [
          ...details,
          {
            sourceName: socialMediaName[platform] ?? Capitalize(platform),
            source: platform,
            icon:
              getSocialMediaIcon(platform as any) ?? socialMediaIcon.default,
            ...getSocialMediaDetails(platform, person),
          },
        ];
      }, [] as SocialNetwork[])
      .sort((a, b) => (a.found === b.found ? 0 : a.found ? -1 : 1));
    data = data.filter((social) => social.found || social.matched);

    return data;
  }, [platforms, person]);

  const handleClick = useCallback(
    (source: string) => {
      if (source) {
        if (profileSelection) {
          dispatch(setFlows([source]));
        } else {
          dispatch(includeSubjectData(person));
          dispatch(setFlows([source]));
          dispatch(setProfileSelectOpen());
        }
      }
    },
    [dispatch, profileSelection, person],
  );

  const handleLegacyCandidatesClick = useCallback(() => {
    dispatch(includeSubjectData(person));
    dispatch(setFlows(["linkedin"]));
    dispatch(setProfileSelectOpen());
  }, [dispatch, person]);

  const networksArray =
    profileSelection || socialNetworks.length <= MAX_SOCIAL_ICON_COUNT
      ? socialNetworks
      : socialNetworks.slice(0, MAX_SOCIAL_ICON_COUNT);

  return (
    <div className="flex flex-col justify-center items-start w-fit gap-1">
      <div className="flex gap-1 flex-wrap">
        {!source && socialNetworks.length === 0 && children}
        {!profileSelection && socialNetworks.length === 0 && (
          <Tooltip>
            <Button
              aria-label="Review possible accounts"
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={handleLegacyCandidatesClick}
            >
              <Icons.DotMenu size={15} rotate={90} />
            </Button>
            <Tooltip.Content>Review possible accounts</Tooltip.Content>
          </Tooltip>
        )}
        {networksArray.map((socialNetwork, index) => (
          <Badge.Anchor key={socialNetwork.sourceName + index}>
            <Tooltip>
              <Button
                aria-label={socialNetwork.sourceName ?? "Social network"}
                isIconOnly
                variant="ghost"
                size="sm"
                isDisabled={!socialNetwork.found}
                className={`rounded-full ease-in-out duration-300 ${
                  socialNetwork.source ? "cursor-pointer" : "cursor-default"
                } ${profileSelection && socialNetwork.source === source ? "bg-accent hover:bg-accent-hover" : ""}`}
                onPress={() => handleClick(socialNetwork.source)}
              >
                <socialNetwork.icon />
              </Button>
              <Tooltip.Content>{socialNetwork.sourceName}</Tooltip.Content>
            </Tooltip>
            <Badge
              color="danger"
              size="sm"
              className={
                (socialNetwork.found &&
                  socialNetwork.match !== null &&
                  socialNetwork.match !== undefined) ||
                !socialNetwork.found
                  ? "invisible"
                  : "visible"
              }
            />
          </Badge.Anchor>
        ))}
        {!profileSelection && (
          <Button
            aria-label={"SocialNetwork"}
            isIconOnly
            variant="ghost"
            size="sm"
            onPress={() => handleClick(socialNetworks[0]?.source)}
            className={
              !source && socialNetworks.length === 0 ? "hidden" : "rounded-full"
            }
          >
            <Icons.DotMenu size={15} rotate={90} />
          </Button>
        )}
      </div>
    </div>
  );
}
