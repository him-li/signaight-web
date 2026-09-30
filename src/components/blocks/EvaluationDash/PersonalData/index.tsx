"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/store/store";
import EducationBlock from "@/components/blocks/Education";
import HonorsAwards from "./HonorsAwards";
import OnlineFootprintBlock from "@/components/blocks/OnlineFootprint";
import VolunteerExperience from "./VolunteerExperience";
import WorkExperience from "./WorkExperience";
import {
  selectCurrentSubjectData,
  selectWebSearch,
} from "@/store/subjectsSlice/subjects.selectors";
const PersonalDetails = dynamic(() => import("./PersonalDetails"), {
  loading: () => null,
  ssr: false,
});
const Loading = dynamic(() => import("./Loading"), {
  loading: () => null,
  ssr: false,
});

export default function PersonalData({ layoutStyle }: { layoutStyle: string }) {
  const person = useAppSelector(selectCurrentSubjectData);
  const webSearches = useAppSelector(selectWebSearch);

  return (
    <>
      <Loading />
      <div className={layoutStyle}>
        <PersonalDetails />
        <WorkExperience work={person?.biographic_details?.work} />
        <VolunteerExperience
          volunteerExperience={
            person?.biographic_details?.work?.linkedin_work
              ?.volunteering_experiences
          }
        />
        <EducationBlock education={person?.biographic_details?.education} />
        <OnlineFootprintBlock person={person!} webSearches={webSearches} />
        <HonorsAwards
          honors={person?.biographic_details?.work?.linkedin_work?.honors}
        />
      </div>
    </>
  );
}
