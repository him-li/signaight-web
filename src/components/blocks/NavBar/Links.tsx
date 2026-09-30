"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { Icons } from "@/components/atoms/Icons";
import { ROUTES } from "@/constants/routes";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import { getPersonName } from "@/utils/getPersonName";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import usePersonsSearchModal from "@/components/blocks/PersonsList/usePersonsSearchModal";
const Projects = dynamic(() => import("./ProjectsList/ProjectsList"), {
  loading: () => <></>,
  ssr: false,
});

export type NavLink = {
  name: string;
  to: string;
  page: string;
  avatar?: string;
};

export default function NavLinks() {
  const [campaignLink, setCampaignLink] = useState<NavLink | null>(null);
  const [personLink, setPersonLink] = useState<NavLink | null>(null);
  const project = useAppSelector(selectSelectedProject);
  const person = useAppSelector(selectCurrentSubjectData);
  const params = useParams();
  const pathname = usePathname();
  const { modal, state } = usePersonsSearchModal(
    pathname?.split("/").slice(0, -1).join("/") ?? "#",
    false,
  );

  useEffect(() => {
    const campaignId = params?.campaignId;
    const personId = params?.personId;

    if (campaignId) {
      setCampaignLink({
        name: project?.title || "Campaign",
        to: `${ROUTES.SCREENING}/${campaignId}`,
        page: "campaign",
      });
    } else {
      setCampaignLink(null);
    }

    if (personId) {
      setPersonLink({
        name:
          getPersonName(person?.personal_details?.name, "full_name") ||
          "Person",
        avatar: getPersonAvatar(
          person?.personal_details?.visuals?.profile_photo,
        ),
        to: `${ROUTES.SCREENING}/${campaignId}/evaluation/${personId}`,
        page: "person",
      });
    } else {
      setPersonLink(null);
    }
  }, [params, project, person]);

  return (
    <>
      <div className="flex items-center">
        {campaignLink && (
          <>
            <Icons.ChevronRight size="10" />
            <Projects name={campaignLink.name} />
          </>
        )}
        {personLink && (
          <>
            <Icons.ChevronRight size="10" />
            <Button
              variant="ghost"
              onPress={state.open}
              className="inline-flex items-center"
            >
              <Avatar>
                <Avatar.Image src={personLink.avatar} alt={personLink.name} />
                <Avatar.Fallback>
                  <Icons.Person />
                </Avatar.Fallback>
              </Avatar>
              <span>{personLink.name}</span>
            </Button>
          </>
        )}
      </div>
      {modal}
    </>
  );
}
