import type { CommonFields } from "@/types/base.interface";

export interface MaritalStatusRelatives extends CommonFields {
  marital_status?: string;
  fb_marital_status?: string;
  facebook_family_members?: FbFamilyMember[];
}
interface FbFamilyMember extends CommonFields {
  fb_family_member_name?: string;
  fb_family_member_type?: string;
  fb_family_member_relation_from?: Date;
  fb_user_id?: string;
  fb_profile_url?: string;
  fb_username?: string;
  fb_profile_page?: string;
  fb_profile_picture?: string;
}
