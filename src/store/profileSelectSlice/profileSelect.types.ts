/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Person } from "@/types/person/index.interface";
import type { Candidate } from "@/types/candidate.interface";

export interface ProfileSelectState {
  profileSelected: boolean;
  loading: boolean;
  error: string | null;
  flows: any[];
  currentFlow: number;
  persons: any[];
  currentPerson: number;
  candidates: Candidate[];
  identityExpanderCandidates: Candidate[];
  currentSearch: string;
  primaryId: string;
  subjectData: Person | null;
  confirmAlertOpen: boolean;
}
