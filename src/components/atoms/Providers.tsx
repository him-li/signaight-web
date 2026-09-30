"use client";
import { ToastProvider } from "@heroui/react";
import dynamic from "next/dynamic";
import ReduxProvider, { type ReduxProviderProps } from "@/store/provider";
const SearchParamsProvider = dynamic(
  () => import("@/contexts/searchParamsContext/SearchParamsContext"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function Providers({ children, ...props }: ReduxProviderProps) {
  return (
    <ReduxProvider {...props}>
        <SearchParamsProvider>
          <ToastProvider maxVisibleToasts={1} />
          {children}
        </SearchParamsProvider>
    </ReduxProvider>
  );
}
