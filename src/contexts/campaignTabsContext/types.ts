import { ITab } from "@/components/blocks/CampaignsTabs/CampaignsTabs";
import { ActionMap } from "../types";

export type CampaignTabsContextProps = {
  tabs: ITab[] | null;
};

export enum CampaignTabsContextTypes {
  SET_TABS = "SET_TABS",
}

export type CampaignTabsContextPayload = {
  [CampaignTabsContextTypes.SET_TABS]: {
    data: CampaignTabsContextProps["tabs"];
  };
};

export type CampaignTabsActions =
  ActionMap<CampaignTabsContextPayload>[keyof ActionMap<CampaignTabsContextPayload>];
