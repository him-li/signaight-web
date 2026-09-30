import { withJsonFormsControlProps } from "@jsonforms/react";
import { ControlProps } from "@jsonforms/core";
import OnlineFootprint from "@/components/blocks/OnlineFootprint";
import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";

function OnlineFootprintWrapper(props: ControlProps) {
  return (
    <SettingsWrapper {...props}>
      <OnlineFootprint />
    </SettingsWrapper>
  );
}

export default withJsonFormsControlProps(OnlineFootprintWrapper);
