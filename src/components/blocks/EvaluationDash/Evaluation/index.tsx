"use client";
import { useAppSelector } from "@/store/store";
import type { Evaluation as EvaluationType } from "@/types/evaluation.interface";
import EvaluationDetails from "./EvaluationDetails";
import { selectCurrentSubjectEvaluation } from "@/store/subjectsSlice/subjects.selectors";
import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";

type EvaluationProps = {
  pageField: string;
};

export default function Evaluation({ pageField }: EvaluationProps) {
  const notesArray =
    useAppSelector(selectCurrentSubjectEvaluation)?.[
      pageField as keyof EvaluationType
    ]?.factors ?? [];

  return (
    <BlockLayout
      icon={
        notesArray?.length > 0 && pageField.includes("language_skills") ? (
          <Icons.Language />
        ) : (
          <Icons.File />
        )
      }
      title={
        notesArray?.length > 0 && pageField.includes("language_skills")
          ? "Language proficiency"
          : "Notes"
      }
    >
      {notesArray?.map((note) => (
        <p className="whitespace-pre-line">{note.title}</p>
      ))}
      <EvaluationDetails />
    </BlockLayout>
  );
}
