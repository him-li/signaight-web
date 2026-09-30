import {
  CampaignTabsActions,
  CampaignTabsContextProps,
  CampaignTabsContextTypes,
} from "./types";

export const initCampaignTabsState: CampaignTabsContextProps = {
  tabs: null,
};

export function CampaignTabsReducer(
  state: CampaignTabsContextProps,
  action: CampaignTabsActions,
): CampaignTabsContextProps {
  switch (action.type) {
    case CampaignTabsContextTypes.SET_TABS: {
      return {
        ...state,
        tabs: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}
