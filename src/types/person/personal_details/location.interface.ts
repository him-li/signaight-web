import type { CommonFields } from "@/types/base.interface";

export interface Location extends CommonFields {
  location?: string;
  instagram_location_id?: string;
  fb_location_id?: string;
  instagram_location_name?: string;
  instagram_location_address?: string;
  instagram_location_city?: string;
  twitter_location?: string;
  microsoft_location?: string;
  xing_street_address?: string;
  xing_zip_address?: string;
  xing_country_province_address?: string;
  truecaller_country_code?: string;
  icq_location?: string;
  runkeeper_location?: string;
  goodreads_location?: string;
  garminconnect_location?: string;
  flickr_location?: string;
  foursquare_location?: string;
  linkedin_country_code?: string;
  cashapp_location?: string;
  yelp_location?: string;
  quora_location?: string;
  current_city_region_country?: CurrentCityRegionCountry;
  current_location?: CurrentLocation;
  current_city?: CurrentCity;
  current_country?: CurrentCountry;
  current_region?: CurrentRegion;
  check_ins?: CheckIns;
  current_lat_long?: CurrentLatLong;
  hometown?: Hometown;
  interpol_birthplace?: string;
  places_lived?: PlacesLived;
}
interface CurrentCityRegionCountry extends CommonFields {
  linkedin_search_location?: string;
  linkedin_location?: string;
}
interface CurrentLocation extends CommonFields {
  linkedin_location_epieos?: string;
  fb_lives_in_url?: string;
  xing_location?: string;
}
interface CurrentCity extends CommonFields {
  fb_current_city?: string;
}
interface CurrentCountry extends CommonFields {
  linkedin_location_country?: string;
}
type CurrentRegion = CommonFields;

interface FacebookCheckIn {
  id?: string;
  title?: string;
  subtitle?: string;
  url?: string;
  event_image?: string;
  region?: string;
  date?: Date | string;
}

interface GoogleReview {
  address?: string;
  comment?: string;
  date?: string | Date;
  id?: string;
  name?: string;
  lat?: string | number;
  long?: string | number;
}

export interface CheckIns extends CommonFields {
  fb_check_ins?: FacebookCheckIn[];
  google_reviews: GoogleReview[];
}
interface CurrentLatLong extends CommonFields {
  fb_lives_in_lat?: string;
  fb_lives_in_long?: string;
}
interface Hometown extends CommonFields {
  fb_hometown?: string;
}

interface FbPlaceLived {
  fb_moved_to?: string;
  fb_moved_at?: string;
}
interface PlacesLived {
  fb_places_lived?: FbPlaceLived[];
}
