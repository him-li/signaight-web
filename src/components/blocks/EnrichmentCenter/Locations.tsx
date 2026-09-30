/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import Locations from "@/components/blocks/signaight/PersonalData/IndicatorsBox/Locations";
import Display from "@/components/atoms/Display";
import NotFound from "@/components/atoms/Icons/NotFound";
import { toBase64Url } from "@/utils/toBase64";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import type { Person } from "@/types/person/index.interface";
import type { IRedFlag } from "@/types/person/red_flag/index.interface";
import type { IRedFlagFactor } from "@/types/person/red_flag/factor.interface";

export default function LocationsBlock({ person }: { person?: Person }) {
  if (
    (!person?.red_flags || person?.red_flags?.length < 1) &&
    (!person?.personal_details.location?.check_ins?.fb_check_ins?.length ||
      person?.personal_details.location?.check_ins?.fb_check_ins?.length < 1) &&
    (!person?.personal_details.location?.check_ins?.google_reviews?.length ||
      person?.personal_details.location?.check_ins?.google_reviews?.length < 1)
  )
    return <NotFound size={100} text="No Location Detected" />;

  const extractAllFactors = (redFlags?: IRedFlag[]): IRedFlagFactor[] => {
    if (!redFlags) return [];

    return redFlags.flatMap(
      (rf) => rf.sub_categories?.flatMap((sub) => sub.factors ?? []) ?? [],
    );
  };
  const Google = getSocialMediaIcon("google");
  const Facebook = getSocialMediaIcon("facebook");
  return (
    <div className="flex flex-wrap justify-around gap-2">
      <Display when={person?.red_flags} fallback={<></>}>
        <Locations locations={extractAllFactors(person?.red_flags)} />;
      </Display>
      <Display
        when={person?.personal_details?.location?.check_ins?.google_reviews}
        fallback={<></>}
      >
        {person?.personal_details?.location?.check_ins?.google_reviews?.map(
          (review, index) => {
            const toBaseLocation = {
              geometry: {
                coordinates: [review?.long, review?.lat],
                type: "Point",
              },
              id: new Date().getTime().toString(),
              type: "Feature",
              properties: {
                mapbox_id: new Date().getTime().toString(),
                wikidata: new Date().getTime().toString(),
                short_code: null,
                place_name: null,
                location_type: null,
                date: null,
              },
            };
            const b64url = toBase64Url({
              ...toBaseLocation,
              properies: {
                "marker-color": "#e99401",
                "marker-size": "medium",
                "marker-symbol": "park",
              },
            });
            const center = `${review?.long},${review?.lat}`;
            return (
              <Card key={index} className="w-full max-w-48 h-72 relative p-0">
                <Card.Header className="p-3 flex flex-row items-center gap-2 z-20 bg-default-50/75 text-sm font-medium">
                  <Card.Title>{review?.name}</Card.Title>
                </Card.Header>
                <Card.Content className="overflow-y-auto text-tiny gap-2 z-20 px-3">
                  {review?.date ? (
                    <p>{review?.date?.toLocaleString()}</p>
                  ) : null}
                  <p>{review?.address}</p>
                  <p>{review?.comment}</p>
                </Card.Content>
                <Card.Footer className="flex px-0 min-h-10 bg-default-50/75 border-t border-zinc-100/50 justify-center z-20">
                  <Button
                    variant="tertiary"
                    isDisabled
                    className="rounded-none w-full"
                  >
                    <Google />
                    Google Review
                  </Button>
                </Card.Footer>
                {b64url ? (
                  <img
                    alt={index.toString()}
                    className="absolute top-0 w-full h-full object-cover"
                    src={`/api/mapbox?center=${center}&zoom=4&size=500x300&geojson_b64=${b64url}`}
                  />
                ) : null}
              </Card>
            );
          },
        )}
      </Display>
      <Display
        when={person?.personal_details?.location?.check_ins?.fb_check_ins}
        fallback={<></>}
      >
        {person?.personal_details?.location?.check_ins?.fb_check_ins?.map(
          (checkin, index) => {
            return (
              <Card key={index} className="w-full max-w-48 h-72 relative">
                <Card.Header className="flex flex-row items-center gap-2 z-20 bg-default-50/75 text-sm font-medium">
                  <Card.Title>{checkin?.title}</Card.Title>

                  <Card.Description className="font-normal">
                    {checkin?.subtitle}
                  </Card.Description>
                </Card.Header>
                <Card.Content className="overflow-y-auto text-tiny gap-2 z-20">
                  {checkin?.date ? (
                    <p>{checkin?.date?.toLocaleString()}</p>
                  ) : null}
                  <p>{checkin?.region}</p>
                </Card.Content>
                <Card.Footer className="flex p-0 min-h-10 bg-default-50/75 border-t border-zinc-100/50 justify-center z-20">
                  <Link target="_blank" href={checkin?.url ?? ""}>
                    <Button
                      variant="tertiary"
                      isIconOnly={checkin?.url ? false : true}
                      isDisabled={checkin?.url ? false : true}
                      className="rounded-none"
                    >
                      <Facebook />
                      Facebook Check-in
                    </Button>
                  </Link>
                </Card.Footer>
                {checkin?.event_image ? (
                  <img
                    alt={checkin?.event_image}
                    className="absolute top-0 w-full h-full object-cover"
                    src={checkin?.event_image}
                  />
                ) : null}
              </Card>
            );
          },
        )}
      </Display>
    </div>
  );
}
