import { useMemo } from "react";
import type { Person } from "@/types/person/index.interface";
import { PrimaryCandidateInfo } from "@/types/person/network_signature/matched_profiles.interface";
import PrimaryCandidateCard from "./PrimaryCandidateCard";
import { getMatchedProfilePlatforms } from "@/utils/getSocialMedia";

export default function Platforms({ person }: { person?: Person }) {
  const platforms = useMemo(
    () => getMatchedProfilePlatforms(person),
    [person?.network_signature?.matched_profiles],
  );

  return (
    <div className="flex flex-col w-full gap-2">
      {platforms.map((platform) => {
        const primaryCandidates =
          person?.network_signature?.matched_profiles?.[platform]?.[
            "primary_candidate"
          ];
        const candidatesArray: PrimaryCandidateInfo[] = Object.values(
          primaryCandidates || {},
        );
        if (!candidatesArray.length) return null;
        return candidatesArray.map((candidate, index) => (
          <PrimaryCandidateCard
            key={index}
            source={platform}
            candidate={candidate}
          />
        ));
      })}
    </div>
  );
}
