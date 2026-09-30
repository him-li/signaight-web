import PersonTableWrapper from "@/components/blocks/signaight/PersonTableWrapper/PersonTableWrapper";
import { searchPersonsQuery } from "@/constants/search";
import PersonProvider from "@/contexts/personContext/PersonContext";
import ScreeningPage from "@/components/pages/ScreeningPage";

export default function Loading() {
  return (
    <PersonProvider
      personsData={{ items: [], size: 0, page: 1, pages: 1, total: 0 }}
      projectId={""}
      searchQueries={searchPersonsQuery}
      loading={true}
    >
      <PersonTableWrapper>
        <ScreeningPage />
      </PersonTableWrapper>
    </PersonProvider>
  );
}
