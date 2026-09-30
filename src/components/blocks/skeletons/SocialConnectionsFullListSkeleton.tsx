import { randomString } from "@/utils/randomString";
import { Skeleton } from "@heroui/react";

const ICONS_COUNT = 56;

const iconsArray = new Array(ICONS_COUNT).fill(randomString());

export default function SocialConnectionsFullListSkeleton() {
  return (
    <div className="flex gap-1 flex-wrap">
      {iconsArray.map((item, i) => (
        <Skeleton key={item + i} className="flex rounded-full w-8 h-8" />
      ))}
    </div>
  );
}
