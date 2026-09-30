"use client";
import { type ReactNode, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { getProjectById, includeSelectedProject } from "@/store/projectsSlice";
import { fetchActiveSearches } from "@/store/activeSearchSlice";

export default function SearchPageWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const campaignId = params?.campaignId?.toString();

  const updateSelectedProject = useCallback(async () => {
    if (!campaignId) return;
    const { payload: currentCampaign } = await dispatch(
      getProjectById(campaignId),
    );
    if (currentCampaign) {
      dispatch(includeSelectedProject({ ...currentCampaign, id: campaignId }));
      dispatch(fetchActiveSearches());
    }
  }, [campaignId, dispatch]);

  const preparePage = useCallback(async () => {
    await updateSelectedProject();
  }, [updateSelectedProject]);

  useEffect(() => {
    preparePage();
  }, [preparePage, campaignId]);

  return <>{children}</>;
}
