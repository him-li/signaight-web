import { withJsonFormsControlProps } from "@jsonforms/react";
import { ControlProps } from "@jsonforms/core";
import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import VolunteerExperience from "../../EvaluationDash/PersonalData/VolunteerExperience";

function VolunteerExperienceRendererWrapper(props: ControlProps) {
  return (
    <SettingsWrapper {...props}>
      <VolunteerExperience />
    </SettingsWrapper>
  );
}

export default withJsonFormsControlProps(VolunteerExperienceRendererWrapper);
