import { memo, type ReactNode } from "react";
import Link from "next/link";
import { Card, Chip, Table } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Capitalize from "@/utils/capitalize";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { hasValidHttpUrl } from "@/utils/hasData";
import type { PrimaryCandidateInfo } from "@/types/person/network_signature/matched_profiles.interface";
import { SocialPlatform } from "@/types/person/personal_details/socialPlatforms";
import CandidateAvatar from "./CandidateAvatar";

type CandidateCardProps = {
  source: SocialPlatform;
  children?: ReactNode;
  candidate?: PrimaryCandidateInfo;
};

function PrimaryCandidateCard({
  source,
  children,
  candidate,
}: CandidateCardProps) {
  if (!candidate) return null;
  if (
    !candidate.profile_url &&
    !candidate.profile_id &&
    !candidate.profile_username
  )
    return null;
  const platform = source;
  const isMatched = !!candidate;
  const Icon = getSocialMediaIcon(platform);
  let link =
    (Array.isArray(candidate.profile_url)
      ? candidate.profile_url[0]
      : candidate.profile_url) || "";

  if (!link && source === "facebook") {
    link = `https://www.facebook.com/profile.php?id=${candidate.profile_id}`;
  }
  if (!link && source === "instagram") {
    link = `https://www.instagram.com/${candidate.profile_username}`;
  }
  const isDemoProfile = link.includes("example.invalid");
  const profilePicture =
    (Array.isArray(candidate.profile_picture)
      ? candidate.profile_picture[0]
      : candidate.profile_picture) || "";

  const userName =
    candidate.f_name && candidate.l_name
      ? `${candidate.f_name} ${candidate.l_name}`
      : candidate.full_name || candidate.profile_username || "";

  return (
    <Card
      key={source}
      className={isMatched && candidate ? "w-full relative p-0" : "hidden"}
    >
      <BlurredBackground alt="bg" src={profilePicture} />
      <Card.Content className="p-0 flex flex-row justify-between">
        <div className="flex flex-col gap-1 p-4 text-pretty">
          <Chip variant="tertiary" className="text-sm font-semibold">
            <Chip.Label>{Capitalize(platform)}</Chip.Label>
            <Icon />
          </Chip>
          {isDemoProfile ? <span className="text-xs text-warning">Demo profile — not a live account</span> : null}
          <Table
            aria-label="Personal Details of platform"
            className="p-0"
            variant="secondary"
          >
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header className="hidden">
                  <Table.Column isRowHeader>Field</Table.Column>
                  <Table.Column>Value</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="Name" className={userName ? "" : "hidden"}>
                    <Table.Cell>Name</Table.Cell>
                    <Table.Cell>{userName}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="URL" className={link ? "" : "hidden"}>
                    <Table.Cell>URL</Table.Cell>
                    <Table.Cell className="flex items-center">
                      {hasValidHttpUrl(link) && !isDemoProfile ? (
                        <Link
                          href={link}
                          target="_blank"
                          className="text-xs whitespace-nowrap"
                        >
                          {"View Profile on "}
                          {Capitalize(platform)}
                        </Link>
                      ) : (
                        <>{link}</>
                      )}
                      {!isDemoProfile ? (
                        <Snippet symbol="" hideContent>{link}</Snippet>
                      ) : null}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row
                    key="Location"
                    className={candidate.location ? "" : "hidden"}
                  >
                    <Table.Cell>Location</Table.Cell>
                    <Table.Cell>{candidate.location}</Table.Cell>
                  </Table.Row>
                  <Table.Row
                    key="Creation Date"
                    className={candidate.creation_date ? "" : "hidden"}
                  >
                    <Table.Cell>Creation Date</Table.Cell>
                    <Table.Cell>
                      {new Date(
                        candidate.creation_date as string,
                      ).toLocaleDateString("en-GB") ?? "---"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row
                    key="Birthday"
                    className={candidate.birthdate ? "" : "hidden"}
                  >
                    <Table.Cell>Birthday</Table.Cell>
                    <Table.Cell>
                      {new Date(
                        candidate?.birthdate as string,
                      ).toLocaleDateString("en-GB") ?? "---"}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
        <CandidateAvatar src={profilePicture} />
      </Card.Content>
      <Card.Footer
        className={candidate && children ? "justify-end-safe" : "hidden"}
      >
        {children}
      </Card.Footer>
    </Card>
  );
}

const PrimaryCandidateCardMemo = memo(PrimaryCandidateCard);

export default PrimaryCandidateCardMemo;
