import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";
import Employment from "@/components/atoms/CommonFields/person/employment";
import type { Work } from "@/types/person/biographic_details/work/index.interface";
type EmploymentProps = { employment?: Work };

export default function EmploymentBlock({ employment }: EmploymentProps) {
  return (
    <BlockLayout
      isVisible={!employment}
      title="Employment"
      icon={<Icons.Work />}
    >
      <Employment employment={employment} />
    </BlockLayout>
  );
}
