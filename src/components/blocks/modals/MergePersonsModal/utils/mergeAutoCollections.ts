import { Person } from "@/types/person/index.interface";
import { mergeConnections } from "./mergeConnections";
import { mergeGeoTrace } from "./mergeGeoTrace";
import { mergeInterests } from "./mergeInterests";
import { mergePosts } from "./mergePosts";

export function mergeAutoCollections(persons: Person[]) {
  return {
    posts: mergePosts(persons),
    connections: mergeConnections(persons),
    interests: mergeInterests(persons),
    geo_trace: mergeGeoTrace(persons),
  };
}
