export type Heuristic = {
  title: string;
  description: string;
  score: string;
};

export type Alert = {
  heuristics?: Heuristic[];
  score: number;
};

export type Alerts = {
  strong_affinity_with_israel?: Alert;
  strong_affinity_with_usa?: Alert;
  occupational_instability?: Alert;
  ineligible_occupation?: Alert;
  anti_israel_statements?: Alert;
  anti_usa_statements?: Alert;
  criminal_records?: Alert;
};
