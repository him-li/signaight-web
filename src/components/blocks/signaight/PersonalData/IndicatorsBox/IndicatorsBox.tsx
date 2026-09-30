import { useAppSelector } from "@/store/store";
import IndicatorsTable from "./IndicatorsTable";
import IndicatorsCards from "./IndicatorsCards";
import { Icons } from "@/components/atoms/Icons";
import BlockLayout from "@/components/atoms/BlockLayout";
import Display from "@/components/atoms/Display";
import ViewSwitch from "@/components/atoms/ViewSwitch";
import {
  selectCurrentSubjectRedFlags,
  selectDisplayMode,
} from "@/store/subjectsSlice/subjects.selectors";
import type { SubCategory } from "@/types/person/red_flag/index.interface";

export default function IndicatorsBox() {
  const redFlags = useAppSelector(selectCurrentSubjectRedFlags);
  const isCardView = useAppSelector(selectDisplayMode);
  const subCategories: SubCategory[] =
    redFlags?.flatMap((rf) =>
      (rf.sub_categories ?? []).map((sc) => ({ ...sc, category: rf.category })),
    ) ?? [];

  return (
    <BlockLayout
      isVisible={Array.isArray(redFlags) && redFlags.length > 0}
      isExpandable={true}
      title="Indication Box"
      icon={<Icons.IndicationBox />}
      subtitle={<ViewSwitch />}
    >
      <Display
        when={isCardView}
        fallback={<IndicatorsTable redFlags={subCategories!} />}
      >
        <IndicatorsCards redFlags={subCategories!} />
      </Display>
    </BlockLayout>
  );
}
