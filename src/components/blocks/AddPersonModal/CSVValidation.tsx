/* eslint-disable @typescript-eslint/no-explicit-any */
import Display from "@/components/atoms/Display";
import ShowCSVValidationErrors from "./ShowCSVValidationErrors";
import { useCSVValidationState } from "@/contexts/csvValidationContext/CSVValidationContext";
import { Card } from "@heroui/react";

type Props = object;

export default function CSVValidation({}: Props) {
  const { csvValidationErrors } = useCSVValidationState();

  return (
    <Display when={csvValidationErrors.length > 0} fallback={<></>}>
      <Card className="text-red-500 text-sm">
        <Card.Header className="flex items-center justify-between">
          <Card.Title>CSV Validation Errors</Card.Title>
          <ShowCSVValidationErrors />
        </Card.Header>
        <Card.Content>
          {Object.entries(
            csvValidationErrors.reduce(
              (acc, v) => ({
                ...acc,
                [v.message]: [...(acc?.[v.message] ?? []), (v as any).data],
              }),
              {} as any,
            ),
          ).map((error, index) => (
            <div key={index}>{error[0]}</div>
          ))}
        </Card.Content>
      </Card>
    </Display>
  );
}
