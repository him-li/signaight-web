import type { ActiveSearch } from "@/types/search.interface";

export interface ActiveSearchQuery {
  title?: string;
  location?: string | number;
  education?: string;
}

export interface ActiveSearchState {
  activeSearches: ActiveSearch[];
  activeSearch: ActiveSearch | null;
  activeSearchPage: number;
  activeSearchPageSize: number;
  activeSearchTotal: number;
  activeSearchTotalPages: number;
  loading: boolean;
  error: string | null;
}
