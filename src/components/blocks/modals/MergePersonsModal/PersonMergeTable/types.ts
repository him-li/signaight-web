export type MergeField = {
  path: string;
  firstValue?: unknown;
  secondValue?: unknown;
  thirdValue?: unknown;
  withoutThird?: boolean;
};

export type GroupedFields = Record<
  string, // level 1
  Record<
    string, // level 2
    MergeField[]
  >
>;

export type FlatEntry = {
  path: string;
  value: unknown;
};
