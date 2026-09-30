import { IRedFlag } from "../person/red_flag/index.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPersonsRedFlagsResponse {
  items: IPersonsRedFlags[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const redFlagKeys = [
  "illegal_immigration",
  "extremism",
  "substance",
  "sexual_misconduct",
  "bragging_exceptional_lifestyle",
  "activism",
  "terror_conviction",
  "online_radicalization",
  "pro_palestinian_statements",
  "suicidal_ideation",
  "watchlist_countries",
] as const;

type RedFlagKeys = (typeof redFlagKeys)[number];
type IRedFlagsMap = { [K in RedFlagKeys]: IRedFlag | null };

export interface IPersonsRedFlags extends IRedFlagsMap {
  _id: string;
  person: {
    id: string;
    collection: string;
  };
}
