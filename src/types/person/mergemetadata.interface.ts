export interface MergeMetadata {
  merged_from_person_ids: string[];
  merge_mode: string;
  merged_at: string;
  merged_by: MergedBy;
  merge_strategy: MergeStrategy;
}

export interface MergedBy {
  user_id: string;
  email: string;
}

export interface MergeStrategy {
  conflict_resolution: string;
  merged_arrays: string;
}
