"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/store/store";
import GeoTrace from "@/components/blocks/signaight/PersonalData/GeoTrace/GeoTrace";
import Education from "@/components/blocks/Education";
import EmploymentBlock from "@/components/blocks/signaight/PersonalData/Employment";
import Interests from "@/components/blocks/signaight/PersonalData/Interests";
import OnlineFootprint from "@/components/blocks/OnlineFootprint";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import LinkAnalysis from "../PersonalData/LinkAnalysis/LinkAnalysis";
import IndicatorsBox from "../PersonalData/IndicatorsBox/IndicatorsBox";
import ProjectLinkAnalysisProvider from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { selectCurrentProjectId } from "@/store/projectsSlice";
// const LinkAnalysisProvider = dynamic(
//   () => import("@/contexts/linkAnalisysContext/LinkAnalysisContext"),
//   {
//     loading: () => null,
//     ssr: false,
//   },
// );
const GeoTraceProvider = dynamic(
  () => import("@/contexts/geoTraceContext/GeoTraceContext"),
  {
    loading: () => null,
    ssr: false,
  },
);
const RedFlags = dynamic(
  () => import("@/components/blocks/signaight/PersonalData/RedFlags"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function SubjectBlocks() {
  const person = useAppSelector(selectCurrentSubjectData);
  const projectId = useAppSelector(selectCurrentProjectId)!;

  return (
    <div className="flex-1 columns-1 md:columns-2 ps-10 py-10 space-y-8 sm:w-2/3 md:w-3/4 backdrop-blur-lg">
      <RedFlags />
      <IndicatorsBox />
      <GeoTraceProvider>
        <GeoTrace />
      </GeoTraceProvider>
      <ProjectLinkAnalysisProvider projectId={projectId}>
        <LinkAnalysis />
      </ProjectLinkAnalysisProvider>
      <EmploymentBlock employment={person?.biographic_details?.work} />
      <OnlineFootprint person={person!} />
      <Education education={person?.biographic_details?.education} />
      <Interests interests={person?.interests} />
    </div>
  );
}
