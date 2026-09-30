/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Project {
  verified?: boolean;
  id: string;
  title: string;
  created_at: Date;
  updated_at?: Date;
  user_id: string;
  description?: string;
  image?: string;
  person_ruleset: RuleSet[];
  project_platform: string;
  person_count: number;
  user_email: string;
  pnr_data?: ProjectPNR;
}

export interface ProjectQuery {
  title__like?: string;
  description__like?: string;
  order_by?: string;
}

interface RuleSet {
  label: string;
  conditions: {
    all:
      | {
          name: string;
          operator: string;
          value: any;
          params: any;
        }[]
      | null;
    any:
      | {
          name: string;
          operator: string;
          value: any;
          params: any;
        }[]
      | null;
  };
  actions: {
    name: string;
    params: any | null;
  }[];
}

export interface ProjectPNR {
  departure_airport?: string;
  arrival_airport?: string;
  flight_date?: string;
  airline?: string;
  flight_number?: string;
}

export type ProjectPNRFormType = Omit<ProjectPNR, "flight_date"> & {
  flight_date?: any | null;
};
