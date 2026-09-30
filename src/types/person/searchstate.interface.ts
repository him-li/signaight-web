export enum SearchStatusEnum {
  in_progress = "In progress",
  success = "Success",
  error = "Error",
  timeout = "Timeout",
}

export type SearchState = {
  is_done: boolean;
  status: SearchStatusEnum;
  description?: string;
};
