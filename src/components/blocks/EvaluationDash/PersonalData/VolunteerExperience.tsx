import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";
import type { VolunteeringExperience } from "@/types/person/biographic_details/volunteer_experience.interface";

export default function VolunteerExperience({
  volunteerExperience,
}: {
  volunteerExperience?: VolunteeringExperience[];
}) {
  return (
    <BlockLayout
      isVisible={volunteerExperience}
      title="Volunteer Experience"
      icon={<Icons.Volunteer />}
    >
      {volunteerExperience?.map((experience, index) => {
        return (
          <div className="align-top" key={index}>
            <p className="font-semibold">{experience.role}</p>
            <p>{experience.company_name}</p>
            <p>
              {experience.duration.years ?? 0} years{" "}
              {experience.duration.months ?? 0} months
            </p>
          </div>
        );
      })}
    </BlockLayout>
  );
}
