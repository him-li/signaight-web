import Snippet from "@/components/atoms/Snippet";
import Link from "next/link";
import Display from "@/components/atoms/Display";
import NotFound from "@/components/atoms/Icons/NotFound";
import { hasValidHttpUrl } from "@/utils/hasData";
import type { Person } from "@/types/person/index.interface";

export default function Leaks({ person }: { person?: Person | null }) {
  const leaks = person?.network_signature?.misc?.leaks;
  return (
    <Display
      when={leaks && leaks?.length > 0}
      fallback={
        <NotFound size={100} text="No Darknet or Breached Data Detected" />
      }
    >
      {leaks?.map((leak, i) => (
        <Snippet
          key={(leak?.title ?? "") + i}
          symbol=""
          radius="lg"
          // className={{
          //   pre: "flex items-center gap-1  text-foreground text-xs",
          //   base: leak?.title ? "bg-transparent gap-0 p-0" : "hidden",
          //   copyButton: leak?.title !== "" ? "" : "hidden",
          //   content: "max-w-25 text-ellipsis",
          // }}
        >
          {hasValidHttpUrl(leak?.url) ? (
            <Link href={leak?.url ?? ""} target="blank">
              {leak?.title}
            </Link>
          ) : (
            leak?.title
          )}
        </Snippet>
      ))}
    </Display>
  );
}
