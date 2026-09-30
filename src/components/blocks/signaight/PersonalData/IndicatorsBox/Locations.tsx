/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import type { IRedFlagFactor } from "@/types/person/red_flag/factor.interface";
import { toBase64Url } from "@/utils/toBase64";

export default function Locations({
  locations,
}: {
  locations?: IRedFlagFactor[];
}) {
  return (
    <>
      {locations?.map((checkin) => {
        const b64url = toBase64Url({
          ...checkin.source!.location,
          properies: {
            "marker-color": "#e99401",
            "marker-size": "medium",
            "marker-symbol": "park",
          },
        });
        const Icon = checkin.platform
          ? getSocialMediaIcon(checkin.platform)
          : Icons.Link;
        const center = (
          checkin.source!.location as any
        )?.geometry?.coordinates?.join(",");
        return (
          <Card
            key={checkin.source?.insight}
            className="w-full max-w-48 h-72 relative p-0"
          >
            {b64url || checkin?.source?.photo ? (
              <img
                alt={checkin?.source?.photo!}
                className="absolute top-0 object-cover w-full h-full"
                src={
                  checkin?.source?.photo ??
                  `/api/mapbox?center=${center}&zoom=4&size=500x300&geojson_b64=${b64url}`
                }
              />
            ) : null}
            <Card.Header className="flex flex-col items-start z-20 text-tiny hover:bg-default-hover/75 ease-in-out duration-300 p-4">
              <Card.Title className="text-sm font-medium">
                {checkin.source?.insight}
              </Card.Title>
              {checkin.source?.date ? (
                <Card.Description>
                  {checkin.source?.date?.toLocaleString()}
                </Card.Description>
              ) : null}
              <Card.Description>{checkin.source?.text}</Card.Description>
            </Card.Header>
            <Card.Content className="overflow-y-auto text-sm z-20" />
            <Card.Footer className="flex p-0 min-h-10 w-full hover:bg-default-hover/75 ease-in-out duration-300 border-t border-default-100/50 justify-center z-20">
              <Link target="_blank" href={checkin?.source?.url ?? ""}>
                <Button
                  variant="ghost"
                  isIconOnly={checkin?.source?.url ? false : true}
                  isDisabled={checkin?.source?.url ? false : true}
                >
                  <Icon />
                  {checkin?.source?.url && checkin.platform === "map_box"
                    ? "Link"
                    : ""}
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        );
      })}
    </>
  );
}
