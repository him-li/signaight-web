"use client";
import { useCallback } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Avatar, CloseButton } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { ITab } from "./CampaignsTabs";
import {
  useCampaignTabsActions,
  useCampaignTabsState,
} from "@/contexts/campaignTabsContext/CampaignTabsContext";
import { ROUTES } from "@/constants/routes";

type Props = { tab: ITab; href: string };

export default function ChipItem({ tab, href }: Props) {
  const params = useParams();
  const pathname = usePathname();
  const lang = params?.lang;
  const campaignId = params?.campaignId?.toString();
  const { setCampaignTabs } = useCampaignTabsActions();
  const { tabs } = useCampaignTabsState();

  const handleCloseTab = useCallback(
    (id: string) => {
      const newTabs = tabs?.filter((tab) => tab.id !== id) ?? [];
      setCampaignTabs(newTabs);
    },
    [setCampaignTabs, tabs],
  );

  return (
    <div className="flex items-center-safe gap-1">
      <Link href={href}>
        <Avatar className="h-6 w-6">
          <Avatar.Image src={tab.avatar} />
          <Avatar.Fallback>
            <Icons.Person />
          </Avatar.Fallback>
        </Avatar>
      </Link>
      <Link href={href}>{tab.name}</Link>
      <CloseButton
        className={
          pathname ===
          `/${lang}${ROUTES.SCREENING}/${campaignId}/evaluation/${tab.id}`
            ? "hidden"
            : "visible"
        }
        aria-label="Close chip"
        onPress={() => handleCloseTab(tab.id)}
      />
    </div>
  );
}
