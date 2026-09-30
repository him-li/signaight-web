import SearchResultsHeader from "./head";
import SearchResultsBody from "./body";
import { Candidate } from "@/types/candidate.interface";

export default function SearchResults({
  personsList,
}: {
  personsList: Candidate[];
}) {
  return (
    <div className="w-full">
      <div className="rounded-2xl py-2 lg:bg-default-100 bg-transparent">
        <SearchResultsHeader />
        <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:block">
          <SearchResultsBody persons={personsList} />
        </div>
      </div>
    </div>
  );
}
