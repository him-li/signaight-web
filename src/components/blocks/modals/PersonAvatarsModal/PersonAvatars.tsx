"use client";
import { useCallback, useMemo, useRef, useState, createElement } from "react";
import { AxiosError } from "axios";
import { Badge, Button } from "@heroui/react";
import Image from "next/image";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setPageReady } from "@/store/pageLoadingSlice";
import { patchSubject, selectCurrentSubject } from "@/store/subjectsSlice";
import { getMatchedProfilePlatforms } from "@/utils/getSocialMedia";
import { toast } from "@heroui/react";
import EventBus, { PersonDataChangeEvent } from "@/services/EventBus/EventBus";
import type { PrimaryCandidateInfo } from "@/types/person/network_signature/matched_profiles.interface";
import type { Person } from "@/types/person/index.interface";

const AvatarItem = ({ src }: { src?: string }) => {
  const dispatch = useAppDispatch();
  const subjectId = useAppSelector(selectCurrentSubject)?.id;
  const subjectName =
    useAppSelector(selectCurrentSubject)?.personal_details?.name;
  const subjectPics =
    useAppSelector(selectCurrentSubject)?.personal_details?.visuals
      ?.profile_photo;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef(null);

  const handleUpdateAvatar = useCallback(
    async (src: string | undefined) => {
      const subjectDetails = {
        personal_details: {
          name: subjectName,
          visuals: {
            profile_photo: {
              ...subjectPics,
              profile_picture: src,
            },
          },
        },
      };
      try {
        await dispatch(patchSubject({ subjectId, subjectDetails }));
        dispatch(setPageReady());
        toast.success("Success", {
          description: "Profile Picture Updated",
        });
        //publish event to subscribers
        EventBus.publish(
          "person-data-change",
          new PersonDataChangeEvent({
            ...subjectDetails,
            id: subjectId,
          } as Person),
        );
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
    },
    [dispatch, subjectId, subjectName, subjectPics],
  );

  return (
    <div
      key={src}
      className="relative shadow-lg rounded-2xl overflow-hidden w-44 h-44"
    >
      <Image
        src={src ? src : ""}
        alt={src ? src : ""}
        width={175}
        height={175}
        className="absolute top-0 start-0 overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
      />
      {isHovered && src !== subjectPics?.profile_picture && (
        <Button
          variant="tertiary"
          className="w-full absolute bottom-0 rounded-none z-10 scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onPress={() => handleUpdateAvatar(src)}
        >
          Set as Profile Picture
        </Button>
      )}
    </div>
  );
};

export default function PersonAvatars() {
  const person = useAppSelector(selectCurrentSubject);
  const platforms = useMemo(
    () => getMatchedProfilePlatforms(person),
    [person?.network_signature?.matched_profiles],
  );
  return (
    <div className="flex flex-wrap w-full gap-5 justify-around items-center">
      {platforms?.map((platform) => {
        const primaryCandidates =
          person?.network_signature?.matched_profiles?.[platform]?.[
            "primary_candidate"
          ];
        const candidatesArray: PrimaryCandidateInfo[] = Object.values(
          primaryCandidates || {},
        );
        if (!candidatesArray.length) return null;
        return candidatesArray.map((candidate, index) => {
          if (!candidate.profile_picture) return null;
          return (
            <Badge.Anchor key={platform + index}>
              <AvatarItem src={candidate.profile_picture} />
              <Badge size="lg">
                {createElement(getSocialMediaIcon(platform))}
              </Badge>
            </Badge.Anchor>
          );
        });
      })}
    </div>
  );
}
