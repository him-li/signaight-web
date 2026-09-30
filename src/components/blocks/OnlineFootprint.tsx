import BlockLayout from "@/components/atoms/BlockLayout";
import OnlineFootprint from "@/components/atoms/CommonFields/person/OnlineFootprint/index";
import { Icons } from "@/components/atoms/Icons";
import type { Person } from "@/types/person/index.interface";
import type { WebSearches } from "@/types/search.interface";
type OnlineFootprintProps = {
  person?: Person;
  webSearches?: WebSearches[];
};

export default function OnlineFootprintBlock({
  person,
  webSearches,
}: OnlineFootprintProps) {
  return (
    <BlockLayout
      isExpandable
      title="Online Footprint"
      icon={<Icons.OnlineFootprint />}
    >
      <OnlineFootprint person={person} webSearches={webSearches} />
    </BlockLayout>
  );
}
