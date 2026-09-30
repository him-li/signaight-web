export type IActionType = "create" | "update";
export type IKind = "api.v1.persons" | "api.v1.projects";

export interface ILimitsResponse {
  limits: number;
  current: number;
  kind: IKind;
  allow: boolean;
}
