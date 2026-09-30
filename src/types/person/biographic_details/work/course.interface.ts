import type { CommonFields } from "@/types/base.interface";

export interface Course extends CommonFields {
  course_id: string;
  name?: string;
  number?: string;
  occupation?: string;
}
