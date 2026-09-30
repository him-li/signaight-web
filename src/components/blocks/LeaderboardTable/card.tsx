import dynamic from "next/dynamic";
import type { ChangeEventHandler } from "react";
import type { Person } from "@/types/person/index.interface";
import { Card } from "@heroui/react";
import Display from "@/components/atoms/Display";
import { getPersonName } from "@/utils/getPersonName";
import TableToolbar from "@/components/blocks/TableToolbar";
import { card } from "styles/styles";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import AvatarImage from "./AvatarImage";
const Ranking = dynamic(() => import("./fields/ranking"), {
  ssr: false,
  loading: () => <div />,
});
const CompatibilityMenu = dynamic(
  () => import("@/components/atoms/CompatibilityMenu"),
  {
    ssr: false,
    loading: () => <div />,
  },
);
const Alerts = dynamic(() => import("./fields/alerts"), {
  ssr: false,
  loading: () => <div />,
});
import SignAIghtScore from "@/components/atoms/CommonFields/person/score";
const Actions = dynamic(() => import("./fields/actions"), {
  ssr: false,
  loading: () => <div />,
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

type LeaderboardItemProps = {
  persons: Person[];
  handleCheckboxChange?: ChangeEventHandler;
  findSelectedSubject?: (id: string) => boolean;
};

export default function LeaderboardCards({ persons }: LeaderboardItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <TableToolbar />
      <Display
        when={persons.length > 0}
        fallback={<NoPersonFallback personNaming="applicant" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-8 gap-4 text-sm">
          {persons
            .filter((it) => it)
            .map((person, index) => {
              const avatar = getPersonAvatar(
                person?.personal_details.visuals?.profile_photo,
              );
              return (
                <Card key={index} aria-label={person.id} className={card.base}>
                  <BlurredBackground alt="avatar" src={avatar} zIndex="z-0" />
                  <Card.Header className={card.header}>
                    <Ranking personId={person.id!} />
                    <AvatarImage
                      src={avatar!}
                      alt={
                        getPersonName(
                          person.personal_details?.name,
                          "full_name",
                        )!
                      }
                    />
                  </Card.Header>
                  <Card.Content className={card.content}>
                    <p className="text-xl font-semibold">
                      {getPersonName(
                        person.personal_details?.name,
                        "full_name",
                      )}
                    </p>
                    <SignAIghtScore
                      score={person?.signaight_score ?? 0}
                      showLabel={true}
                      platform="signaight"
                    />
                    <Alerts count={person.alerts_count!} showLabel={true} />
                    <div className="flex items-center gap-1">
                      Compatibility:
                      <Display
                        when={person?.compatibility !== undefined}
                        className="h-4 w-20"
                      >
                        <CompatibilityMenu
                          subject={person}
                          isResponsive={false}
                        />
                      </Display>
                    </div>
                  </Card.Content>
                  <Card.Footer className={card.footer + " justify-center"}>
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
