"use client";
import { useLayoutEffect } from "react";
import { store } from "@/store/store";
import { setToken } from "@/store/authSlice/auth.slice";
type Props = { token: string };

export default function Preloaders({ token }: Props) {
  useLayoutEffect(() => {
    store.dispatch(setToken(token));
  }, [token]);

  return null;
}
