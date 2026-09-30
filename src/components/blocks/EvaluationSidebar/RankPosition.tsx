import { useMemo } from "react";
import { Tooltip } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { selectCurrentProjectRanking } from "@/store/subjectsSlice";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";

export default function RankPosition() {
  const ranking = useAppSelector(selectCurrentProjectRanking);
  const personData = useAppSelector(selectCurrentSubjectData);

  const rankPosition = useMemo(
    () => ranking?.findIndex((subject) => subject.id === personData?.id) + 1,
    [personData?.id, ranking],
  );
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default">
          <span
            aria-label={rankPosition?.toString()}
            className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-center text-inherit"
            role="img"
          >
            {isNaN(rankPosition!)
              ? "--"
              : rankPosition === 1
                ? `${rankPosition}st`
                : rankPosition === 2
                  ? `${rankPosition}nd`
                  : rankPosition === 3
                    ? `${rankPosition}rd`
                    : rankPosition === 0
                      ? `--`
                      : `${rankPosition}th`}
          </span>
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content>Ranking</Tooltip.Content>
    </Tooltip>
  );
}
