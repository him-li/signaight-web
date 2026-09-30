import { withJsonFormsControlProps } from "@jsonforms/react";
import { ControlProps } from "@jsonforms/core";
import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import HonorsAwards from "../../EvaluationDash/PersonalData/HonorsAwards";

function HonorsAwardsRendererWrapper(props: ControlProps) {
  return (
    <SettingsWrapper {...props}>
      <HonorsAwards />
    </SettingsWrapper>
  );
}

export default withJsonFormsControlProps(HonorsAwardsRendererWrapper);
