import { withJsonFormsControlProps } from "@jsonforms/react";
import { ControlProps } from "@jsonforms/core";
import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import Education from "@/components/blocks/Education";

function EducationRendererWrapper(props: ControlProps) {
  return (
    <SettingsWrapper {...props}>
      <Education />
    </SettingsWrapper>
  );
}

export default withJsonFormsControlProps(EducationRendererWrapper);
