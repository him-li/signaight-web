import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";
import type { Work } from "@/types/person/biographic_details/work/index.interface";
import Employment from "@/components/atoms/CommonFields/person/employment";
export default function WorkExperience({ work }: { work?: Work }) {
  return (
    <BlockLayout
      isVisible={
        (!!work?.linkedin_work?.positions &&
          work?.linkedin_work?.positions?.length > 0) ||
        (!!work?.facebook_work && work?.facebook_work?.length > 0) ||
        (!!work?.xing_work?.positions && work?.xing_work?.positions?.length > 0)
      }
      title="Work Experience"
      icon={<Icons.Work />}
    >
      <Employment employment={work} />
    </BlockLayout>
  );
}
