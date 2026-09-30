import type { Metadata } from "next";
import { productName } from "@/constants";
import JsonSchemaWrapper from "@/components/blocks/servers/JsonSchemaWrapper/JsonSchemaWrapper";
import InitialPersonWrapper from "@/components/blocks/servers/GetPersonsWrapper/InitialPersonWrapper";
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
  const { lang } = await params;
  return (
    <InitialPersonWrapper params={params}>
      <JsonSchemaWrapper lang={lang} type="page" template="details-uuid" />
    </InitialPersonWrapper>
  );
}
