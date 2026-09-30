/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { AnalysisReducer, initAnalysisState } from "./reducer";
import {
  AnalysisContextProps,
  AnalysisContextTypes,
  ISearchParams,
} from "./types";
import { useAppSelector } from "@/store/store";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { toast } from "@heroui/react";
import { SEARCH_COUNT } from "@/constants/search";
import PersonsService from "@/services/personsService";
import { IPagination } from "@/types/tables.interface";

const actionsList = {
  getUsers: (d: ISearchParams) => {},
  setSearchField: (field: AnalysisContextProps["searchField"]) => {},
  setValue: (field: string) => {},
};

const AnalysisStateContext = React.createContext<AnalysisContextProps>({
  ...initAnalysisState,
});

const AnalysisActionsContext = React.createContext(actionsList);

type AnalysisProviderProps = { isNewSearch: boolean; projectId: string };

const AnalysisProvider: React.FC<PropsWithChildren<AnalysisProviderProps>> = ({
  children,
  isNewSearch,
  projectId,
}) => {
  const [state, dispatch] = React.useReducer(
    AnalysisReducer,
    initAnalysisState,
  );

  const token = useAppSelector(getTokenSelector);
  const cacheRef = useRef<{
    [key: string]: {
      [it: string]: { items: AnalysisContextProps["users"] } & IPagination;
    };
  }>({});

  const getUsers = useCallback(
    async ({ page, isAdd, searchField, searchValue }: ISearchParams) => {
      try {
        dispatch({
          type: AnalysisContextTypes.SET_LOADING,
          payload: { data: true },
        });
        let data = {} as { items: AnalysisContextProps["users"] } & IPagination;
        let search = state.searchQuery;
        if (searchField) {
          search = { ...state.searchQuery, [searchField]: searchValue };
          dispatch({
            type: AnalysisContextTypes.SET_SEARCH_QUERY,
            payload: {
              data: { ...state.searchQuery, [searchField]: searchValue },
            },
          });
        }
        const key =
          page +
          (searchValue ?? search[state.searchField]) +
          (searchField ?? state.searchField);
        if (cacheRef.current?.[projectId]?.[key]) {
          data = cacheRef.current?.[projectId][key];
        } else {
          data = await PersonsService.getPersonsByProject({
            project_id: projectId,
            searchQuery: search,
            token,
            page,
            pageSize: SEARCH_COUNT,
          });

          cacheRef.current = {
            ...(cacheRef.current ?? {}),
            [projectId]: {
              ...(cacheRef.current?.[projectId] ?? {}),
              [key]: data,
            },
          };
        }

        dispatch({
          type: AnalysisContextTypes.SET_USERS,
          payload: { data, isAdd, projectId },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.danger(error.message);
      } finally {
        dispatch({
          type: AnalysisContextTypes.SET_LOADING,
          payload: { data: false },
        });
      }
    },
    [projectId, state.searchField, state.searchQuery, token],
  );
  const setSearchField = useCallback(
    async (field: AnalysisContextProps["searchField"]) => {
      dispatch({
        type: AnalysisContextTypes.SET_SEARCH_FIELD,
        payload: { data: field },
      });
    },
    [],
  );
  const setValue = useCallback(async (v: string) => {
    dispatch({
      type: AnalysisContextTypes.SET_SEARCH_VALUE,
      payload: { data: v },
    });
  }, []);

  useEffect(() => {
    if (projectId && isNewSearch) {
      getUsers({ page: 1, isAdd: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, isNewSearch]);

  useEffect(() => {
    if (state.searchValue) {
      getUsers({
        page: 1,
        isAdd: false,
        searchField: state.searchField,
        searchValue: state.searchValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchField]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(
    () => ({ getUsers, setSearchField, setValue }),
    [getUsers, setSearchField, setValue],
  );

  return (
    <AnalysisActionsContext.Provider value={actions}>
      <AnalysisStateContext.Provider value={value}>
        {children}
      </AnalysisStateContext.Provider>
    </AnalysisActionsContext.Provider>
  );
};

function useAnalysisState() {
  const context = React.useContext(AnalysisStateContext);
  if (context === undefined) {
    throw new Error("useAnalysisState must be used within a AnalysisProvider");
  }
  return context;
}
function useAnalysisActions() {
  const context = React.useContext(AnalysisActionsContext);
  if (context === undefined) {
    throw new Error(
      "useAnalysisActions must be used within a AnalysisProvider",
    );
  }
  return context;
}

export default AnalysisProvider;

export { useAnalysisState, useAnalysisActions };
