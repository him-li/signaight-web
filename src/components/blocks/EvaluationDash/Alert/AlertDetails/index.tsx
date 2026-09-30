"use client";
import { useCallback } from "react";
import { useAppSelector } from "@/store/store";
import { selectSubjectsState } from "@/store/subjectsSlice";
import CriminalRecords from "./CriminalRecords";

export default function EvaluationDetails() {
  const dashPage = useAppSelector(selectSubjectsState).evaluationDashPage;

  const evaluationDetail = useCallback(() => {
    switch (dashPage) {
      case "STRONG AFFINITY WITH ISRAEL":
        return null;
      case "STRONG AFFINITY WITH USA":
        return null;
      case "OCCUPATIONAL INSTABILITY":
        return null;
      case "INELIGIBLE OCCUPATION":
        return null;
      case "ANTI ISRAEL STATEMENTS":
        return null;
      case "ANTI USA STATEMENTS":
        return null;
      case "CRIMINAL RECORDS":
        return <CriminalRecords />;
      default:
        return null;
    }
  }, [dashPage]);

  return <>{evaluationDetail()}</>;
}
