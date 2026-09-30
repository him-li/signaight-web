/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { SearchParamsReducer, initSearchParamsState } from "./reducer";
import { SearchParamsContextProps, SearchParamsContextTypes } from "./types";
import { SEARCH_QURIES } from "@/constants/search";

const actionsList = {
  moveToPage: (t: number) => {},
  setItemQuery: (v: string) => {},
  setQueries: (d: { key: string; value: string }[]) => {},
  deleteQueries: (d: {
    queryToRemove?: string[];
    excludeKeys?: string[];
  }) => {},
  refresh: () => {},
};

const SearchParamsStateContext = React.createContext<SearchParamsContextProps>({
  ...initSearchParamsState,
});

const SearchParamsActionsContext = React.createContext(actionsList);

type SearchParamsProviderProps = object;

const SearchParamsProvider: React.FC<
  PropsWithChildren<SearchParamsProviderProps>
> = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const [state, dispatch] = React.useReducer(
    SearchParamsReducer,
    initSearchParamsState,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams!);
    const pageNumber = Number(params.get(SEARCH_QURIES.PAGE)) ?? 1;
    dispatch({
      type: SearchParamsContextTypes.SET_CURRENT_PAGE,
      payload: { data: pageNumber },
    });
    sessionStorage.setItem("currentPage", pageNumber.toString());
    dispatch({
      type: SearchParamsContextTypes.SET_CURRENT_ITEM,
      payload: { data: params.get(SEARCH_QURIES.ITEM)! },
    });
    sessionStorage.setItem("currentItem", params.get(SEARCH_QURIES.ITEM)!);
  }, [searchParams]);

  const moveToPage = useCallback(
    (v: number) => {
      const params = new URLSearchParams(searchParams!);

      params.set(SEARCH_QURIES.PAGE, v.toString());
      const path = `${pathname}?${params.toString()}`;

      sessionStorage.setItem("currentPage", v.toString());
      push(path);
    },
    [pathname, replace, searchParams],
  );

  const refresh = () => {
    const queryString = searchParams?.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    push(url!);
  };

  const setItemQuery = useCallback(
    (v: string) => {
      const params = new URLSearchParams(searchParams!);

      params.set(SEARCH_QURIES.ITEM, v);
      params.set(SEARCH_QURIES.PAGE, "1");
      const path = `${pathname}?${params.toString()}`;
      sessionStorage.setItem("currentItem", v);
      sessionStorage.setItem("currentPage", "1");
      dispatch({
        type: SearchParamsContextTypes.SET_CURRENT_ITEM,
        payload: { data: v },
      });
      dispatch({
        type: SearchParamsContextTypes.SET_CURRENT_PAGE,
        payload: { data: 1 },
      });
      replace(path);
    },
    [pathname, replace, searchParams],
  );

  const setQueries = useCallback(
    (data: { key: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams!);
      data.forEach(({ key, value }) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const path = `${pathname}?${params.toString()}`;

      replace(path);
    },
    [pathname, replace, searchParams],
  );

  const deleteQueries = useCallback(
    ({
      queryToRemove,
      excludeKeys,
    }: {
      queryToRemove?: string[];
      excludeKeys?: string[];
    }) => {
      const params = new URLSearchParams(searchParams!);
      queryToRemove?.forEach((key) => {
        if (excludeKeys?.includes(key)) {
          return;
        }
        params.delete(key);
      });
      if (!queryToRemove) {
        for (const [key, value] of Array.from(params.entries())) {
          if (!excludeKeys?.includes(key)) {
            params.delete(key);
          }
        }
      }
      const path = `${pathname}?${params.toString()}`;

      replace(path);
    },
    [pathname, replace, searchParams],
  );

  const value = useMemo(() => state, [state]);

  const actions = useMemo(
    () => ({ moveToPage, setItemQuery, setQueries, deleteQueries, refresh }),
    [deleteQueries, moveToPage, refresh, setItemQuery, setQueries],
  );
  return (
    <SearchParamsActionsContext.Provider value={actions}>
      <SearchParamsStateContext.Provider value={value}>
        {children}
      </SearchParamsStateContext.Provider>
    </SearchParamsActionsContext.Provider>
  );
};

function useSearchParamsState() {
  const context = React.useContext(SearchParamsStateContext);
  if (context === undefined) {
    throw new Error(
      "useSearchParamsState must be used within a SearchParamsProvider",
    );
  }
  return context;
}
function useSearchParamsActions() {
  const context = React.useContext(SearchParamsActionsContext);
  if (context === undefined) {
    throw new Error(
      "useSearchParamsActions must be used within a SearchParamsProvider",
    );
  }
  return context;
}

export default SearchParamsProvider;

export { useSearchParamsState, useSearchParamsActions };
