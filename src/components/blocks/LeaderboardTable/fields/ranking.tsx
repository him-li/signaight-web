"use client";
import { memo } from "react";
import { useAppSelector } from "@/store/store";
import { selectCurrentProjectRanking } from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";

function Ranking({ personId }: { personId: string }) {
  const ranking = useAppSelector(selectCurrentProjectRanking);
  const rankPosition = ranking?.findIndex((p: Person) => p.id === personId) + 1;

  return (
    <span aria-label={rankPosition + ""} className="font-semibold">
      {rankPosition}
    </span>
  );
}

const RankingMemo = memo(Ranking);

export default RankingMemo;
