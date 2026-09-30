import PersonTableWrapper from "@/components/blocks/signaight/PersonTableWrapper/PersonTableWrapper";
import JsonSchemaWrapper from "@/components/blocks/servers/JsonSchemaWrapper/JsonSchemaWrapper";
import { searchPersonsQuery } from "@/constants/search";
import PersonProvider from "@/contexts/personContext/PersonContext";

export default function Loading() {
  return (
    <PersonProvider
      personsData={{ items: [], size: 0, page: 1, pages: 1, total: 0 }}
      projectId={""}
      searchQueries={searchPersonsQuery}
      loading={true}
    >
      <PersonTableWrapper>
        <JsonSchemaWrapper lang={"en"} type="page" template="screening" />
      </PersonTableWrapper>
    </PersonProvider>
  );
}
