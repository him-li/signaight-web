import type { ReactNode } from "react";
import Link from "next/link";
import Snippet from "@/components/atoms/Snippet";
import { Card, Chip, Table } from "@heroui/react";
import Capitalize from "@/utils/capitalize";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { hasValidHttpUrl } from "@/utils/hasData";
import type { Candidate } from "@/types/candidate.interface";
import type { Person } from "@/types/person/index.interface";
import type { SourceInfo } from "@/types/person/network_signature/matched_profiles.interface";

type CandidateCardProps = {
  profilePicture?: string;
  userName: string;
  candidate?: Candidate;
  person?: Person;
  link: any;
  source: never;
  children?: ReactNode;
};

export default function CandidateCard({
  profilePicture,
  userName,
  candidate,
  person,
  link,
  source,
  children,
}: CandidateCardProps) {
  const platform = candidate ? (candidate?.source as never) : source;
  const isMatched =
    (
      person?.network_signature?.matched_profiles?.[platform] as
        | SourceInfo
        | undefined
    )?.primary_candidate ||
    person?.network_signature?.[`${platform}_user_id`] ||
    person?.network_signature?.username?.[`${platform}_username`];
  const Icon = getSocialMediaIcon(platform);

  const location =
    person?.personal_details?.location?.current_country?.[
      `${platform}_location_country`
    ] ??
    (typeof person?.personal_details.location?.[`${platform}_location`] ===
    "object"
      ? person?.personal_details.location?.[`${platform}_location`]?.[0]
      : person?.personal_details.location?.[`${platform}_location`]) ??
    person?.personal_details?.location?.current_country?.[
      `${platform}_country_code`
    ];

  return (
    <Card
      key={platform}
      className={
        (isMatched && person) || candidate ? "w-full relative" : "hidden"
      }
    >
      <BlurredBackground
        alt="bg"
        src={
          profilePicture ??
          person?.personal_details.visuals?.profile_photo?.profile_picture!
        }
      />
      <Card.Content className="p-0 flex flex-row justify-between">
        <div className="flex flex-col gap-1 p-4 text-pretty">
          <Chip variant="tertiary" className="font-semibold p-0">
            <Chip.Label>{Capitalize(platform)}</Chip.Label>
            <Icon />
          </Chip>
          <Table aria-label="Personal Details of platform">
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header className="hidden">
                  <Table.Column isRowHeader>Field</Table.Column>
                  <Table.Column>Value</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="Name" className={userName ? "" : "hidden"}>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      Name
                    </Table.Cell>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      {userName}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row key="URL" className={link ? "" : "hidden"}>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      URL
                    </Table.Cell>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty flex items-center">
                      {hasValidHttpUrl(link) ? (
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
                      <Snippet symbol="" className="bg-transparent p-0 gap-0">
                        {link}
                      </Snippet>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row
                    key="Location"
                    className={location ? "" : "hidden"}
                  >
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      Location
                    </Table.Cell>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      {location}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row
                    key="Creation Date"
                    className={
                      person?.network_signature?.misc?.[
                        `${platform}_creation_date`
                      ]
                        ? ""
                        : "hidden"
                    }
                  >
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      Creation Date
                    </Table.Cell>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      {new Date(
                        person?.network_signature?.misc?.[
                          `${platform}_creation_date`
                        ]!,
                      ).toLocaleDateString("en-GB") ?? "---"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row
                    key="Birthday"
                    className={
                      person?.personal_details?.birth_year_birthday?.birthday?.[
                        `${platform}_creation_date`
                      ]
                        ? ""
                        : "hidden"
                    }
                  >
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      Birthday
                    </Table.Cell>
                    <Table.Cell className="px-0 pr-2 text-xs text-pretty">
                      {new Date(
                        person?.personal_details?.birth_year_birthday
                          ?.birthday?.[`${platform}_creation_date`]!,
                      ).toLocaleDateString("en-GB") ?? "---"}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
        <img
          alt="profile_picture"
          className="object-cover place-self-center-safe self-center-safe rounded-none"
          height={150}
          width={150}
          src={profilePicture!}
        />
      </Card.Content>
      <Card.Footer className={candidate ? "justify-end-safe" : "hidden"}>
        {children}
      </Card.Footer>
    </Card>
  );
}
