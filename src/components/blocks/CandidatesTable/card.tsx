import dynamic from "next/dynamic";
import { Card } from "@heroui/react";
import type { Person } from "@/types/person/index.interface";
import SearchStatus from "@/components/atoms/CommonFields/person/status";
import SignAIghtScore from "@/components/atoms/CommonFields/person/score";
import SocialConnectionsFiveListSkeleton from "../skeletons/SocialConnectionsFiveListSkeleton";
import { getPersonName } from "@/utils/getPersonName";
import Display from "@/components/atoms/Display";
import TableToolbar from "@/components/blocks/TableToolbar";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import { card } from "styles/styles";
const Email = dynamic(
  () => import("@/components/atoms/CommonFields/person/email"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const SocialConnections = dynamic(
  () => import("@/components/atoms/SocialConnections"),
  {
    loading: () => <SocialConnectionsFiveListSkeleton />,
    ssr: false,
  },
);
const SocialLinks = dynamic(() => import("@/components/atoms/SocialLinks"), {
  loading: () => <SocialConnectionsFiveListSkeleton />,
  ssr: false,
});
const Actions = dynamic(() => import("./fields/actions"), {
  loading: () => <div />,
  ssr: false,
});
const SubjectListPagination = dynamic(() => import("./pagination"), {
  loading: () => <div />,
  ssr: false,
});
const NoPersonFallback = dynamic(
  () => import("@/components/atoms/NoPersonFallback"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

type CandidateItemProps = {
  persons: Person[];
};

export default function CandidateCards({ persons }: CandidateItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <TableToolbar />
      <Display
        when={persons.length > 0}
        fallback={<NoPersonFallback personNaming="applicant" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 p-8 gap-4 text-sm">
          {persons.map((person, index) => {
            const avatar = getPersonAvatar(
              person?.personal_details?.visuals?.profile_photo,
            );
            return (
              <Card key={index} aria-label={person.id} className={card.base}>
                <BlurredBackground src={avatar} zIndex="z-0" />
                <Card.Header className={card.header}>
                  <img
                    title={getPersonName(
                      person?.personal_details?.name,
                      "full_name",
                    )}
                    src={avatar}
                    className="w-full h-full object-cover"
                  />
                </Card.Header>
                <Card.Content className={card.content}>
                  <span className="text-xl font-semibold">
                    {getPersonName(person?.personal_details?.name, "full_name")}
                  </span>
                  <Email email={person?.personal_details?.email} />
                  <SignAIghtScore
                    score={person?.signaight_score ?? 0}
                    showLabel={true}
                    platform="signaight"
                  />

                  <div>
                    <span>Recruiting Source:</span>
                    <span>
                      {person?.recruiting_source === "internet"
                        ? "Internet"
                        : "Application"}
                    </span>
                  </div>
                  <SearchStatus searchState={person?.search_state} />
                </Card.Content>
                <Card.Footer
                  className={card.footer + "flex flex-col items-center-safe"}
                >
                  <SocialConnections person={person}>
                    <SocialLinks person={person} />
                  </SocialConnections>
                  <Actions person={person} />
                </Card.Footer>
              </Card>
            );
          })}
        </div>
        <SubjectListPagination />
      </Display>
    </div>
  );
}
