import { Card, Modal } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { MergeMode } from "../types";

type ChooseMergeModeProps = {
  onSelectMode: (mode: MergeMode) => void;
};

export default function ChooseMergeMode({
  onSelectMode,
}: ChooseMergeModeProps) {
  return (
    <>
      <Modal.Header>
        <Modal.Heading>Select Merge Mode</Modal.Heading>
      </Modal.Header>
      <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card onClick={() => onSelectMode("auto")} className="cursor-pointer">
          <Card.Header>
            <Card.Title className="flex items-center-safe gap-1">
              <Icons.Automatic />
              Automatic
            </Card.Title>
          </Card.Header>
          <Card.Description>
            Automatically selects the best values based on confidence,
            verification, and data completeness.
          </Card.Description>
          <Card.Content className="space-y-3 items-start">
            <ul className="text-xs list-disc pl-4">
              <li>Fastest option</li>
              <li>No manual review</li>
              <li>Recommended for clean data</li>
            </ul>
          </Card.Content>
        </Card>

        <Card onClick={() => onSelectMode("manual")} className="cursor-pointer">
          <Card.Header>
            <Card.Title className="flex items-center-safe gap-1">
              <Icons.Manual />
              Manual
            </Card.Title>
            <Card.Description>
              Review and select values field by field before merging.
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-3 items-start">
            <ul className="text-xs list-disc pl-4">
              <li>Full control</li>
              <li>Best for conflicting data</li>
              <li>Recommended for review</li>
            </ul>
          </Card.Content>
        </Card>
      </Modal.Body>
    </>
  );
}
