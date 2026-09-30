"use client";
import { useLayoutEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectAnalysis } from "@/store/subjectsSlice/subjects.selectors";
import CompatibilityTreemap from "./campatibility";
import SearchingStatus from "./searchingStatus";
import ScoreRange from "./scoreRange";
import { SEARCH_QURIES } from "@/constants/search";

export default function LeaderboardDash() {
  const subjectAnalysis = useAppSelector(selectCurrentSubjectAnalysis);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);
  const [chartHeight, setChartHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.clientWidth);
        setChartHeight(chartRef.current.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  });

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-2xl h-[20vh] bg-default hover:bg-default-hover ease-in-out duration-300 overflow-hidden">
        <SearchingStatus data={subjectAnalysis.searchingStatus} />
      </div>

      <div className="rounded-2xl h-[20vh] bg-default hover:bg-default-hover ease-in-out duration-300 overflow-hidden">
        <CompatibilityTreemap
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          rawData={subjectAnalysis.compatibilities}
        />
      </div>

      <div className="rounded-2xl h-[20vh] bg-default hover:bg-default-hover ease-in-out duration-300 overflow-hidden">
        <ScoreRange
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          rawData={subjectAnalysis.scoreRange}
          scoreGteKey={SEARCH_QURIES.SCRORE_GTE}
          scoreLteKey={SEARCH_QURIES.SCRORE_LTE}
          scoreTitle="Score Range"
          personsCountTitle="Count of Applicants"
        />
      </div>
    </div>
  );
}
