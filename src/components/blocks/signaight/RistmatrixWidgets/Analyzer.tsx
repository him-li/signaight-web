"use client";
import { useEffect, useState } from "react";
import { selectSubjectsState } from "@/store/subjectsSlice";
import { selectProjectsState } from "@/store/projectsSlice";
import { useAppSelector } from "@/store/store";

export default function Analyzer() {
  const countRisks = useAppSelector(selectSubjectsState).totalRisks ?? 0;
  const analyzedSubjects =
    useAppSelector(selectSubjectsState).totalAnalyzed ?? 0;
  const projectSubjectsLength =
    useAppSelector(selectSubjectsState).totalPersons ?? 0;
  const redFlagsCount = useAppSelector(selectSubjectsState).totalRedFlags ?? 0;

  const createdAt =
    useAppSelector(selectProjectsState).selectedProject?.created_at;

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (createdAt) {
      const time = new Date(createdAt).getTime();
      const endTime =
        time + 1000 * 60 * 60 - new Date().getTimezoneOffset() * 60 * 1000;
      setEndTime(endTime);
    }
  }, [createdAt]);

  useEffect(() => {
    if (createdAt) {
      const interval = setInterval(() => {
        if (endTime - Date.now() <= 0) {
          setTimeRemaining(0);
          return;
        }
        setTimeRemaining(endTime - Date.now());
      }, 1000);
      return () => {
        clearInterval(interval);
        setTimeRemaining(0);
      };
    }
  }, [createdAt, endTime]);

  function formatTime(time: number) {
    const date = new Date(time);
    return `${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  function pad(num: number) {
    return num.toString().padStart(2, "0");
  }

  return (
    <div className="grid grid-cols-2 gap-0.5 rounded-3xl h-[20vh] shadow-md bg-default backdrop-blur-xl overflow-hidden">
      <div
        className={`flex flex-col justify-evenly ps-3 ease-in-out duration-300 ${timeRemaining === 0 ? "bg-accent hover:bg-accent-hover" : ""}`}
      >
        <strong>Time to Resolve</strong>
        <strong className="text-3xl">
          {createdAt ? formatTime(timeRemaining) : formatTime(0)}
        </strong>
      </div>
      <div
        className={`flex flex-col justify-evenly ps-3 ease-in-out duration-300 ${analyzedSubjects !== projectSubjectsLength ? "bg-warning hover:bg-warning-hover" : "bg-accent hover:bg-accent-hover"}`}
      >
        <strong>Analyzed</strong>
        <strong className="text-3xl">
          {analyzedSubjects + " / " + projectSubjectsLength}
        </strong>
      </div>
      <div
        className={`flex flex-col justify-evenly ps-3 ease-in-out duration-300 ${countRisks > 0 ? "bg-danger hover:bg-danger-hover" : "hidden"}`}
      >
        <strong>Risks Detected</strong>
        <strong className="text-3xl">{countRisks}</strong>
      </div>
      <div
        className={`flex flex-col justify-evenly ps-3 ease-in-out duration-300 ${redFlagsCount > 0 ? "bg-danger hover:bg-danger-hover" : "hidden"}`}
      >
        <strong>Red Flags</strong>
        <strong className="text-3xl">{redFlagsCount}</strong>
      </div>
    </div>
  );
}
