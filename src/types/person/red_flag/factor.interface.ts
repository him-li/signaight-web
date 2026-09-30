/* eslint-disable @typescript-eslint/no-explicit-any */
export type IRedFlagFactor = {
  field: string;
  platform: string | null;
  source?: IRedFlagFactorSource;
  check?: any;
  success?: boolean | null;
  ratio?: number | null;
};

export type IRedFlagFactorSource = {
  url?: string;
  insight?: string;
  photo?: string;
  text?: string;
  date?: string;
  location?: object;
};
