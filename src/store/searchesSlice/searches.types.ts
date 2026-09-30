import { Searches } from "@/types/search.interface";

export interface EventsState {
  loading: boolean;
  error: string | null;
  searchesList: Searches;
  selectedSearches: string;
}
