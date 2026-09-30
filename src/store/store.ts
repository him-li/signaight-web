"use client";
import { useDispatch, useSelector, useStore } from "react-redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { projectsSlice } from "./projectsSlice";
import { subjectsSlice } from "./subjectsSlice";
import { pageLoadingSlice } from "./pageLoadingSlice";
import { profileSelectSlice } from "./profileSelectSlice";
import { flowsSlice } from "./flowsSlice";
import { searchesSlice } from "./searchesSlice";
import { authSlice } from "./authSlice/auth.slice";
import { i18nSlice } from "./i18nSlice/i18nSlice";
import { activeSearchSlice } from "./activeSearchSlice";

export const store = configureStore({
  reducer: {
    [projectsSlice.name]: projectsSlice.reducer,
    [subjectsSlice.name]: subjectsSlice.reducer,
    [pageLoadingSlice.name]: pageLoadingSlice.reducer,
    [profileSelectSlice.name]: profileSelectSlice.reducer,
    [flowsSlice.name]: flowsSlice.reducer,
    [searchesSlice.name]: searchesSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [i18nSlice.name]: i18nSlice.reducer,
    [activeSearchSlice.name]: activeSearchSlice.reducer,
  },
  devTools: true,
});

export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppStore>();
