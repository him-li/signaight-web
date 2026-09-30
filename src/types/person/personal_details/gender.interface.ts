import type { CommonFields } from "@/types/base.interface";

export interface Gender extends CommonFields {
  gender?: string;
  fb_gender?: string;
  truecaller_gender?: string;
  goodreads_gender?: string;
  deezer_gender?: string;
  foursquare_gender?: string;
  eumw_gender?: string;
  interpol_gender?: string;
  microsoft_gender?: string;
  myfitnesspal_gender?: string;
}
