"use client";
import { useAppSelector } from "@/store/store";
import { selectSubjectsState } from "@/store/subjectsSlice";

export default function MoralValues() {
  const volunteeringData =
    useAppSelector(selectSubjectsState).currentSubjectData?.biographic_details
      ?.work?.linkedin_work?.volunteering_experiences;
  return (
    <div className={`${volunteeringData ? "block" : "hidden"}`}>
      <h2 className="mb-4 text-medium">Details</h2>
      <div className="flex flex-col rounded-2xl gap-4 p-8 bg-default-100 text-xs">
        {volunteeringData?.map((experience) => {
          return (
            <div
              className="flex flex-col align-top p-xs"
              key={experience.company_name}
            >
              <p className="font-semibold">{experience.role}</p>
              <p>{experience.company_name}</p>
              <p>
                {experience?.duration?.years ?? 0} years{" "}
                {experience?.duration?.months ?? 0} months
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
