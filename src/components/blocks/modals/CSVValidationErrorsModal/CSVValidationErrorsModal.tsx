/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import Papa from "papaparse";
import { useTheme } from "next-themes";
import { Modal, Table, Card } from "@heroui/react";
import { useCSVValidationState } from "@/contexts/csvValidationContext/CSVValidationContext";
import { modal } from "styles/styles";

type CSVValidationErrorsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CSVValidationErrorsModal({
  isOpen,
  onClose,
}: CSVValidationErrorsModalProps) {
  const { theme } = useTheme();
  const { csvValidationErrors } = useCSVValidationState();
  const renderTable = useCallback((data: any) => {
    const improvedData = data.map((item: any) => {
      if (item["__parsed_extra"]) {
        item["Parsed Extra"] = item["__parsed_extra"].join(" ");
        delete item["__parsed_extra"];
      }
      return item;
    });
    let parsedData = "";
    try {
      parsedData = Papa.unparse(improvedData);
    } catch (error) {
      console.error("Error parsing CSV data:", error);
      return <div>Error parsing CSV data</div>;
    }

    const rows = parsedData.split("\n");
    return (
      <Table className="table-auto w-full">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header
              columns={Object.keys(improvedData?.[0] || {}).reduce(
                (acc, key, i) => [...acc, { key: i.toString(), label: key }],
                [] as { key: string; label: string }[],
              )}
            >
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body>
              {rows.slice(1).map((row, rowIndex) => {
                const cells = row.split(",");
                return (
                  <Table.Row key={rowIndex}>
                    {cells.map((cell, cellIndex) => {
                      return <Table.Cell key={cellIndex}>{cell}</Table.Cell>;
                    })}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    );
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container size="cover">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>CSV Validatiotion Errors Details</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="mx-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
              {Object.entries(
                csvValidationErrors.reduce(
                  (acc, v) => ({
                    ...acc,
                    [v.message]: [...(acc?.[v.message] ?? []), (v as any).data],
                  }),
                  {} as any,
                ),
              ).map((error, index) => (
                <Card key={error[0] + index} className="my-1">
                  <Card.Header className="text-red-500">{error[0]}</Card.Header>
                  <Card.Content>{renderTable(error[1] as any)}</Card.Content>
                </Card>
              ))}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
