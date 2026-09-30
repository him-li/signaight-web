import { Suspense } from "react";
import type { Metadata } from "next";
import { productName, sortingStrings } from "@/constants";
import { SEARCH_PERSONS_COUNT } from "@/constants/search";
import GetPersonsWrapper from "@/components/blocks/servers/GetPersonsWrapper/GetPersonsWrapper";
import JsonSchemaWrapper from "@/components/blocks/servers/JsonSchemaWrapper/JsonSchemaWrapper";
import PersonTableWrapper from "@/components/blocks/signaight/PersonTableWrapper/PersonTableWrapper";
import LoadingProgress from "@/components/atoms/LoadingProgress";

export const metadata: Metadata = {
  title: `${productName} - Screening`,
  description: `${productName} - Screening`,
};

export default async function Screening(props: {
  params: { lang: string; campaignId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = await props.params;
  return (
    <Suspense
      fallback={
        <div className="w-full">
          <LoadingProgress />
        </div>
      }
    >
      <GetPersonsWrapper
        {...props}
        pageSize={SEARCH_PERSONS_COUNT}
        orderBy={[
          sortingStrings.search_state_done_desc,
          sortingStrings.f_name_asc,
        ]}
      >
        <PersonTableWrapper>
          <JsonSchemaWrapper lang={lang} type="page" template="screening" />
        </PersonTableWrapper>
      </GetPersonsWrapper>
    </Suspense>
  );
}
