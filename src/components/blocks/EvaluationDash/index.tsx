"use client";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { Button, Chip } from "@heroui/react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { changeEvaluationDashPage } from "@/store/subjectsSlice";
import { Icons } from "@/components/atoms/Icons";
import {
  selectCurrentSubjectAlerts,
  selectCurrentSubjectEvaluation,
  selectEvaluationDashPage,
} from "@/store/subjectsSlice/subjects.selectors";
import {
  personalDataConstants,
  personEvaluationConstants,
  personAlertsConstants,
} from "@/constants";
import EnrichmentCenter from "@/components/blocks/EnrichmentCenter/EnrichmentCenter";

const Alert = dynamic(() => import("./Alert"), {
  loading: () => null,
  ssr: false,
});
const PersonalData = dynamic(() => import("./PersonalData"), {
  loading: () => null,
  ssr: false,
});
const Evaluation = dynamic(() => import("./Evaluation"), {
  loading: () => null,
  ssr: false,
});

const formatToOneDecimal = (num?: number) => {
  if (!num) return "--";
  return (Math.ceil(num * 10) / 10).toFixed(1);
};

const layout =
  "flex-1 columns-1 md:columns-2 w-full px-16 space-y-8 backdrop-blur-lg";

export default function EvaluationDash() {
  const dispatch = useAppDispatch();
  const dashPage = useAppSelector(selectEvaluationDashPage);
  const personEvaluation = useAppSelector(selectCurrentSubjectEvaluation);
  const personAlerts = useAppSelector(selectCurrentSubjectAlerts);

  const dashMain = useCallback(() => {
    switch (dashPage) {
      case personalDataConstants.personal_data:
        return <PersonalData layoutStyle={layout} />;
      case personalDataConstants.enrichment_center:
        return <EnrichmentCenter layoutStyle={layout} />;
      case personEvaluationConstants.resilience:
        return <Evaluation pageField="resilience" />;
      case personEvaluationConstants.flexibility:
        return <Evaluation pageField="flexibility" />;
      case personEvaluationConstants.curiosity:
        return <Evaluation pageField="curiosity" />;
      case personEvaluationConstants.decision_making:
        return <Evaluation pageField="decision_making" />;
      case personEvaluationConstants.courage:
        return <Evaluation pageField="courage" />;
      case personEvaluationConstants.teamwork:
        return <Evaluation pageField="teamwork" />;
      case personEvaluationConstants.moral_values:
        return <Evaluation pageField="moral_values" />;
      case personEvaluationConstants.language_skills:
        return <Evaluation pageField="language_skills" />;
      case personEvaluationConstants.interpersonal_skills:
        return <Evaluation pageField="interpersonal_skills" />;
      case personEvaluationConstants.work_under_pressure:
        return <Evaluation pageField="work_under_pressure" />;
      case personEvaluationConstants.wisdom_common_sense:
        return <Evaluation pageField="wisdom_common_sense" />;
      case personAlertsConstants.strong_affinity_with_israel:
        return <Alert pageField="strong_affinity_with_israel" />;
      case personAlertsConstants.strong_affinity_with_usa:
        return <Alert pageField="strong_affinity_with_usa" />;
      case personAlertsConstants.occupational_instability:
        return <Alert pageField="occupational_instability" />;
      case personAlertsConstants.ineligible_occupation:
        return <Alert pageField="ineligible_occupation" />;
      case personAlertsConstants.anti_israel_statements:
        return <Alert pageField="anti_israel_statements" />;
      case personAlertsConstants.anti_usa_statements:
        return <Alert pageField="anti_usa_statements" />;
      case personAlertsConstants.criminal_records:
        return <Alert pageField="criminal_records" />;
      default:
        return <></>;
    }
  }, [dashPage]);

  const dashTitle = useCallback(() => {
    switch (dashPage) {
      case personEvaluationConstants.resilience:
        return formatToOneDecimal(personEvaluation?.resilience?.score);
      case personEvaluationConstants.flexibility:
        return formatToOneDecimal(personEvaluation?.flexibility?.score);
      case personEvaluationConstants.curiosity:
        return formatToOneDecimal(personEvaluation?.curiosity?.score);
      case personEvaluationConstants.decision_making:
        return formatToOneDecimal(personEvaluation?.decision_making?.score);
      case personEvaluationConstants.courage:
        return formatToOneDecimal(personEvaluation?.courage?.score);
      case personEvaluationConstants.teamwork:
        return formatToOneDecimal(personEvaluation?.teamwork?.score);
      case personEvaluationConstants.moral_values:
        return formatToOneDecimal(personEvaluation?.moral_values?.score);
      case personEvaluationConstants.language_skills:
        return formatToOneDecimal(personEvaluation?.language_skills?.score);
      case personEvaluationConstants.interpersonal_skills:
        return formatToOneDecimal(
          personEvaluation?.interpersonal_skills?.score,
        );
      case personAlertsConstants.strong_affinity_with_israel:
        return formatToOneDecimal(
          personAlerts?.strong_affinity_with_israel?.score,
        );
      case personAlertsConstants.strong_affinity_with_usa:
        return formatToOneDecimal(
          personAlerts?.strong_affinity_with_usa?.score,
        );
      case personAlertsConstants.occupational_instability:
        return formatToOneDecimal(
          personAlerts?.occupational_instability?.score,
        );
      case personAlertsConstants.ineligible_occupation:
        return formatToOneDecimal(personAlerts?.ineligible_occupation?.score);
      case personAlertsConstants.anti_israel_statements:
        return formatToOneDecimal(personAlerts?.anti_israel_statements?.score);
      case personAlertsConstants.anti_usa_statements:
        return formatToOneDecimal(personAlerts?.anti_usa_statements?.score);
      case personAlertsConstants.criminal_records:
        return formatToOneDecimal(personAlerts?.criminal_records?.score);
      default:
        return "--";
    }
  }, [dashPage, personAlerts, personEvaluation]);

  return (
    <>
      <div className="flex flex-col mb-6 w-full items-center-safe justify-center-safe">
        <Button
          variant="ghost"
          onPress={() => dispatch(changeEvaluationDashPage("PERSONAL DATA"))}
          className={
            dashPage === "PERSONAL DATA"
              ? "hidden"
              : "cursor-default self-start start-12 rounded-full"
          }
        >
          <Icons.ChevronLeft />
          Return to Personal Data
        </Button>
        <Chip
          variant="tertiary"
          size="lg"
          className={
            Object.values(personalDataConstants).includes(dashPage)
              ? "hidden"
              : "text-xl rounded-full self-center-safe"
          }
        >
          {dashPage}
          <Chip.Label className="bg-default-900 text-default-50 rounded-full w-8 h-8 flex items-center justify-center">
            {dashTitle()}
          </Chip.Label>
        </Chip>
      </div>
      {dashMain()}
    </>
  );
}
