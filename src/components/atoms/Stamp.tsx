import { Chip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import Display from "@/components/atoms/Display";

type StampProps = {
  content: string;
};

export default function Stamp({ content }: StampProps) {
  return (
    <Display when={content !== ""} fallback={<></>}>
      <Chip className="text-medium font-semibold uppercase text-pretty stamp -rotate-12 border-large border-solid border-red-600 text-red-600 rounded-lg mix-blend-multiply px-4 py-8 bg-transparent z-10">
        <Icons.Flag className="text-red-600" />
        {content}
      </Chip>
    </Display>
  );
}
