import { Person } from "../person/index.interface";

export type MergePersonsRequest = {
  person_ids: string[];
  merge_mode: "auto" | "manual";
  project_id: string;
  merged_person: Person;
};
