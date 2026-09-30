"use client";
import { ReactNode, useMemo } from "react";
import dynamic from "next/dynamic";
import { usePersonState } from "@/contexts/personContext/PersonContext";
const TableProvider = dynamic(
  () => import("@/contexts/tableContext/TableContext"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

type Props = { children: ReactNode };

export default function PersonTableWrapper(props: Props) {
  const { persons, pagination } = usePersonState();
  const justPersons = useMemo(
    () => persons.filter((person) => person !== undefined),
    [persons],
  );
  return (
    <TableProvider data={justPersons} pagination={pagination}>
      {props.children}
    </TableProvider>
  );
}
