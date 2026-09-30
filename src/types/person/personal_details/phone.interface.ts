import type { CommonFields } from "@/types/base.interface";

export interface Phone extends CommonFields {
  phones?: string[];
  associated_phones?: string[];
  discovery_phones?: string[];
  fb_phone?: string;
  fb_phones?: string[];
  fb_phones_in_whatsapp?: string[];
  linkedin_phone_numbers?: string[];
  fb_phone_part?: string[];
  xing_business_phone?: string;
  apple_phone_part?: string[];
  microsoft_phone_part?: string[];
  samsung_phone_part?: string[];
  paypal_phone_part?: string[];
  ebay_phone_part?: string[];
}
