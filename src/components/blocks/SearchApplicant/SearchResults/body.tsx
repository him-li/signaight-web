import { Candidate } from "@/types/candidate.interface";
import SearchResultItem from "./SearchItem";

type TableBodyProps = {
  persons: Candidate[];
};

export default function SearchResultsBody({ persons }: TableBodyProps) {
  return (
    <>
      {persons?.map((person, index) => (
        <SearchResultItem
          index={index}
          person={person}
          key={person?.id ?? index}
        />
      ))}
    </>
  );
}
