"use client";
import { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { ITab } from "./CampaignsTabs";
import { getProjectById, includeSelectedProject } from "@/store/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getAllInfo,
  selectCurrentSubject,
  selectCurrentSubjectImg,
} from "@/store/subjectsSlice";
import { selectCurrentProjectIdData } from "@/store/projectsSlice/projects.selectors";
import {
  useCampaignTabsActions,
  useCampaignTabsState,
} from "@/contexts/campaignTabsContext/CampaignTabsContext";
import { getPersonName } from "@/utils/getPersonName";

export default function PrepearTabs() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const campaignId = params?.campaignId?.toString();
  const person = useAppSelector(selectCurrentSubject);
  const avatar = useAppSelector(selectCurrentSubjectImg);
  const selectedCampaignId = useAppSelector(selectCurrentProjectIdData);
  const { tabs } = useCampaignTabsState();
  const { setCampaignTabs } = useCampaignTabsActions();

  const preparePage = useCallback(async () => {
    if (selectedCampaignId !== campaignId) {
      await dispatch(getAllInfo());
      const { payload: currentCampaign } = await dispatch(
        getProjectById(campaignId!),
      );
      if (currentCampaign)
        dispatch(
          includeSelectedProject({ ...currentCampaign, id: campaignId }),
        );
    }
  }, [campaignId, dispatch, selectedCampaignId]);

  useEffect(() => {
    const handleAddTab = () => {
      const personId = person?.id;
      const personCampaignId = person?.project?.id;
      if (person && personCampaignId === campaignId) {
        if (tabs?.some((tab) => tab.id === personId)) return;
        const name = getPersonName(
          person?.personal_details?.name,
          "full_name",
        ) as string;
        const newTab: ITab = {
          id: personId!,
          name,
          avatar,
        };
        const newTabs = [...(tabs ?? []), newTab].reduce((acc, it) => {
          if (acc.some((v) => v.id === it.id)) return acc;
          return acc.concat(it);
        }, [] as ITab[]) as ITab[];

        setCampaignTabs(newTabs);
      }
    };

    handleAddTab();
    preparePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  return null;
}
