"use client";
import { useParams, usePathname } from "next/navigation";
import { Tabs } from "@heroui/react";
import Link from "next/link";
import { Icons } from "@/components/atoms/Icons";
import ChipItem from "./ChipItem";
import PrepearTabs from "./PrepearTabs";
import { useCampaignTabsState } from "@/contexts/campaignTabsContext/CampaignTabsContext";
import { ROUTES } from "@/constants/routes";

const tabs = (lang: string, campaignId: string) => {
  const baseUrl = `/${lang}${ROUTES.SCREENING}/${campaignId}`;
  return [
    {
      id: "leaderboard",
      name: "Leaderboard",
      icon: <Icons.File />,
      href: `${baseUrl}`,
    },
    {
      id: "applicants",
      name: "Applicants",
      icon: <Icons.Persons />,
      href: `${baseUrl}/applicants`,
    },
    {
      id: "search",
      name: "Search",
      icon: <Icons.Search />,
      href: `${baseUrl}/search`,
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Icons.Settings />,
      href: `${baseUrl}/settings`,
    },
  ];
};

export interface ITab {
  id: string;
  name: string;
  avatar?: string;
  isClosed?: boolean;
}

export default function CampaignsTabs() {
  const pathname = usePathname();
  const params = useParams();
  const lang = params?.lang;
  const campaignId = params?.campaignId?.toString();
  const { tabs: openedTabs } = useCampaignTabsState();

  return (
    <>
      <PrepearTabs />
      <Tabs selectedKey={pathname as string} id="#/properties/campaigns-tabs">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options" className="w-fit overflow-x-auto">
            {tabs(lang as string, campaignId!).map((tab) => (
              <Tabs.Tab id={tab.href} key={tab.href} className="w-fit">
                <Link href={tab.href} className="flex items-center-safe gap-2">
                  {tab.icon}
                  {tab.name}
                </Link>
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
            {openedTabs?.map((tab: ITab) => {
              const href = `/${lang}${ROUTES.SCREENING}/${campaignId}/evaluation/${tab.id}`;
              return (
                <Tabs.Tab id={href} key={href}>
                  <ChipItem tab={tab} href={href} />
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </>
  );
}
