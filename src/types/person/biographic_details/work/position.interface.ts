import type { CommonFields } from "@/types/base.interface";
import type {
  Period,
  Duration,
} from "@/types/person/biographic_details/period.interface";

export interface Position extends CommonFields {
  title?: string;
  employment_type?: string;
  description?: string;
  company_name: string;
  company_public_identifier?: string;
  company_logo_url?: string;
  location?: string;
  linkedin_company_url?: string;
  xing_company_url?: string;
  linkedin_industry?: string;
  period?: Period;
  duration?: Duration;
  country?: string;
  company_website?: string;
  company_industry?: string;
  company_number_of_employees?: string;
}
