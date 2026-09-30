/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type FC,
  type PropsWithChildren,
} from "react";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { PersonReducer, initPersonState } from "./reducer";
import {
  ICreatePersonRequest,
  IPersonSearchParams,
  PersonContextProps,
  PersonContextTypes,
} from "./types";
import { useAppSelector } from "@/store/store";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { toast } from "@heroui/react";
import { Person, PersonQuery } from "@/types/person/index.interface";
import { IPagination } from "@/types/tables.interface";
import PersonsService from "@/services/personsService";
import { SEARCH_QURIES } from "@/constants/search";
import { useLayoutState } from "../layoutContext/LayoutContext";

const PersonAutoPolling = dynamic(() => import("./PersonAutoPolling"), {
  loading: () => null,
  ssr: false,
});

const actionsList = {
  getPersons: (d: IPersonSearchParams) => {},
  createPerson: (
    d: ICreatePersonRequest,
    success: () => void,
    error: (e: Error) => void,
  ) => {},
  updatePersonIfExists: (d: Person) => {},
};

const PersonStateContext = createContext<PersonContextProps>({
  ...initPersonState,
});

const PersonActionsContext = createContext(actionsList);

type PersonProviderProps = {
  personsData: { items: Person[] } & IPagination;
  projectId: string;
  searchQueries: PersonQuery;
  loading?: boolean;
};

const PersonProvider: FC<PropsWithChildren<PersonProviderProps>> = ({
  children,
  personsData,
  projectId,
  searchQueries,
  loading = false,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const currentPage = params.get(SEARCH_QURIES.PAGE);
  const [state, dispatch] = useReducer(PersonReducer, initPersonState);
  const { layoutName } = useLayoutState();
  const token = useAppSelector(getTokenSelector);
  const cacheRef = useRef<{ [it: string]: { items: Person[] } & IPagination }>(
    {},
  );

  useEffect(() => {
    dispatch({
      type: PersonContextTypes.SET_LOADING,
      payload: { data: loading },
    });
  }, [loading]);

  useEffect(() => {
    dispatch({
      type: PersonContextTypes.SET_PAGE_NUMBER,
      payload: { data: (currentPage as string) || 1 },
    });
  }, [currentPage]);

  const getPersons = useCallback(
    async ({ page, isAdd, withoutCache }: IPersonSearchParams) => {
      if (withoutCache) {
        cacheRef.current = {};
      }
      try {
        dispatch({
          type: PersonContextTypes.SET_LOADING,
          payload: { data: true },
        });
        let data = null;
        const key =
          page + projectId + layoutName + pathname + searchParams?.toString();
        if (cacheRef.current?.[key]) {
          data = cacheRef.current?.[key];
        } else {
          data = await PersonsService.getPersonsByProject({
            project_id: projectId,
            token,
            page,
            searchQuery: searchQueries,
            pageSize: state.pagination.size,
            project_platform: layoutName,
          });
          cacheRef.current = {
            ...(cacheRef.current ?? {}),
            [key]: data,
          };
          dispatch({
            type: PersonContextTypes.SET_PERSONS,
            payload: { data, isAdd },
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.danger("Something went wrong. Please try again.");
      } finally {
        dispatch({
          type: PersonContextTypes.SET_LOADING,
          payload: { data: false },
        });
      }
    },
    [
      layoutName,
      pathname,
      projectId,
      searchQueries,
      token,
      state.pagination.size,
    ],
  );

  const updatePersonIfExists = useCallback(async (person: Person) => {
    dispatch({
      type: PersonContextTypes.UPDATE_PERSONS,
      payload: {
        data: person,
      },
    });
  }, []);

  const createPerson = useCallback(
    async (
      d: ICreatePersonRequest,
      success: () => void,
      error: (err: Error) => void,
    ) => {
      try {
        const data = await PersonsService.addPerson(
          projectId,
          d.person,
          d.searchExisting,
          token,
        );
        success();
      } catch (err) {
        error(err as Error);
      }
    },
    [projectId, token],
  );

  useEffect(() => {
    dispatch({
      type: PersonContextTypes.SET_PERSONS,
      payload: { data: personsData, isAdd: false },
    });
    dispatch({
      type: PersonContextTypes.SET_LOADING,
      payload: { data: false },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personsData?.items]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(
    () => ({ getPersons, createPerson, updatePersonIfExists }),
    [createPerson, getPersons, updatePersonIfExists],
  );

  return (
    <PersonActionsContext.Provider value={actions}>
      <PersonStateContext.Provider value={value}>
        <PersonAutoPolling />
        {children}
      </PersonStateContext.Provider>
    </PersonActionsContext.Provider>
  );
};

function usePersonState() {
  const context = useContext(PersonStateContext);
  if (context === undefined) {
    throw new Error("usePersonState must be used within a PersonProvider");
  }
  return context;
}
function usePersonActions() {
  const context = useContext(PersonActionsContext);
  if (context === undefined) {
    throw new Error("usePersonActions must be used within a PersonProvider");
  }
  return context;
}

export default PersonProvider;

export { usePersonState, usePersonActions };
