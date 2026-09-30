import type { CommonFields } from "@/types/base.interface";
import type { Period } from "@/types/person/biographic_details/period.interface";

export interface Education extends CommonFields {
  linkedin_schools?: LinkedinSchool[];
  facebook_schools?: FacebookSchool[];
  xing_schools?: XingSchool[];
}
interface LinkedinSchool extends CommonFields {
  school_name: string;
  degree_name?: string;
  education_field?: string;
  period?: Period;
  activities?: string[];
  school_logo_url?: string;
  school_url?: string;
  linkedin_school_location?: string;
  description?: string;
  duration?: {
    years: number;
    months: number;
  };
}

interface XingSchool extends LinkedinSchool {
  degree_type?: string;
}

interface FacebookSchool extends CommonFields {
  fb_school_name: string;
  fb_school_url?: string;
  fb_school_description?: string;
  fb_school_photo?: string;
  period?: Period;
  fb_school_location?: string;
  fb_education_field?: string;
}
