import { Suspense } from "react";
import type { Metadata } from "next";
import { productName, sortingStrings } from "@/constants";
import GetPersonsWrapper from "@/components/blocks/servers/GetPersonsWrapper/GetPersonsWrapper";
import { SEARCH_PERSONS_COUNT } from "@/constants/search";
import JsonSchemaWrapper from "@/components/blocks/servers/JsonSchemaWrapper/JsonSchemaWrapper";
import PersonTableWrapper from "@/components/blocks/signaight/PersonTableWrapper/PersonTableWrapper";
import LoadingProgress from "@/components/atoms/LoadingProgress";
import RiskmatrixWidgets from "@/components/blocks/signaight/RistmatrixWidgets";
import { ALL_PROJECTS } from "@/constants/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${productName} - Risk Matrix`,
  description: `${productName} - Risk Matrix`,
};

export default async function PersonsPage(props: {
  params: { lang: string; campaignId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = await props.params;
  const search = await props.searchParams;
  const projectId = typeof search?.it === "string" ? search.it : undefined;
  return (
    <Suspense fallback={<LoadingProgress />}>
      <GetPersonsWrapper
        {...props}
        pageSize={SEARCH_PERSONS_COUNT}
        orderBy={[sortingStrings.risk_score_desc, sortingStrings.f_name_asc]}
      >
        <PersonTableWrapper>
          {projectId && projectId !== ALL_PROJECTS ? (
            <RiskmatrixWidgets projectId={projectId} />
          ) : null}
          <JsonSchemaWrapper lang={lang} type="page" template="riskmatrix" />
        </PersonTableWrapper>
      </GetPersonsWrapper>
    </Suspense>
  );
}
