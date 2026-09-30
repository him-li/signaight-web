"use client";
import { Tooltip } from "@heroui/react";
import { useMemo } from "react";
import Link from "next/link";
import InfoBar from "./InfoBar";
import { Icons } from "@/components/atoms/Icons";
import { useParams } from "next/navigation";
import { useCampaignTabsState } from "@/contexts/campaignTabsContext/CampaignTabsContext";
import { ROUTES } from "@/constants/routes";

export default function EvaluationNavbar() {
  const params = useParams();
  const personId = params?.personId?.toString();
  const campaignId = params?.campaignId?.toString();
  const { tabs } = useCampaignTabsState();
  const prevId = useMemo(() => {
    if (!tabs) {
      return personId;
    }
    const currentIndex = tabs.findIndex((it) => it.id === personId);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = tabs.length - 1;
    }

    return tabs?.[prevIndex]?.id ?? personId;
  }, [personId, tabs]);
  const nextId = useMemo(() => {
    if (!tabs) {
      return personId;
    }
    const currentIndex = tabs.findIndex((it) => it.id === personId);
    let nextIndex = currentIndex + 1;
    if (nextIndex > tabs!.length - 1) {
      nextIndex = 0;
    }

    return tabs?.[nextIndex]?.id ?? personId;
  }, [personId, tabs]);

  return (
    <div className="evaluation_navbar flex items-center w-full relative">
      <Tooltip>
        <Tooltip.Trigger>
          <Link
            href={`${ROUTES.SCREENING}/${campaignId}/evaluation/${prevId}`}
            className="text-3xl duration-300 ease-in-out absolute start-4"
          >
            <Icons.ChevronLeft />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>Previous Applicant</Tooltip.Content>
      </Tooltip>
      <InfoBar />
      <Tooltip>
        <Tooltip.Trigger>
          <Link
            href={`${ROUTES.SCREENING}/${campaignId}/evaluation/${nextId}`}
            className="text-3xl duration-300 ease-in-out absolute end-4"
          >
            <Icons.ChevronRight />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>Next Applicant</Tooltip.Content>
      </Tooltip>
    </div>
  );
}
