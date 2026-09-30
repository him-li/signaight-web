import { Slider } from "@heroui/react";
import { personEvaluationConstants } from "@/constants";
import Capitalize from "@/utils/capitalize";
import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";

type EvaluationKeys = keyof typeof personEvaluationConstants;

interface EvaluationWeightsProps {
  evaluationValues: Partial<Record<EvaluationKeys, number>>;
  setEvaluationValues: (value: Partial<Record<EvaluationKeys, number>>) => void;
}

export default function EvaluationWeights({
  evaluationValues,
  setEvaluationValues,
}: EvaluationWeightsProps) {
  return (
    <BlockLayout title="Evaluation Weights" icon={<Icons.Check />}>
      {Object.entries(personEvaluationConstants).map(([key, value]) => (
        <div
          key={key}
          id={key}
          className="flex flex-col w-full sm:flex-row justify-between sm:items-center"
        >
          <p className="text-sm min-w-fit">{Capitalize(value) || value}</p>
          <Slider
            className="w-40"
            defaultValue={evaluationValues[key as EvaluationKeys]}
            minValue={0}
            maxValue={10}
            step={1}
            // showSteps
            value={evaluationValues[key as EvaluationKeys]}
            onChange={(newValue) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const newEvaluationValues: any = { ...evaluationValues };
              newEvaluationValues[key as EvaluationKeys] = newValue;
              setEvaluationValues(newEvaluationValues);
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
