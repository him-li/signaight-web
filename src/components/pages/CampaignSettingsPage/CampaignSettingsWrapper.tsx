"use client";
import { type ReactNode, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getProjectById, includeSelectedProject } from "@/store/projectsSlice";

export default function CampaignSettingsWrapper({
  children,
  campaignId,
}: {
  children: ReactNode;
  campaignId: string;
}) {
  const dispatch = useAppDispatch();

  const updateSelectedProject = useCallback(async () => {
    if (!campaignId) return;
    const { payload: currentCampaign } = await dispatch(
      getProjectById(campaignId),
    );
    if (currentCampaign)
      dispatch(includeSelectedProject({ ...currentCampaign, id: campaignId }));
  }, [campaignId, dispatch]);

  const preparePage = useCallback(async () => {
    await updateSelectedProject();
  }, [updateSelectedProject]);

  useEffect(() => {
    preparePage();
  }, [preparePage, campaignId]);

  return <>{children}</>;
}
