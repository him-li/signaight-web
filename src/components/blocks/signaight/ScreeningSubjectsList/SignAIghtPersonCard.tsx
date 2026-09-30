import { memo } from "react";
import dynamic from "next/dynamic";
import { Avatar, Card } from "@heroui/react";
import SearchStatus from "@/components/atoms/CommonFields/person/status";
import { getPersonName } from "@/utils/getPersonName";
import { Person } from "@/types/person/index.interface";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import LastUpdate from "@/components/atoms/CommonFields/person/lastUpdate";
import SocialConnectionsFiveListSkeleton from "../../skeletons/SocialConnectionsFiveListSkeleton";
import BlurredBackground from "@/components/atoms/BlurredBackground";
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

type Props = { person: Person };

function SignAIghtPersonCard({ person }: Props) {
  const avatar = getPersonAvatar(
    person?.personal_details?.visuals?.profile_photo,
  );
  const name = getPersonName(person?.personal_details?.name, "full_name");
  return (
    <Card
      key={person?.id}
      aria-label={person?.id}
      className={`${card.base} flex flex-col flex-1 h-full`}
    >
      <BlurredBackground alt={name} src={avatar} zIndex="z-0" />
      <Card.Header className={card.header}>
        <Avatar className="absolute top-0 start-0 w-full h-full rounded-none">
          <Avatar.Image alt={name} src={avatar} />
        </Avatar>
      </Card.Header>
      <Card.Content className={card.content}>
        <p className="text-lg font-semibold">{name}</p>
        <Email email={person?.personal_details?.email} />
        <LastUpdate lastupdate={person?.last_update} />
        <SearchStatus searchState={person?.search_state} />
      </Card.Content>
      <Card.Footer className={card.footer + " flex flex-col"}>
        <SocialConnections person={person}>
          <SocialLinks person={person} />
        </SocialConnections>
        <Actions person={person} />
      </Card.Footer>
    </Card>
  );
}

const SignAIghtPersonCardMemo = memo(SignAIghtPersonCard);
export default SignAIghtPersonCardMemo;
