"use client";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { Tooltip } from "@heroui/react";
import { scoreColors } from "@/constants/colors";

export default function SignAIghtScore() {
  const personData = useAppSelector(selectCurrentSubjectData);
  const score = personData?.signaight_score;
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <span
          className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default"
          style={{
            backgroundColor: scoreColors(score ?? 0),
          }}
        >
          <span
            aria-label={score?.toString()}
            className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-center text-inherit"
            role="img"
          >
            {score === 40 ? "--" : score?.toString()}
          </span>
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Real<strong className="text-teal-500">Eye</strong> Score
      </Tooltip.Content>
    </Tooltip>
  );
}
