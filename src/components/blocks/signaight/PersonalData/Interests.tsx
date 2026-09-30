import BlockLayout from "@/components/atoms/BlockLayout";
import InterestsAndGroups from "@/components/atoms/CommonFields/person/interests";
import { Icons } from "@/components/atoms/Icons";
import type { Interests } from "@/types/person/interests.interface";
type InterestsProps = { interests?: Interests };

export default function Interests({ interests }: InterestsProps) {
  const hasPages = (interests?.pages?.length ?? 0) > 0;
  const hasTelegramGroups =
    (interests?.groups?.telegram_groups?.length ?? 0) > 0;
  return (
    <BlockLayout
      isVisible={!!interests && (hasPages || hasTelegramGroups)}
      title="Groups & Interests"
      icon={<Icons.Heart />}
    >
      <InterestsAndGroups interests={interests} />
    </BlockLayout>
  );
}
