import PersonTableWrapper from "@/components/blocks/signaight/PersonTableWrapper/PersonTableWrapper";
import { searchPersonsQuery } from "@/constants/search";
import PersonProvider from "@/contexts/personContext/PersonContext";
import RiskMatrixPage from "@/components/pages/RiskMatrixPage";

export default function Loading() {
  return (
    <PersonProvider
      personsData={{ items: [], size: 0, page: 1, pages: 1, total: 0 }}
      projectId={""}
      searchQueries={searchPersonsQuery}
      loading={true}
    >
      <PersonTableWrapper>
        <RiskMatrixPage />
      </PersonTableWrapper>
    </PersonProvider>
  );
}
