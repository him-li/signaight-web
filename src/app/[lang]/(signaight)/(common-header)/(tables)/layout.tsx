import type { ReactNode } from "react";
import CommonLayout from "@/components/blocks/signaight/CommonLayout";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CommonLayout>{children}</CommonLayout>;
}
