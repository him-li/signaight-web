import { Person } from "@/types/person/index.interface";
import { uniqueBy } from "./uniqueBy";

export function mergeGeoTrace(persons: Person[]) {
  const features = uniqueBy(
    persons.flatMap((p) => p.geo_trace?.features ?? []),
    (f) => f.id ?? f.properties?.place_name,
  );

  return features.length ? { type: "FeatureCollection", features } : undefined;
}
