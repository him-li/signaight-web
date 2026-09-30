"use client";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Button, toast } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectCurrentProjectId, updateProject } from "@/store/projectsSlice";
import { personAlertsConstants } from "@/constants";
import EvaluationWeights from "./evaluation";
import AlertsWeights from "./alertsWeights";
import DisqualifyingAlerts from "./disqualifyingAlerts";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { Project } from "@/types/project.interface";
import { BG_IMAGE_URL } from "@/constants/image";
import {
  selectIsRecalculatingStastus,
  selectSelectedProject,
} from "@/store/projectsSlice/projects.selectors";
import { button } from "styles/styles";
import { Icons } from "@/components/atoms/Icons";

export default function CampaignSettings() {
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectCurrentProjectId);
  const project = useAppSelector(selectSelectedProject);
  const isRecalculating = useAppSelector(selectIsRecalculatingStastus);
  const [evaluationValues, setEvaluationValues] = useState<{
    [key: string]: number;
  }>({});
  const [alertsValues, setAlertsValues] = useState<{ [key: string]: number }>(
    {},
  );
  const [disqualifyingAlerts, setDisqualifyingAlerts] = useState<
    Array<keyof typeof personAlertsConstants>
  >([]);
  const [disqualifyingThreshold, setDisqualifyingThreshold] =
    useState<number>(0);

  useEffect(() => {
    if (project && project.person_ruleset) {
      const [evaluationAction, compatibilityAction] = project.person_ruleset
        .flatMap((rule) => [
          rule.actions.find((action) => action.name === "set_person_score"),
          rule.actions.find(
            (action) => action.name === "set_person_compatibility",
          ),
        ])
        .filter(Boolean);

      if (evaluationAction) {
        setEvaluationValues(evaluationAction.params?.evaluation_weights);
        setAlertsValues(evaluationAction.params?.alerts_weights);
      }

      if (compatibilityAction) {
        setDisqualifyingAlerts(
          compatibilityAction.params?.disqualifying_alerts,
        );
        setDisqualifyingThreshold(
          compatibilityAction.params?.disqualifying_threshold,
        );
      }
    }
  }, [project]);

  const updateRuleset = useCallback(async () => {
    const updatedProject = {
      ...project,
      person_ruleset: project?.person_ruleset.map((ruleset) => {
        if (ruleset.label === "Calculate person signaight_score") {
          const updatedParams = { ...ruleset.actions[0].params };
          updatedParams.evaluation_weights = evaluationValues;
          updatedParams.alerts_weights = alertsValues;
          const newRuleset = { ...ruleset, actions: [...ruleset.actions] };
          newRuleset.actions[0] = {
            ...newRuleset.actions[0],
            params: updatedParams,
          };
          return newRuleset;
        }
        if (ruleset.label === "Calculate person compatibility") {
          const updatedParams = { ...ruleset.actions[0].params };
          updatedParams.disqualifying_alerts = disqualifyingAlerts;
          updatedParams.disqualifying_threshold = disqualifyingThreshold;
          const newRuleset = { ...ruleset, actions: [...ruleset.actions] };
          newRuleset.actions[0] = {
            ...newRuleset.actions[0],
            params: updatedParams,
          };
          return newRuleset;
        }
        return ruleset;
      }),
    };
    try {
      dispatch(
        updateProject({ id: projectId!, project: updatedProject as Project }),
      );
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }, [
    project,
    evaluationValues,
    alertsValues,
    disqualifyingAlerts,
    disqualifyingThreshold,
    dispatch,
    projectId,
  ]);

  useEffect(() => {
    if (isRecalculating) {
      toast.info("Recalculation in Progress...");
    }
    // return () => {
    if (!isRecalculating) {
      toast.success("Recalculation Finished, Scores Updated");
    }
    // };
  }, [isRecalculating]);

  return (
    <div className="flex flex-col px-16 py-4 gap-10 w-full">
      <section className="flex items-center justify-center w-full h-32 rounded-2xl p-6 gap-2 shadow-md relative ease-in-out overflow-hidden">
        <BlurredBackground alt="bg" src={BG_IMAGE_URL} />
        <h1 className="text-xl">Campaign Settings</h1>
        <Button
          variant="ghost"
          className={button.ghost_accent}
          onPress={() => updateRuleset()}
        >
          <Icons.Check />
          Apply Changes
        </Button>
      </section>

      <div className="flex-1 columns-1 md:columns-2 space-y-8 backdrop-blur-lg">
        <EvaluationWeights
          evaluationValues={evaluationValues}
          setEvaluationValues={setEvaluationValues}
        />

        <AlertsWeights
          alertsValues={alertsValues}
          setAlertsValues={setAlertsValues}
        />

        <DisqualifyingAlerts
          disqualifyingAlerts={disqualifyingAlerts}
          setDisqualifyingAlerts={setDisqualifyingAlerts}
          disqualifyingThreshold={disqualifyingThreshold}
          setDisqualifyingThreshold={setDisqualifyingThreshold}
        />
      </div>
    </div>
  );
}
