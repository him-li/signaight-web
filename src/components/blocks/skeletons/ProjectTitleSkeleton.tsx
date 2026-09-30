import { Skeleton } from "@heroui/react";

export default function ProjectTitleSkeleton() {
  return (
    <div className="max-w-75 w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
    </div>
  );
}
