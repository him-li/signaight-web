"use client";
import {
  Heuristic as AlertNoteType,
  Alerts as AlertsType,
} from "@/types/alerts.interface";
import { useAppSelector } from "@/store/store";
import AlertDetails from "./AlertDetails";
import AlertNote from "./AlertNote";
import { selectCurrentSubjectAlerts } from "@/store/subjectsSlice/subjects.selectors";

type AlertProps = {
  pageField: string;
};

export default function Alert({ pageField }: AlertProps) {
  const notesArray =
    useAppSelector(selectCurrentSubjectAlerts)?.[pageField as keyof AlertsType]
      ?.heuristics ?? [];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10 w-full h-full px-16">
      {notesArray?.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="mb-4 text-medium">Notes</h2>
          {notesArray?.map((note: AlertNoteType) => {
            return (
              <AlertNote
                alertText={note.description}
                alertSubtitle={note.title}
                key={note.title}
              />
            );
          })}
        </div>
      )}
      <AlertDetails />
    </div>
  );
}
