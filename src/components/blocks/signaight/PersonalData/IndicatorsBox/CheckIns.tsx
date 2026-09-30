/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import type { CheckIns } from "@/types/person/personal_details/location.interface";
import { IRedFlagFactor } from "@/types/person/red_flag/factor.interface";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { toBase64Url } from "@/utils/toBase64";

export default function CheckIns({
  checkins,
}: {
  checkins?: IRedFlagFactor[];
}) {
  return (
    <div className="flex flex-wrap justify-around gap-2">
      {checkins?.map((checkin) => {
        const b64url = checkin.source!.location
          ? toBase64Url({
              ...checkin.source!.location,
              properies: {
                "marker-color": "#e99401",
                "marker-size": "medium",
                "marker-symbol": "park",
              },
            })
          : null;
        const Icon = checkin.platform
          ? getSocialMediaIcon(checkin.platform)
          : Icons.Link;
        const center = (
          checkin.source!.location as any
        )?.geometry?.coordinates?.join(",");
        return (
          <Card
            key={checkin.source?.insight}
            className="w-full max-w-48 h-72 relative"
          >
            <Card.Header className="flex flex-col items-start z-20 text-tiny font-bold bg-default-50/75">
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
            <Card.Footer className="flex p-0 min-h-10 bg-default-50/75 border-t border-zinc-100/50 justify-center z-20">
              <Link target="_blank" href={checkin?.source?.url ?? ""}>
                <Button
                  variant="tertiary"
                  isIconOnly={checkin.source?.url ? false : true}
                  isDisabled={checkin.source?.url ? false : true}
                  className="rounded-none"
                >
                  <Icon />
                  {checkin.source?.url && checkin.platform === "map_box"
                    ? "LINK"
                    : ""}
                </Button>
              </Link>
            </Card.Footer>
            {b64url || checkin?.source?.photo ? (
              <img
                alt={checkin?.source?.photo!}
                className="absolute top-0 w-full h-full object-cover"
                src={
                  checkin?.source?.photo ??
                  `/api/mapbox?center=${center}&zoom=4&size=500x300&geojson_b64=${b64url}`
                }
              />
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
