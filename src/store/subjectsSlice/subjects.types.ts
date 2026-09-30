/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Alerts } from "@/types/alerts.interface";
import type { Evaluation } from "@/types/evaluation.interface";
import type { Person, PersonQuery } from "@/types/person/index.interface";
import type { WebSearches } from "@/types/search.interface";
import type { IRedFlag } from "@/types/person/red_flag/index.interface";

export interface ProjectSelectedSubjects {
  project_id: string;
  subjects: Person[];
}

export interface SubjectsState {
  subjects: Person[];
  projectSubjectsBasicInfo: [];
  currentSelectedSubjects: Person[];
  allProjectsSelectedSubjects: ProjectSelectedSubjects[];
  subjectListPage: number;
  subjectListPageSize: number;
  subjectListTotal: number;
  subjectListTotalPages: number;
  loading: boolean;
  error: string | null;
  searchQuery: PersonQuery;
  currentSubjectData: Person | null;
  currentSubjectDataHash: string;
  currentSubjectRedFlags: IRedFlag[] | null;
  currentSubjectEvaluation: Evaluation | null;
  currentSubjectAlerts: Alerts | null;
  totalRisks: number;
  totalAnalyzed: number;
  totalPersons: number;
  totalRedFlags: number;
  evaluationDashPage: string;
  subjectRanking: any[];
  subjectAnalysis: any;
  cardView: boolean;
  webSearch: WebSearches[];
  exporting: boolean;
  exportingError: string | null;
  isAllSelected: boolean;
  subjectsLoading: boolean;
}

export type IncludeSubject = {
  project_id: string;
  subject: string;
};

export type ScoreWeights = {
  courage: 50;
  consistency: 50;
  credibility: 50;
  conscientiousness: 50;
  clandestineness: 50;
};
