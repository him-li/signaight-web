/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import type { Candidate } from "@/types/candidate.interface";
import type { Person } from "@/types/person/index.interface";
import type {
  Name,
  FirstName,
  LastName,
  FullName,
} from "@/types/person/personal_details/name.interface";
import Display from "@/components/atoms/Display";
import CandidateProfile from "./CandidateProfile";
import CandidateCard from "../EnrichmentCenter/CandidateCard";
import { getPersonAvatar } from "@/utils/getPersonAvatar";

type CandidateItemProps = {
  candidate: Candidate;
  handleCandidateChange: (candidate: string) => void;
  source: keyof NonNullable<Person["network_signature"]>["matched_profiles"];
  primaryId: string;
  sourceLink: (
    platform: keyof NonNullable<
      Person["network_signature"]
    >["matched_profiles"],
    person: Person,
  ) => any;
  showSource?: boolean;
  showButtonSeparately?: boolean;
  handleMerge: (candidateId: string) => void;
};

export function getSocialMediaUserName(source: string, name?: Name) {
  if (source?.toLowerCase() == "telegram") {
    source = "tgm";
  }
  const fullNameKey = `${source}_full_name` as keyof FullName;
  const firstNameKey = `${source}_f_name` as keyof FirstName;
  const lastNameKey = `${source}_l_name` as keyof LastName;

  const firstName =
    name?.first_name?.[firstNameKey] ?? name?.first_name?.f_name ?? "";
  const lastName =
    name?.last_name?.[lastNameKey] ?? name?.last_name?.l_name ?? "";

  if (name?.full_name?.[fullNameKey]) {
    return name?.full_name?.[fullNameKey];
  } else if (firstName || lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return name?.full_name?.full_name ? name?.full_name?.full_name : "";
  }
}

export default function CandidateItem({
  candidate,
  handleCandidateChange,
  source,
  primaryId,
  sourceLink,
  showSource = false,
  showButtonSeparately = false,
  handleMerge,
}: CandidateItemProps) {
  const platform = showButtonSeparately
    ? candidate?.source
    : (source as string)?.toLowerCase();
  const profilePicture = getPersonAvatar(
    candidate?.personal_details?.visuals?.profile_photo,
  );
  const sourceLinkData = sourceLink(platform as never, candidate)?.url;
  const userName = getSocialMediaUserName(
    platform,
    candidate.personal_details?.name,
  );

  return (
    <Display
      when={!showButtonSeparately}
      fallback={
        <CandidateCard
          key={candidate?.id}
          source={candidate?.source as never}
          profilePicture={profilePicture as string}
          userName={userName as string}
          candidate={candidate}
          link={sourceLinkData}
        >
          <Button
            size="sm"
            type="submit"
            variant="ghost"
            className="rounded-full"
            isDisabled={!candidate?.id}
            onPress={() => handleMerge(candidate?.id!)}
          >
            <Icons.Check />
            Merge
          </Button>
        </CandidateCard>
      }
    >
      <div
        key={candidate.id}
        onClick={() => handleCandidateChange(candidate.id as string)}
        className={
          showSource
            ? "hidden"
            : `flex w-full min-h-fit px-2 my-1 cursor-default items-center justify-start rounded-full ease-in-out duration-300 ${candidate.primary || candidate.id === primaryId ? "bg-accent/75 hover:bg-accent-hover" : "hover:bg-default-hover"}`
        }
      >
        <CandidateProfile
          profilePicture={profilePicture as string}
          userName={userName as string}
          showSource={showSource}
          candidate={candidate}
          sourceLinkData={sourceLinkData}
          primaryId={primaryId}
        />
        {candidate.primary && <Icons.Check className="ms-auto" />}
      </div>
    </Display>
  );
}
