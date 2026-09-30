import type { CommonFields } from "@/types/base.interface";

export interface BirthYearBirthday extends CommonFields {
  birthday?: Birthday;
  year_of_birth?: YearOfBirth;
}
interface Birthday extends CommonFields {
  birthday?: string | Date;
  eumw_birthday?: string | Date;
  linkedin_birthday?: string | Date;
  fb_birthday?: string | Date;
  fb_birth_date?: string;
  fb_birth_year?: number;
  goodreads_birth_date?: string;
  deezer_birth_date?: string;
  pulsstory_birth_date?: string;
  interpol_birthday?: string | Date;
  microsoft_birthday?: string | Date;
}

interface YearOfBirth extends CommonFields {
  birthyear?: number;
}
