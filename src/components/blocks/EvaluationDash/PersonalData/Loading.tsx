import { ProgressBar } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { selectLoadingSubjectData } from "@/store/subjectsSlice/subjects.selectors";

export default function Loading() {
  const loading = useAppSelector(selectLoadingSubjectData);
  return (
    <div className="h-1 w-full px-14">
      {loading ? (
        <ProgressBar
          isIndeterminate
          aria-label="Loading..."
          className="w-full"
          size="sm"
        >
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      ) : null}
    </div>
  );
}
