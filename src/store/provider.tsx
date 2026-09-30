"use client";
import { type ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import type { Locale } from "i18n.config";
import { setLang, setDictionary, type Dictionary } from "./i18nSlice/i18nSlice";
import { setToken, setUserinfo } from "./authSlice/auth.slice";
import type { UserInfo } from "@/auth";

export type ReduxProviderProps = {
  children: ReactNode;
  lang: Locale;
  dictionary: Dictionary;
  token: string;
  userinfo: UserInfo | null;
};

export default function ReduxProvider({
  children,
  lang,
  dictionary,
  token,
  userinfo,
}: ReduxProviderProps) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setLang(lang));
    storeRef.current.dispatch(setDictionary(dictionary));
    storeRef.current.dispatch(setToken(token));
    storeRef.current.dispatch(setUserinfo(userinfo));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
