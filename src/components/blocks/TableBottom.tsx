import { useTableState } from "@/contexts/tableContext/TableContext";
import { Person } from "@/types/person/index.interface";
import type { ReactNode } from "react";

export default function TableBottom({ children }: { children: ReactNode }) {
  const {
    tableData: persons,
    selectedKeys,
    deselectedKeys,
    selectedAll,
  } = useTableState<Person>();
  return (
    <div className="w-full flex justify-between items-center-safe">
      <span className="text-sm text-nowrap">
        {`${selectedKeys === "all" || selectedAll ? persons.length - deselectedKeys.size : selectedKeys.size} of ${persons.length} selected`}
      </span>
      {children}
    </div>
  );
}
