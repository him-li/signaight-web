import Education from "@/components/atoms/CommonFields/person/education";
import { Icons } from "@/components/atoms/Icons";
import BlockLayout from "@/components/atoms/BlockLayout";
import type { Education as EducationType } from "@/types/person/biographic_details/education.interface";
type EducationProps = {
  education?: EducationType;
};

export default function EducationBlock({ education }: EducationProps) {
  const facebookSchools = education?.facebook_schools;
  const linkedinSchools = education?.linkedin_schools;
  const xingSchools = education?.xing_schools;

  return (
    <BlockLayout
      isVisible={
        !!facebookSchools?.[0]?.fb_school_name ||
        !!linkedinSchools?.[0]?.school_name ||
        !!xingSchools?.[0]?.school_name
      }
      title="Education"
      icon={<Icons.Education />}
    >
      <Education education={education} />
    </BlockLayout>
  );
}
