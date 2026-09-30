import type { CommonFields } from "@/types/base.interface";

type Endorser = {
  urn?: string;
  name?: string;
};

export interface Skill extends CommonFields {
  skill_id?: string;
  name: string;
  endorsers?: Endorser[];
  endorser_count?: number;
}
