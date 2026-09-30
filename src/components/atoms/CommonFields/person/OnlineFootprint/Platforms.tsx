import { useMemo } from "react";
import NetworkProfile from "./NetworkProfile";
import { Person } from "@/types/person/index.interface";
import { PrimaryCandidateInfo } from "@/types/person/network_signature/matched_profiles.interface";

const PLATFORM_TO_SKIP = ["microsoft", "apple"];

export default function Platforms({
  person,
  isCardView,
}: {
  person?: Person;
  isCardView?: boolean;
}) {
  const matchedProfiles = person?.network_signature?.matched_profiles ?? {};

  const platforms = useMemo(() => {
    return Object.entries(matchedProfiles)
      .filter(
        ([_, value]) =>
          value?.primary_candidate &&
          !PLATFORM_TO_SKIP.includes(_.toLowerCase()),
      )
      .map(([platform, value]) => ({
        platform,
        candidates: Object.values(value.primary_candidate ?? {}),
      }));
  }, [matchedProfiles]);

  if (!platforms.length) {
    return <p style={{ color: "#999" }}>---</p>;
  }

  return (
    <>
      {platforms.map(({ platform, candidates }) =>
        candidates.map((candidate: PrimaryCandidateInfo, index: number) => (
          <NetworkProfile
            key={`${platform}-${index}`}
            isCardView={isCardView}
            socialMedia={platform}
            username={candidate.profile_username!}
            user_url={candidate.profile_url!}
            user_id={candidate.profile_id!}
            profile_picture={candidate.profile_picture!}
            bio={candidate.bio!}
            followers={
              candidate.followers ? String(candidate.followers) : undefined
            }
            following={
              candidate.following ? String(candidate.following) : undefined
            }
            friendsCount={candidate.friends ? candidate.friends : undefined}
            misc={candidate.following ? String(candidate.following) : undefined}
          />
        )),
      )}
    </>
  );
}
