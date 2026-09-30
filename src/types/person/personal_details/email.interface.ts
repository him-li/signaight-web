import type { CommonFields } from "@/types/base.interface";

export interface Email extends CommonFields {
  email_address?: string[];
  associated_email?: string[];
  fb_email_address?: string;
  linkedin_email_address?: string;
  fb_email_part?: string[];
  xing_business_email?: string;
  xing_private_email?: string;
  apple_email_part?: string[];
  apple_email?: string;
  microsoft_email_part?: string[];
  paypal_email_part?: string[];
}
