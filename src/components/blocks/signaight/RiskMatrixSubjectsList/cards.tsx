import dynamic from "next/dynamic";
import Display from "@/components/atoms/Display";
import type { Person } from "@/types/person/index.interface";
import PersonCard from "./PersonCard";
import TableToolbar from "@/components/blocks/TableToolbar";
const Pagination = dynamic(() => import("./pagination"), {
  ssr: false,
  loading: () => <div />,
});
const NoPersonFallback = dynamic(
  () => import("@/components/atoms/NoPersonFallback"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function SubjectCards({ persons }: { persons: Person[] }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <TableToolbar />
      <Display
        when={persons.length > 0}
        fallback={<NoPersonFallback personNaming="subject" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 place-content-center-safe place-items-center-safe p-8 gap-4 text-sm">
          {persons.map((person) => {
            if (!person) return null;

            return <PersonCard key={person.id} person={person} />;
          })}
        </div>
        <Pagination />
      </Display>
    </div>
  );
}
