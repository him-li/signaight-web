/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { Button, Dropdown, Label } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import useAddProjectModal from "@/components/blocks/AddProjectModal/useAddProjectModal";
import useAddApplicantModal from "@/components/blocks/AddPersonModal/useAddPersonModal";
import { ROUTES } from "@/constants/routes";
import PersonProvider from "@/contexts/personContext/PersonContext";
import { PersonQuery } from "@/types/person/index.interface";
import { button, modal } from "styles/styles";

export default function Footer() {
  const params = useParams();
  const pathname = usePathname();
  const lang = params?.lang;
  const campaignId = params?.campaignId as string;
  const isOnCampaignsPage = usePathname() === `/${lang}${ROUTES.SCREENING}`;
  const pathArr = pathname?.split("/");
  const disableFooter = pathArr?.includes("evaluation") || pathname === "/";
  const { modal: AddApplicantModal, state: personState } =
    useAddApplicantModal();
  const { modal: AddProjectModal, state: projectState } = useAddProjectModal();

  if (disableFooter) {
    return null;
  }

  return (
    <PersonProvider
      projectId={campaignId || ""}
      personsData={{ items: [], page: 1, pages: 1, total: 0, size: 0 }}
      searchQueries={{} as PersonQuery}
    >
      <footer id="#/properties/campaigns-footer">
        <Dropdown>
          <Button
            variant="ghost"
            isIconOnly
            className={
              button.ghost_accent + " z-9999 w-12 h-12 fixed bottom-5 end-5"
            }
          >
            <Icons.Plus />
          </Button>
          <Dropdown.Popover aria-label="Footer Menu" className={modal.base}>
            <Dropdown.Menu>
              {isOnCampaignsPage ? null : (
                <Dropdown.Item
                  id="add-applicant"
                  key="add-applicant"
                  onPress={personState.open}
                  aria-label="Add Applicant"
                >
                  <Icons.Plus />
                  <Label>Add Applicant</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              )}
              {isOnCampaignsPage ? null : (
                <Dropdown.Item
                  href={`/${lang}${ROUTES.SCREENING}/${campaignId}/search`}
                  key="search-applicant"
                  aria-label="Search Applicants"
                >
                  <Icons.Search />
                  <Label>Search Applicants</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              )}
              {isOnCampaignsPage ? (
                <Dropdown.Item
                  id="add-campaign"
                  key="add-campaign"
                  onPress={projectState.open}
                  aria-label="Add Campaign"
                >
                  <Icons.LinkAnalysis />
                  <Label>Add Campaign</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              ) : null}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </footer>
      {AddApplicantModal}
      {AddProjectModal}
    </PersonProvider>
  );
}
