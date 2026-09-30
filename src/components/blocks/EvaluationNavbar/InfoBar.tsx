"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, Badge, Button, Card } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppSelector } from "@/store/store";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import usePersonsSearchModal from "@/components/blocks/PersonsList/usePersonsSearchModal";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { getPersonName } from "@/utils/getPersonName";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import { button } from "styles/styles";
const PersonAvatars = dynamic(
  () => import("@/components/blocks/modals/PersonAvatarsModal/PersonAvatars"),
  {
    loading: () => null,
    ssr: false,
  },
);
const PersonInfo = dynamic(
  () => import("@/components/blocks/EvaluationNavbar/PersonInfo"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function InfoBar({ isVertical }: { isVertical?: boolean }) {
  const pathname = usePathname();
  const person = useAppSelector(selectCurrentSubjectData)!;
  const avatar = getPersonAvatar(
    person?.personal_details.visuals?.profile_photo,
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { modal, state } = usePersonsSearchModal(
    pathname?.split("/").slice(0, -1).join("/") ?? "#",
    false,
  );

  return (
    <Card className="relative w-full overflow-hidden mx-16 mt-8 bg-default/50">
      <BlurredBackground alt="bg" src={avatar} />
      <Card.Content
        className={
          isVertical
            ? "columns-1 h-fit p-2 z-10"
            : "flex flex-col md:flex-row justify-center items-center w-full p-6 z-10"
        }
      >
        <div className="flex flex-col xl:flex-row w-fit justify-between items-center gap-4 mx-4">
          <Badge.Anchor onClick={() => setIsExpanded(!isExpanded)}>
            <Avatar
              key={avatar}
              className="w-32 h-32 ease-in-out"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Avatar.Image src={avatar} />
            </Avatar>
            <Badge
              variant="soft"
              placement="bottom-right"
              className={
                !isExpanded
                  ? "rotate-180 bg-transparent ease-in-out duration-300 border-none"
                  : "bg-transparent ease-in-out duration-300 border-none"
              }
            >
              <Icons.ChevronUp />
            </Badge>
          </Badge.Anchor>
          <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variant="ghost"
            onPress={state.open}
            className={button.ghost_accent + " min-w-44 my-5"}
          >
            {isHovered ? (
              <div className="flex items-center-safe gap-1">
                <Icons.Search />
                <span>Search Applicant</span>
              </div>
            ) : (
              getPersonName(person?.personal_details?.name, "full_name")
            )}
          </Button>
        </div>
        <PersonInfo isVertical={isVertical} />
      </Card.Content>
      <Card.Footer
        className={`p-0 overflow-hidden transition-all duration-300 ${
          isExpanded
            ? "max-h-125 flex flex-col py-4 overflow-auto"
            : "max-h-0 invisible"
        }`}
      >
        <Button
          variant="ghost"
          fullWidth
          onPress={() => setIsExpanded(false)}
          className="rounded-none"
        >
          <Icons.ChevronUp />
        </Button>
        <PersonAvatars />
      </Card.Footer>
      {modal}
    </Card>
  );
}
