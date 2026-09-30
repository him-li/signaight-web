"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { selectAuthState } from "@/store/authSlice/auth.slice";
import {
  selectCurrentProjectId,
  selectProjectsState,
} from "@/store/projectsSlice";
import { personEvaluationConstants, personAlertsConstants } from "@/constants";
import Capitalize from "@/utils/capitalize";
import EvaluationItems from "@/components/blocks/EvaluationItem";
import { ROUTES } from "@/constants/routes";

export default function CampaignSettingsSidebar() {
  const router = useRouter();
  const isAuth = useAppSelector(selectAuthState).isAuth;
  const projectId = useAppSelector(selectCurrentProjectId);
  const projectData = useAppSelector(selectProjectsState).selectedProject;
  const [weights, setWeights] = useState({});

  const handlePageChange = useCallback(
    (page: string) => {
      router.replace(`${ROUTES.SCREENING}/${projectId}/settings#${page}`);
    },
    [projectId, router],
  );

  useEffect(() => {
    if (projectData && projectData.person_ruleset) {
      const signaightScores = projectData?.person_ruleset.find(
        (rule) => rule.label === "Calculate person signaight_score",
      );
      const evaluationWeights = signaightScores?.actions.find(
        (action) => action.name === "set_person_score",
      )?.params?.evaluation_weights;
      const alertWeights = signaightScores?.actions.find(
        (action) => action.name === "set_person_score",
      )?.params?.alerts_weights;
      const mergedWeights = { ...evaluationWeights, ...alertWeights };
      setWeights(mergedWeights);
    }
  }, [projectData?.person_ruleset, projectData]);

  const getWeight = useCallback(
    (page: string) => {
      return weights[page as keyof typeof weights] as number;
    },
    [weights],
  );

  return (
    <div className="flex flex-col h-fit min-h-max w-full sticky top-14 p-0">
      <h1 className="font-semibold p-4 h-16 cursor-pointer">
        Campaign Settings
      </h1>
      <Accordion
        defaultExpandedKeys={["1", "2"]}
        allowsMultipleExpanded
        className="px-0"
      >
        <Accordion.Item id="1" key="1">
          <Accordion.Heading>
            <Accordion.Trigger className="px-4 w-full h-16 font-semibold text-sm">
              EVALUATION
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="p-0">
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.resilience)}
                onPress={() => handlePageChange("resilience")}
                score={`${getWeight("resilience")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.flexibility)}
                onPress={() => handlePageChange("flexibility")}
                score={`${getWeight("flexibility")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.curiosity)}
                tooltip="Deside to Learn, Openness to Criticism"
                onPress={() => handlePageChange("curiosity")}
                score={`${getWeight("curiosity")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.decision_making)}
                tooltip="In complex and ambiguous situations"
                onPress={() => handlePageChange("decision_making")}
                score={`${getWeight("decision_making")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.courage)}
                onPress={() => handlePageChange("courage")}
                score={`${getWeight("courage")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.teamwork)}
                tooltip="Ability to work individually and in a team"
                onPress={() => handlePageChange("teamwork")}
                score={`${getWeight("teamwork")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.moral_values)}
                onPress={() => handlePageChange("moral_values")}
                score={`${getWeight("moral_values")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.language_skills)}
                onPress={() => handlePageChange("language_skills")}
                score={`${getWeight("language_skills")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personEvaluationConstants.interpersonal_skills,
                )}
                onPress={() => handlePageChange("interpersonal_skills")}
                score={`${getWeight("interpersonal_skills")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personEvaluationConstants.work_under_pressure,
                )}
                onPress={() => handlePageChange("work_under_pressure")}
                score={`${getWeight("work_under_pressure")}/10`}
                disableSkeleton={isAuth}
              />
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id="2" key="2">
          <Accordion.Heading>
            <Accordion.Trigger className="px-4 w-full h-16 font-semibold text-sm">
              ALERT
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="p-0">
              <EvaluationItems
                label={Capitalize(
                  personAlertsConstants.strong_affinity_with_israel,
                )}
                onPress={() => handlePageChange("strong_affinity_with_israel")}
                score={`${getWeight("strong_affinity_with_israel")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personAlertsConstants.strong_affinity_with_usa,
                )}
                onPress={() => handlePageChange("strong_affinity_with_usa")}
                score={`${getWeight("strong_affinity_with_usa")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personAlertsConstants.occupational_instability,
                )}
                onPress={() => handlePageChange("occupational_instability")}
                score={`${getWeight("occupational_instability")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.ineligible_occupation)}
                onPress={() => handlePageChange("ineligible_occupation")}
                score={`${getWeight("ineligible_occupation")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.anti_israel_statements)}
                onPress={() => handlePageChange("anti_israel_statements")}
                score={`${getWeight("anti_israel_statements")}/10`}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.anti_usa_statements)}
                onPress={() => handlePageChange("anti_usa_statements")}
                score={`${getWeight("anti_usa_statements")}/10`}
                disableSkeleton={isAuth}
              />
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
