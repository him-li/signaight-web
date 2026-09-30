/* eslint-disable @typescript-eslint/no-explicit-any */
type PhysicalIdentifiers = {
  height?: Height;
  weight?: Weight;
  eye_color?: EyeColor;
  hair_color?: HairColor;
  identifiers?: Identifiers;
};

type Height = {
  eumw_height?: string;
  interpol_height?: string;
};

type Weight = {
  interpol_weight?: string;
};

type EyeColor = {
  eumw_eye_color?: string;
  interpol_eye_color?: string[];
};

type HairColor = {
  interpol_hair_color?: string[];
};

type Identifiers = {
  eumw_identifiers?: string[];
  interpol_identifiers?: string;
};

type EumwDetails = {
  is_dangerous?: boolean;
  ethnic_origin?: string;
  date_published?: string;
  is_reward?: boolean;
  crime?: string;
  info?: string;
};

type InterpolDetails = {
  arrest_warrants?: ArrestWarrants;
  interpol_entity_id?: string;
};

type ArrestWarrants = {
  charge?: string;
  issuing_country?: string;
  charge_translation?: string;
};

export type AdditionalDetails = {
  additional_person_details?: any;
  fb_insterested_in?: any;
  fb_political_views?: any;
  fb_religious_views?: any;
  eumw_details?: EumwDetails;
  interpol_details?: InterpolDetails;
  physical_identifiers?: PhysicalIdentifiers;
};
