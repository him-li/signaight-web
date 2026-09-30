import dynamic from "next/dynamic";
import type { Person } from "@/types/person/index.interface";
import Display from "@/components/atoms/Display";
import SignAIghtPersonCard from "./SignAIghtPersonCard";
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
    <div className="flex flex-col gap-2 my-auto">
      <TableToolbar />
      <Display
        when={persons.length > 0}
        fallback={<NoPersonFallback personNaming="subject" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 place-content-center-safe place-items-center-safe p-8 gap-4 text-sm">
          {persons.map((person) => {
            if (!person) return null;
            return <SignAIghtPersonCard key={person.id} person={person} />;
          })}
        </div>
        <Pagination />
      </Display>
    </div>
  );
}
