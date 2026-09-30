"use client";
import { useCallback } from "react";
import { useAppSelector } from "@/store/store";
import { selectSubjectsState } from "@/store/subjectsSlice";
import MoralValues from "./MoralValues";
import Curiosity from "./Curiosity";

export default function EvaluationDetails() {
  const dashPage = useAppSelector(selectSubjectsState).evaluationDashPage;

  const evaluationDetail = useCallback(() => {
    switch (dashPage) {
      case "RESILIENCE":
        return null;
      case "FLEXIBILITY":
        return null;
      case "CURIOSITY":
        return <Curiosity />;
      case "DECISION MAKING":
        return null;
      case "COURAGE":
        return null;
      case "TEAMWORK":
        return null;
      case "MORAL VALUES":
        return <MoralValues />;
      case "LANGUAGE SKILLS":
        return null;
      case "INTERPERSONAL SKILLS":
        return null;
      case "WORK UNDER PRESSURE":
        return null;
      case "WISDOM & COMMON SENSE":
        return null;
      case "LONG STAY IN ISRAEL":
        return null;
      case "STRONG AFFINITY WITH ISRAEL":
        return null;
      case "OCCUPATIONAL INSTABILITY":
        return null;
      default:
        return null;
    }
  }, [dashPage]);

  return <>{evaluationDetail()}</>;
}
