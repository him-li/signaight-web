"use client";
import { Card, Chip, Separator } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { getAirport } from "@/utils/getAirports";
import { useAppSelector } from "@/store/store";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import { ProjectPNR } from "@/types/project.interface";

function isEmptyFlightData(data?: ProjectPNR) {
  if (!data) return true;
  return Object.values(data).every(
    (v) => v === undefined || v === "" || v === null,
  );
}

export default function FlightInfo() {
  const data = useAppSelector(selectSelectedProject)?.pnr_data;
  if (isEmptyFlightData(data)) return null;

  return (
    <Card className="w-full p-0 overflow-hidden bg-linear-to-br from-default-100 to-default-200 shadow-md relative hover:bg-default-hover ease-in-out duration-300">
      <Icons.WorldMap
        size={700}
        className="absolute start-1/5 -top-11/12 text-background/70"
      />
      <Card.Header className="flex flex-row px-16 py-2 items-center-safe justify-between bg-accent hover:bg-accent-hover">
        <div>
          <strong className="text-5xl me-2">{data?.flight_number}</strong>
          {data?.flight_date
            ? new Date(data?.flight_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "Asia/Jerusalem",
              })
            : null}
        </div>
        <Chip variant="tertiary">
          <Icons.Plane size={30} />
          <Chip.Label className="text-xl font-semibold">
            {data?.airline}
          </Chip.Label>
        </Chip>
      </Card.Header>
      <Card.Content className="flex flex-row items-center-safe gap-2 z-0">
        <div>
          <Icons.Barcode size={60} className="rotate-90 w-fit h-full" />
          <Icons.Barcode size={60} className="rotate-90 w-fit h-full" />
        </div>
        <div className="flex p-4 text-5xl w-full justify-evenly items-center-safe gap-8">
          <div className="flex flex-col items-start-safe">
            <strong>{data?.departure_airport}</strong>
            <Chip variant="tertiary">
              <Icons.PlaneDeparture size={30} />
              <Chip.Label>
                {getAirport(data?.departure_airport)?.city +
                  ", " +
                  getAirport(data?.departure_airport)?.country}
              </Chip.Label>
            </Chip>
          </div>
          <div className="flex flex-col items-center-safe w-full text-medium">
            <Chip variant="tertiary">
              <Icons.PlaneDeparture size={30} />
              <Chip.Label>
                {getAirport(data?.departure_airport)?.name}
              </Chip.Label>
            </Chip>
            <Separator />
            <Chip variant="tertiary">
              <Icons.PlaneArrival size={30} />
              <Chip.Label>{getAirport(data?.arrival_airport)?.name}</Chip.Label>
            </Chip>
          </div>
          <div className="flex flex-col items-end-safe">
            <strong>{data?.arrival_airport}</strong>
            <Chip variant="tertiary">
              <Chip.Label>
                {getAirport(data?.arrival_airport)?.city +
                  ", " +
                  getAirport(data?.arrival_airport)?.country}
              </Chip.Label>
              <Icons.PlaneArrival size={30} />
            </Chip>
          </div>
        </div>
      </Card.Content>
      <Card.Footer className="bg-accent h-4" />
    </Card>
  );
}
