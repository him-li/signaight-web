import type { Metadata } from "next";
import { productName } from "@/constants";
import InitialPersonWrapper from "@/components/blocks/servers/GetPersonsWrapper/InitialPersonWrapper";
import DetailsPage from "@/components/pages/DetailsPage";
import ProfileSelection from "@/components/blocks/ProfileSelectionSidebar";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
  title: `${productName} - Details`,
  description: `${productName} - Details`,
};

export default async function Details({
  params,
}: {
  params: Promise<{ lang: string; subjectId: string }>;
}) {
  return (
    <InitialPersonWrapper params={params}>
      <DetailsPage />
      <ProfileSelection />
    </InitialPersonWrapper>
  );
}
