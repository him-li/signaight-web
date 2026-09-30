import { Slider, Label } from "@heroui/react";
import { personAlertsConstants } from "@/constants";
import Capitalize from "@/utils/capitalize";
import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";

type AlertsKeys = keyof typeof personAlertsConstants;

interface AlertWeightsProps {
  alertsValues: Partial<Record<AlertsKeys, number>>;
  setAlertsValues: (value: Partial<Record<AlertsKeys, number>>) => void;
}

export default function AlertsWeights({
  alertsValues,
  setAlertsValues,
}: AlertWeightsProps) {
  return (
    <BlockLayout title="Alert Weights" icon={<Icons.Flag />}>
      {Object.entries(personAlertsConstants)
        .filter(([key]) => key !== "criminal_records")
        .map(([key, value]) => (
          <div
            key={key}
            id={key}
            className="flex flex-col w-full sm:flex-row justify-between sm:items-center"
          >
            <p className="min-w-fit text-sm">{Capitalize(value) || value}</p>
            <Slider
              className="w-40"
              value={alertsValues[key as AlertsKeys]}
              defaultValue={alertsValues[key as AlertsKeys]}
              minValue={0}
              maxValue={10}
              step={1}
              // showSteps
              onChangeEnd={(newValue) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const newAlertsValues: any = { ...alertsValues };
                newAlertsValues[key as AlertsKeys] = newValue;
                setAlertsValues(newAlertsValues);
              }}
            >
              <Slider.Output />
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>
          </div>
        ))}
    </BlockLayout>
  );
}
