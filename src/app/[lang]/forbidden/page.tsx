import ForbiddenPage from "@/components/pages/ForbiddenPage";
import type { Metadata } from "next";
import { productName } from "@/constants";

export const metadata: Metadata = {
  title: `${productName} - Forbidden`,
  description: `${productName} - Forbidden`,
};

export default function Forbidden() {
  return <ForbiddenPage />;
}
