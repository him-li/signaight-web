import FlagsServices from "@/services/flagsService";
import Analyzer from "./Analyzer";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/auth";
import RiskmatrixWidgetsProvider from "@/contexts/riskmatrixWidgetsContext/RiskmatrixWidgetsContext";
import { RiskDetection } from "./RiskDetection";
import MediaCarousel from "./MediaCarousel";
import FlightInfo from "./FlightInfo";
import PersonsService from "@/services/personsService";
import type { FlagPersonInfo } from "@/types/responses/flagsStatisticResponse";
export interface FlagEntry extends FlagPersonInfo {
  flag: string;
}

export default async function RiskmatrixWidgets({
  projectId,
}: {
  projectId: string;
}) {
  if (!projectId) {
    return <></>;
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  const data = await Promise.all([
    PersonsService.getRiskmatrixAnalysis(projectId, token?.value!),
    FlagsServices.getFlagsStatisticByProject(projectId, token?.value!),
  ]);

  return (
    <RiskmatrixWidgetsProvider personsFlags={data[1]}>
      <FlightInfo />
      <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        <Analyzer />
        <RiskDetection />
        <MediaCarousel />
      </div>
    </RiskmatrixWidgetsProvider>
  );
}
