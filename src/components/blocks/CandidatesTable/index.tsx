"use client";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  changeEvaluationDashPage,
  getRankingInfo,
} from "@/store/subjectsSlice";
import { selectDisplayMode } from "@/store/subjectsSlice/subjects.selectors";
import Display from "@/components/atoms/Display";
import { usePersonState } from "@/contexts/personContext/PersonContext";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";

const TableProvider = dynamic(
  () => import("@/contexts/tableContext/TableContext"),
  {
    loading: () => null,
  },
);

const ApplicantsCards = dynamic(() => import("./card"), {
  loading: () => <div />,
});
const ApplicantsTable = dynamic(() => import("./table"), {
  loading: () => <div />,
  ssr: false,
});

export default function CandidatesTable() {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const isCardView = useAppSelector(selectDisplayMode);
  const { persons, pagination } = usePersonState();

  useEffect(() => {
    if (selectedProject) {
      dispatch(getRankingInfo());
      dispatch(changeEvaluationDashPage("PERSONAL DATA"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  const justPersons = useMemo(
    () => persons?.filter((person) => person),
    [persons],
  );

  return (
    <div className="w-full">
      <TableProvider data={justPersons} pagination={pagination}>
        <Display when={isCardView} fallback={<ApplicantsTable />}>
          <ApplicantsCards persons={justPersons} />
        </Display>
      </TableProvider>
    </div>
  );
}
