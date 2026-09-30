import { Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";

type AlertNoteProps = {
  alertSubtitle: string;
  alertText: string;
};

export default function AlertNote({
  alertSubtitle,
  alertText,
}: AlertNoteProps) {
  return (
    <div className="flex rounded-2xl justify-between items-center p-8 text-xs bg-default-100">
      <div>
        <p className="font-semibold">{alertSubtitle}</p>
        <p className="whitespace-pre-line">{alertText}</p>
      </div>
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        className="cursor-default rounded-full"
      >
        <Icons.ChevronRight />
      </Button>
    </div>
  );
}
