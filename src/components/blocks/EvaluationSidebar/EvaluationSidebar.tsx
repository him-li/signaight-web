"use client";
import dynamic from "next/dynamic";
import { Accordion, Button, Tooltip } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { changeEvaluationDashPage } from "@/store/subjectsSlice";
import {
  personalDataConstants,
  personEvaluationConstants,
  personAlertsConstants,
} from "@/constants";
import EvaluationItems from "@/components/blocks/EvaluationItem";
import Capitalize from "@/utils/capitalize";
import {
  selectCurrentSubjectAlerts,
  selectCurrentSubjectData,
  selectCurrentSubjectEvaluation,
  selectEvaluationDashPage,
} from "@/store/subjectsSlice/subjects.selectors";
import { Icons } from "@/components/atoms/Icons";
const CompatibilityMenu = dynamic(
  () => import("@/components/atoms/CompatibilityMenu"),
  {
    loading: () => null,
    ssr: false,
  },
);
const RankPosition = dynamic(() => import("./RankPosition"), {
  loading: () => null,
  ssr: false,
});
const SignAIghtScore = dynamic(() => import("./SignAIghtScore"), {
  loading: () => null,
  ssr: false,
});

const formatToOneDecimal = (num?: number) => {
  if (!num) return "--";
  return (Math.ceil(num * 10) / 10).toFixed(1);
};

export default function EvaluationSidebar() {
  const dispatch = useAppDispatch();
  const isAuth = true;
  const dashPage = useAppSelector(selectEvaluationDashPage);
  const personEvaluation = useAppSelector(selectCurrentSubjectEvaluation);
  const personAlerts = useAppSelector(selectCurrentSubjectAlerts);
  const subject = useAppSelector(selectCurrentSubjectData);

  return (
    <div className="flex flex-col h-fit min-h-max w-full sticky top-14 p-0">
      <div className="flex items-center-safe justify-between">
        <h1
          className="font-semibold p-4 h-16 cursor-pointer"
          onClick={() =>
            dispatch(
              changeEvaluationDashPage(personalDataConstants.personal_data),
            )
          }
        >
          Personal Data
        </h1>
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              variant="ghost"
              onPress={() =>
                dispatch(
                  changeEvaluationDashPage(
                    personalDataConstants.enrichment_center,
                  ),
                )
              }
            >
              <Icons.ChevronRight />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Enrichment Center</Tooltip.Content>
        </Tooltip>
      </div>
      <div className="flex items-center justify-evenly w-full">
        <RankPosition />
        <SignAIghtScore />
        <CompatibilityMenu subject={subject} isResponsive={false} />
      </div>
      <Accordion
        hideSeparator
        defaultExpandedKeys={["1", "2"]}
        allowsMultipleExpanded
        className="px-0"
      >
        <Accordion.Item id="1" key="1" aria-label="evaluation">
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
                score={formatToOneDecimal(personEvaluation?.resilience?.score)}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.resilience,
                    ),
                  )
                }
                isActive={dashPage === personEvaluationConstants.resilience}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.flexibility)}
                score={formatToOneDecimal(personEvaluation?.flexibility?.score)}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.flexibility,
                    ),
                  )
                }
                isActive={dashPage === personEvaluationConstants.flexibility}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.curiosity)}
                tooltip="Deside to Learn, Openness to Criticism"
                score={formatToOneDecimal(personEvaluation?.curiosity?.score)}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.curiosity,
                    ),
                  )
                }
                isActive={dashPage === personEvaluationConstants.curiosity}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.decision_making)}
                tooltip="In complex and ambiguous situations"
                score={formatToOneDecimal(
                  personEvaluation?.decision_making?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.decision_making,
                    ),
                  )
                }
                isActive={
                  dashPage === personEvaluationConstants.decision_making
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.courage)}
                score={formatToOneDecimal(personEvaluation?.courage?.score)}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(personEvaluationConstants.courage),
                  )
                }
                isActive={dashPage === personEvaluationConstants.courage}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.teamwork)}
                tooltip="Ability to work individually and in a team"
                score={formatToOneDecimal(personEvaluation?.teamwork?.score)}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.teamwork,
                    ),
                  )
                }
                isActive={dashPage === personEvaluationConstants.teamwork}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.moral_values)}
                score={formatToOneDecimal(
                  personEvaluation?.moral_values?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.moral_values,
                    ),
                  )
                }
                isActive={dashPage === personEvaluationConstants.moral_values}
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personEvaluationConstants.language_skills)}
                score={formatToOneDecimal(
                  personEvaluation?.language_skills?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.language_skills,
                    ),
                  )
                }
                isActive={
                  dashPage === personEvaluationConstants.language_skills
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personEvaluationConstants.interpersonal_skills,
                )}
                score={formatToOneDecimal(
                  personEvaluation?.interpersonal_skills?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.interpersonal_skills,
                    ),
                  )
                }
                isActive={
                  dashPage === personEvaluationConstants.interpersonal_skills
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personEvaluationConstants.work_under_pressure,
                )}
                score={formatToOneDecimal(
                  personEvaluation?.work_under_pressure?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personEvaluationConstants.work_under_pressure,
                    ),
                  )
                }
                isActive={
                  dashPage === personEvaluationConstants.work_under_pressure
                }
                disableSkeleton={isAuth}
              />
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id="2" key="2" aria-label="alerts">
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
                score={formatToOneDecimal(
                  personAlerts?.strong_affinity_with_israel?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.strong_affinity_with_israel,
                    ),
                  )
                }
                isActive={
                  dashPage === personAlertsConstants.strong_affinity_with_israel
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personAlertsConstants.strong_affinity_with_usa,
                )}
                score={formatToOneDecimal(
                  personAlerts?.strong_affinity_with_usa?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.strong_affinity_with_usa,
                    ),
                  )
                }
                isActive={
                  dashPage === personAlertsConstants.strong_affinity_with_usa
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(
                  personAlertsConstants.occupational_instability,
                )}
                score={formatToOneDecimal(
                  personAlerts?.occupational_instability?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.occupational_instability,
                    ),
                  )
                }
                isActive={
                  dashPage === personAlertsConstants.occupational_instability
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.ineligible_occupation)}
                score={formatToOneDecimal(
                  personAlerts?.ineligible_occupation?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.ineligible_occupation,
                    ),
                  )
                }
                isActive={
                  dashPage === personAlertsConstants.ineligible_occupation
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.anti_israel_statements)}
                score={formatToOneDecimal(
                  personAlerts?.anti_israel_statements?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.anti_israel_statements,
                    ),
                  )
                }
                isActive={
                  dashPage === personAlertsConstants.anti_israel_statements
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.anti_usa_statements)}
                score={formatToOneDecimal(
                  personAlerts?.anti_usa_statements?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.anti_usa_statements,
                    ),
                  )
                }
                isActive={
                  dashPage === personAlertsConstants.anti_usa_statements
                }
                disableSkeleton={isAuth}
              />
              <EvaluationItems
                label={Capitalize(personAlertsConstants.criminal_records)}
                score={formatToOneDecimal(
                  personAlerts?.criminal_records?.score,
                )}
                onPress={() =>
                  dispatch(
                    changeEvaluationDashPage(
                      personAlertsConstants.criminal_records,
                    ),
                  )
                }
                isActive={dashPage === personAlertsConstants.criminal_records}
                disableSkeleton={isAuth}
              />
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
