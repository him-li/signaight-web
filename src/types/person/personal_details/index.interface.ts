import type { CommonFields } from "@/types/base.interface";
import type { Name } from "@/types/person/personal_details/name.interface";
import type { Email } from "@/types/person/personal_details/email.interface";
import type { Gender } from "@/types/person/personal_details/gender.interface";
import type { Visuals } from "@/types/person/personal_details/visuals.interface";
import type { Phone } from "@/types/person/personal_details/phone.interface";
import type { BirthYearBirthday } from "@/types/person/personal_details/birth_year_birthday.interface";
import type { Websites } from "@/types/person/personal_details/websites.interface";
import type { Languages } from "@/types/person/personal_details/languages.interface";
import type { Location } from "@/types/person/personal_details/location.interface";
import type { AdditionalDetails } from "@/types/person/personal_details/additional_details.interface";
import type { Nationality } from "@/types/person/personal_details/nationality.interface";

export interface PersonalDetails extends CommonFields {
  name?: Name;
  phone?: Phone;
  gender?: Gender;
  visuals?: Visuals;
  email?: Email;
  birth_year_birthday?: BirthYearBirthday;
  websites?: Websites;
  languages?: Languages;
  location?: Location;
  additional_details?: AdditionalDetails;
  nationality?: Nationality;
  ethnicity?: string;
}
