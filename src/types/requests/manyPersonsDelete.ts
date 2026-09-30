export interface IManyPersonsDeleteRequest {
  method: "all" | "in" | "not_in";
  person_ids: string[];
  project_id: string;
}
