import { Chip } from "@heroui/react";
import Display from "@/components/atoms/Display";
import { Icons } from "@/components/atoms/Icons";

export default function LastUpdate({
  lastupdate,
}: {
  lastupdate?: Date | string;
}) {
  return (
    <Display when={!!lastupdate} fallback={<></>}>
      <Chip variant="tertiary" className="overflow-x-auto">
        <Icons.Update />
        {new Date(lastupdate!).toLocaleString("en-GB", {
          timeZone: "Asia/Jerusalem",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Chip>
    </Display>
  );
}
