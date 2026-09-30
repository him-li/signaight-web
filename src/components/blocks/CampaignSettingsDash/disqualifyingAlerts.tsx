import { Slider, Switch, Label } from "@heroui/react";
import { personAlertsConstants } from "@/constants";
import Capitalize from "@/utils/capitalize";
import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";

interface DisqualifyingAlertsProps {
  disqualifyingAlerts: Array<keyof typeof personAlertsConstants>;
  setDisqualifyingAlerts: (
    value: Array<keyof typeof personAlertsConstants>,
  ) => void;
  disqualifyingThreshold: number;
  setDisqualifyingThreshold: (value: number) => void;
}

export default function DisqualifyingAlerts({
  disqualifyingAlerts,
  setDisqualifyingAlerts,
  disqualifyingThreshold,
  setDisqualifyingThreshold,
}: DisqualifyingAlertsProps) {
  return (
    <BlockLayout
      title="Disqualifying Alerts"
      subtitle={
        <Slider
          className="w-40"
          value={disqualifyingThreshold}
          defaultValue={disqualifyingThreshold}
          minValue={0}
          maxValue={10}
          step={1}
          // showSteps
          // showTooltip
          // tooltipProps={{ content: "Disqualifying Threshold" }}
          onChange={(value) => setDisqualifyingThreshold(value as number)}
        >
          <Slider.Output />
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      }
      icon={<Icons.Cancel />}
    >
      {Object.entries(personAlertsConstants).map(([key, value]) => (
        <Switch
          key={key}
          id={key}
          isSelected={disqualifyingAlerts.includes(
            key as keyof typeof personAlertsConstants,
          )}
          onChange={(event: any) => {
            const updatedSelection = event.target.checked
              ? [
                  ...disqualifyingAlerts,
                  key as keyof typeof personAlertsConstants,
                ]
              : disqualifyingAlerts.filter((item) => item !== key);
            setDisqualifyingAlerts(updatedSelection);
          }}
        >
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Content>
            <Label className="text-sm">{Capitalize(value)}</Label>
          </Switch.Content>
        </Switch>
      ))}
    </BlockLayout>
  );
}
