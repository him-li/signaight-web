import type { CommonFields } from "@/types/base.interface";

export interface VolunteerExperience extends CommonFields {
  volunteer_experience?: VolunteeringExperience[];
  linkedin_volunteering_experiences?: LinkedinVolunteeringExperiences;
  certificates?: Certification[];
  role: string[];
  cause: Cause[];
}
interface LinkedinVolunteeringExperiences extends CommonFields {
  certificates?: string[];
}

export type VolunteeringExperience = {
  role: "role";
  company_name: "company_name";
  is_current: true;
  start_month_year: "2023-11-01";
  end_month_year: "2023-11-01";
  duration: {
    years: 0;
    months: 0;
  };
  description: "description";
};

enum Cause {
  animal_rights = "Animal Rights",
  arts_and_culture = "Arts and Culture",
  children = "Children",
  civil_rights = "Civil Rights",
  economic_empowerment = "Economic Empowerment",
  health = "Health",
  human_rights = "Human Rights",
  humanitarian_relief = "Humanitarian Relief",
  politics = "Politics",
  poverty_alleviation = "Poverty Alleviation",
  science_and_technology = "Science and Technology",
  social_services = "Social Services",
}

interface Certification extends CommonFields {
  certification_id: string;
  authority?: string;
  company?: string;
  end_month_year?: string;
  license_number?: string;
  name?: string;
  start_month_year?: string;
  url?: string;
}
