import type { CommonFields } from "@/types/base.interface";

export interface Languages extends CommonFields {
  languages?: Language[];
  fb_languages?: Language[];
  li_languages?: Language[];
  xing_languages?: Language[];
  eumw_languages?: Language[];
  interpol_languages?: Language[];
  microsoft_language?: Language;
  myfitnesspal_language?: Language;
  duolingo_learning?: string[];
}

interface Language extends CommonFields {
  language_id?: string;
  language: string;
  proficiency?: string;
}
