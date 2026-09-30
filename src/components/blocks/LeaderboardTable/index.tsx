"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getRankingInfo } from "@/store/subjectsSlice";
import { selectDisplayMode } from "@/store/subjectsSlice/subjects.selectors";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import { usePersonState } from "@/contexts/personContext/PersonContext";
const TableProvider = dynamic(
  () => import("@/contexts/tableContext/TableContext"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const LeaderboardTable = dynamic(() => import("./table"), {
  loading: () => <div />,
  ssr: false,
});
const LeaderboardCards = dynamic(() => import("./card"), {
  loading: () => <div />,
  ssr: false,
});
export default function Leaderboard() {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const isCardView = useAppSelector(selectDisplayMode);
  const { persons, pagination } = usePersonState();

  useEffect(() => {
    if (selectedProject) {
      dispatch(getRankingInfo());
    }
  }, [dispatch, selectedProject]);

  return (
    <div className="w-full">
      <TableProvider data={persons} pagination={pagination}>
        {isCardView ? (
          <LeaderboardCards persons={persons} />
        ) : (
          <LeaderboardTable />
        )}
      </TableProvider>
    </div>
  );
}
