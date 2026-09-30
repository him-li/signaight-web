"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type FC,
  type PropsWithChildren,
} from "react";
import { useParams } from "next/navigation";
import { CampaignTabsReducer, initCampaignTabsState } from "./reducer";
import { CampaignTabsContextProps, CampaignTabsContextTypes } from "./types";
import { ITab } from "@/components/blocks/CampaignsTabs/CampaignsTabs";
import { useCache } from "../cacheContext/CacheContext";
import PersonsService from "@/services/personsService";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { useAppSelector } from "@/store/store";
import { useLayoutState } from "../layoutContext/LayoutContext";
import { searchPersonsQuery } from "@/constants/search";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import EventBus from "@/services/EventBus/EventBus";
import { getPersonName } from "@/utils/getPersonName";

const actionsList = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCampaignTabs: (d: ITab[]) => {},
};

const CampaignTabsStateContext = createContext<CampaignTabsContextProps>({
  ...initCampaignTabsState,
});

const CampaignTabsActionsContext = createContext(actionsList);

type CampaignTabsProviderProps = object;

const ONE_DAY_CACHE = 24 * 60 * 60 * 1000; // 1 day in milliseconds

const CampaignTabsProvider: FC<
  PropsWithChildren<CampaignTabsProviderProps>
> = ({ children }) => {
  const params = useParams();
  const campaignId = params?.campaignId?.toString();
  const token = useAppSelector(getTokenSelector);
  const { layoutName } = useLayoutState();
  const [state, dispatch] = useReducer(
    CampaignTabsReducer,
    initCampaignTabsState,
  );
  const { revalidate, set, get } = useCache();
  const cacheKey = `campaign-tabs-${campaignId}`;

  const setCampaignTabs = useCallback(
    async (d: ITab[]) => {
      try {
        set(cacheKey, d);
      } catch (error) {
        console.log("errror", error);
      }
      dispatch({
        type: CampaignTabsContextTypes.SET_TABS,
        payload: { data: d },
      });
    },
    [cacheKey, set],
  );

  useEffect(() => {
    const tabs = state.tabs;
    EventBus.subscribe("person-data-change", (event) => {
      const newTabs = tabs?.map((it) => {
        if (it.id === event.person.id) {
          const avatar = getPersonAvatar(
            event.person.personal_details?.visuals?.profile_photo,
          );
          const name = getPersonName(
            event.person.personal_details?.name,
            "full_name",
          );
          return {
            ...it,
            avatar,
            name,
          };
        }
        return it;
      }) as ITab[];
      setCampaignTabs(newTabs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tabs]);

  useEffect(() => {
    const tabs = state.tabs;
    EventBus.subscribe("persons-deleted", (event) => {
      let newTabs = [] as ITab[];
      if (event.method === "in") {
        newTabs = tabs?.filter(
          (it) => !event.personIds.some((v) => v === it.id),
        ) as ITab[];
      }
      if (event.method === "not_in") {
        newTabs = tabs?.filter((it) =>
          event.personIds.some((v) => v === it.id),
        ) as ITab[];
      }
      setCampaignTabs(newTabs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tabs]);

  const getPersonsData = useCallback(
    async (d: ITab[]) => {
      try {
        const data = await PersonsService.getPersonsByProject({
          project_id: campaignId!,
          searchQuery: {
            ...searchPersonsQuery,
            ids__in: d.map((v) => v.id).join(","),
          },
          token,
          page: 1,
          pageSize: d.length,
          project_platform: layoutName,
        });
        const tabs = d.reduce((acc, v) => {
          const person = data.items?.find((it) => it.id === v.id);
          if (person) {
            const avatar = getPersonAvatar(
              person?.personal_details?.visuals?.profile_photo,
            );
            const name =
              getPersonName(person?.personal_details?.name, "full_name") ?? "";
            return [
              ...acc,
              {
                id: v.id,
                avatar,
                name,
                isClosed: v.isClosed,
              },
            ];
          }
          return acc;
        }, [] as ITab[]);
        return tabs;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (e: any) {
        return d;
      }
    },
    [campaignId, layoutName, token],
  );

  useEffect(() => {
    const getData = async () => {
      let tabs: ITab[] = [];
      try {
        tabs = JSON.parse(localStorage.getItem(campaignId!) ?? "[]");
      } catch (error) {
        console.log("errror", error);
      } finally {
        // TODO: remove this after migration to cache
        localStorage.setItem(campaignId!, JSON.stringify([]));
      }
      if (!tabs.length) {
        try {
          tabs = (await get<ITab[]>(cacheKey)) ?? ([] as ITab[]);
        } catch (error) {
          console.log("errror", error);
        }
      }
      revalidate<ITab[]>(
        cacheKey,
        () => getPersonsData(tabs),
        ONE_DAY_CACHE,
      ).then((r) => {
        dispatch({
          type: CampaignTabsContextTypes.SET_TABS,
          payload: { data: r },
        });
      });
    };
    if (campaignId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({ setCampaignTabs }), [setCampaignTabs]);

  return (
    <CampaignTabsActionsContext.Provider value={actions}>
      <CampaignTabsStateContext.Provider value={value}>
        {children}
      </CampaignTabsStateContext.Provider>
    </CampaignTabsActionsContext.Provider>
  );
};

function useCampaignTabsState() {
  const context = useContext(CampaignTabsStateContext);
  if (context === undefined) {
    throw new Error(
      "useCampaignTabsState must be used within a CampaignTabsProvider",
    );
  }
  return context;
}
function useCampaignTabsActions() {
  const context = useContext(CampaignTabsActionsContext);
  if (context === undefined) {
    throw new Error(
      "useCampaignTabsActions must be used within a CampaignTabsProvider",
    );
  }
  return context;
}

export default CampaignTabsProvider;

export { useCampaignTabsState, useCampaignTabsActions };
