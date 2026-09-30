import type { ReactNode } from "react";
import Navbar from "@/components/blocks/signaight/Navbar";

export default function CommonHeaderLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
