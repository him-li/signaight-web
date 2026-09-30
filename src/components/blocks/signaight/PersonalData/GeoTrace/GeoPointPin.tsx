import { Button, Popover } from "@heroui/react";
import { Marker } from "react-map-gl/mapbox";
import { Feature, GeoJsonProperties, Point } from "geojson";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import Link from "next/link";
import { useGeoTraceState } from "@/contexts/geoTraceContext/GeoTraceContext";
import { modal } from "styles/styles";
type Props = { city: Feature<Point, GeoJsonProperties> };
const Facebook = getSocialMediaIcon("facebook");

export default function GeoPointPin({ city }: Props) {
  const { position } = useGeoTraceState();

  if (
    city.properties?.location_type &&
    !position.includes(city.properties?.location_type)
  ) {
    return null;
  }
  if (!city.properties?.location_type && !position.includes("entities")) {
    return null;
  }
  return (
    <Marker
      key={`marker-${city.id}`}
      longitude={city.geometry.coordinates[0]}
      latitude={city.geometry.coordinates[1]}
      anchor="bottom"
    >
      <Popover>
        <Button
          isIconOnly
          variant="ghost"
          className={`translate-y-3 rounded-full z-[${
            city.properties?.location_type === "residence" ? 20 : 0
          }]`}
        >
          <Icons.Location
            fill={
              city.properties?.location_type === "residence"
                ? "purple"
                : city.properties?.location_type === "check_ins"
                  ? "chartreuse"
                  : !city.properties?.location_type ||
                      city.properties?.location_type === "entities"
                    ? "darkkhaki"
                    : "gray"
            }
            cursor="pointer"
          />
        </Button>
        <Popover.Content className={modal.base + " z-10 w-fit"}>
          <Popover.Dialog>
            <Popover.Heading>{city.properties?.place_name}</Popover.Heading>
            {city.properties?.note && (
              <div>
                {city.properties?.location_type === "entities" ? (
                  <Link href={city.properties?.note}>
                    <Facebook />
                  </Link>
                ) : (
                  <p>{city.properties?.note}</p>
                )}
              </div>
            )}
            {city.properties?.date && <div>{city.properties?.date}</div>}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </Marker>
  );
}
