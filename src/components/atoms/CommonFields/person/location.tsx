import { Chip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import Display from "@/components/atoms/Display";
import type { Location } from "@/types/person/personal_details/location.interface";

function findAnyString(obj?: Location): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;

  for (const value of Object.values(obj)) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    } else if (Array.isArray(value)) {
      for (const v of value) {
        const result = findAnyString(v);
        if (result) return result;
      }
    } else if (typeof value === "object") {
      const result = findAnyString(value);
      if (result) return result;
    }
  }
  return undefined;
}

export default function Location({ location }: { location?: Location }) {
  const prioritized =
    location?.location ??
    location?.current_country?.linkedin_location_country ??
    location?.current_city?.fb_current_city ??
    location?.current_city_region_country?.linkedin_location;
  const resolvedLocation = prioritized || findAnyString(location);
  return (
    <Display when={!!resolvedLocation} fallback={<></>}>
      <Chip variant="tertiary" className="p-0 w-52 truncate text-xs">
        <Icons.Location />
        {resolvedLocation}
      </Chip>
    </Display>
  );
}
