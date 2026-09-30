import type { Metadata } from "next";
import { productName } from "@/constants";
import InitialPersonWrapper from "@/components/blocks/servers/GetPersonsWrapper/InitialPersonWrapper";
import AnalysisPage from "@/components/pages/AnalysisPage";
import ProfileSelection from "@/components/blocks/ProfileSelectionSidebar";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
  title: `${productName} - Analysis`,
  description: `${productName} - Analysis`,
};

export default async function Analysis({
  params,
}: {
  params: Promise<{ lang: string; subjectId: string }>;
}) {
  return (
    <InitialPersonWrapper params={params}>
      <AnalysisPage />
      <ProfileSelection />
    </InitialPersonWrapper>
  );
}
