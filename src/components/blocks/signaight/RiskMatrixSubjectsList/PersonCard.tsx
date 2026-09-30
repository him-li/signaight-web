import { memo } from "react";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { Avatar, Card } from "@heroui/react";
import Stamp from "@/components/atoms/Stamp";
import { Person } from "@/types/person/index.interface";
import RedFlags from "./fields/redflags";
import SignAIghtScore from "@/components/atoms/CommonFields/person/score";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import View from "./fields/view";
import LastUpdate from "@/components/atoms/CommonFields/person/lastUpdate";
import { getPersonName } from "@/utils/getPersonName";
import { card } from "styles/styles";

type Props = { person: Person };

function PersonCard({ person }: Props) {
  const avatar = getPersonAvatar(
    person?.personal_details?.visuals?.profile_photo,
  );

  return (
    <Card key={person.id} className={card.base}>
      <BlurredBackground alt="avatar" src={avatar!} zIndex="z-0" />
      <Card.Header className={card.header}>
        {person?.red_flags?.map((flag, index) => (
          <Stamp key={index} content={flag.category} />
        ))}
        <Avatar className="absolute top-0 start-0 w-full h-full rounded-none">
          <Avatar.Image alt="avatar" src={avatar} />
        </Avatar>
        <div className="flex flex-col gap-2 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2">
          <RedFlags redFlags={person?.red_flags} />
        </div>
      </Card.Header>
      <Card.Content
        className={
          card.content + " flex w-full justify-between items-center-safe"
        }
      >
        <p className="text-lg font-semibold">
          {getPersonName(person?.personal_details?.name, "full_name")}
        </p>
        <SignAIghtScore
          score={person?.risk_score}
          showLabel={false}
          isSignAIght={true}
          platform="signaight"
        />
        <LastUpdate lastupdate={person?.last_update} />
      </Card.Content>
      <Card.Footer className={card.footer}>
        <View person={person} />
      </Card.Footer>
    </Card>
  );
}

const PersonCardMemo = memo(PersonCard);
export default PersonCardMemo;
