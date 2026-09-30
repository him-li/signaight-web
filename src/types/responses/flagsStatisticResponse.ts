export interface PersonInfo {
  id: string;
  profile_picture: string;
  flag_images: string[];
}

export interface FlagPersonInfo {
  count: number;
  persons: PersonInfo[];
}
export interface FlagsStatisticsResponse {
  illegal_immigration: FlagPersonInfo;
  islamic_extremism: FlagPersonInfo;
  substance: FlagPersonInfo;
  sexual_misconduct: FlagPersonInfo;
  bragging_exceptional_lifestyle: FlagPersonInfo;
  activism: FlagPersonInfo;
  terror_conviction: FlagPersonInfo;
  online_radicalization: FlagPersonInfo;
  pro_palestinian_statements: FlagPersonInfo;
  suicidal_ideation: FlagPersonInfo;
  watchlist_countries: FlagPersonInfo;
  anti_israel_statements: FlagPersonInfo;
  anti_usa_statements: FlagPersonInfo;
  weapons: FlagPersonInfo;
}
