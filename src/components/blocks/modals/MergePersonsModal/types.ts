export type MergeMode = "auto" | "manual";

export type Side = "first" | "second" | "third";

export type PersonMeta = {
  side: Side;
  lastUpdated?: string | Date;
};
