export const SERVER_URL =
  typeof window === "undefined"
    ? process.env.JINA_KUBERNETES_MODE === "true"
      ? `http://backend-api.${process.env.ENVIRONMENT}.${process.env.JINA_KUBERNETES_HOSTS_SUFFIX}:8000/api/v1`
      : "http://backend-api:8000/api/v1"
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export const NEXT_API_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    : "";

export const LAYOUT_NAME_COOKIE = "layoutName";

export const SERVER_SOCKET_URL = SERVER_URL
  ? SERVER_URL.replace("http", "ws").slice(
      0,
      SERVER_URL!.replace("http", "ws").lastIndexOf("/api/"),
    )
  : "";

export const SOCKET_SECURE = SERVER_SOCKET_URL.startsWith("wss://");

export const profilePlaceholder =
  "https://d3mrlwp8riu1ry.cloudfront.net/images/profile_picture_placeholder.png";

export const maxRedFlags = 0;

export const minSignAIghtScore = 40;

export const bannerColorScore = 60;

export const Field_is_required = "This field is required";

export const productName = "SignAIght";

export const messageActionIdents = {
  persons: "persons",
  search: "events/search",
  projects: "projects",
  personBatchDeleted: "persons_batch_deleted",
  recalculation: "events/recalculation",
};

export const messageActionMethods = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
};

export const messageActionReqTypes = {
  http: "http",
  ws: "ws",
  grpc: "grpc",
};

export const messageTitles = {
  searchFinished: "Search Finished",
  updatedProject: "Updated Project",
  activeSearchInitiated: "Added Active Search",
  activeSearchFinished: "Finished Active Search",
  addedPerson: "Added Person",
  finishedRecalculation: "Finished Recalculation",
};

export const sortingStrings = {
  search_state_done_asc: "+search_state__is_done",
  search_state_done_desc: "-search_state__is_done",
  search_state_status_asc: "+search_state__status",
  search_state_status_desc: "-search_state__status",
  f_name_asc: "+personal_details__name__first_name__f_name",
  created_at_desc: "-created_at",
  created_at_asc: "+created_at",
  signaight_score_desc: "-signaight_score",
  risk_score_asc: "+risk_score",
  risk_score_desc: "-risk_score",
  last_update_asc: "-last_update",
  personal_location_asc: "-personal_details__location__location",
  personal_email: "personal_details__email__email_address",
};

export const compatibilityRanges = {
  disqualified_low: 0,
  disqualified_high: 25,
  low_compatibility_low: 25,
  low_compatibility_high: 50,
  medium_compatibility_low: 50,
  medium_compatibility_high: 75,
  high_compatibility_low: 75,
};

import { Icons } from "@/components/atoms/Icons";
export const compatibilities = {
  "High Compatibility": {
    full: "High Compatibility",
    abbr: "High",
    icon: Icons.Checks,
    stop: 100,
  },
  "Medium Compatibility": {
    full: "Medium Compatibility",
    abbr: "Medium",
    icon: Icons.Check,
    stop: 60,
  },
  "Low Compatibility": {
    full: "Low Compatibility",
    abbr: "Low",
    icon: Icons.Minus,
    stop: 40,
  },
  Disqualified: {
    full: "Disqualified",
    abbr: "Disqualified",
    icon: Icons.Cancel,
    stop: 0,
  },
} as const;

export const projectConstants = {
  project_id_name: "ID/Name",
  project_description: "Description",
};

export const personRedFlagsConstants = {
  activism: "Activism",
  anti_israel_statements: "Anti Israel Statements",
  anti_usa_statements: "Anti USA Statements",
  bragging_exceptional_lifestyle: "Bragging Exceptional Lifestyle",
  illegal_immigration: "Illegal Immigration",
  islamic_extremism: "Islamic Extremism",
  pro_palestinian_statements: "Pro Palestinian Statements",
  sexual_misconduct: "Sexual Misconduct",
  substance: "Substance",
  suicidal_ideation: "Suicidal Ideation",
  terror_conviction: "Terror Conviction",
  watchlist_countries: "Watchlist Countries",
  weapons: "Weapons",
  online_radicalization: "Online Radicalization",
};

export const personAlertsConstants = {
  strong_affinity_with_israel: "STRONG AFFINITY WITH ISRAEL",
  strong_affinity_with_usa: "STRONG AFFINITY WITH USA",
  occupational_instability: "OCCUPATIONAL INSTABILITY",
  ineligible_occupation: "INELIGIBLE OCCUPATION",
  anti_israel_statements: "ANTI ISRAEL STATEMENTS",
  anti_usa_statements: "ANTI USA STATEMENTS",
  criminal_records: "CRIMINAL RECORDS",
};

export const personEvaluationConstants = {
  resilience: "RESILIENCE",
  flexibility: "FLEXIBILITY",
  curiosity: "CURIOSITY",
  decision_making: "DECISION MAKING",
  courage: "COURAGE",
  teamwork: "TEAMWORK",
  moral_values: "MORAL VALUES",
  language_skills: "LANGUAGE SKILLS",
  interpersonal_skills: "INTERPERSONAL SKILLS",
  work_under_pressure: "WORK UNDER PRESSURE",
  wisdom_common_sense: "WISDOM COMMON SENSE",
};

export const personalDataConstants = {
  personal_data: "PERSONAL DATA",
  enrichment_center: "ENRICHMENT CENTER",
};

interface Location {
  name: string;
  id: number | string;
}

export const linkedinLocationGeoIds: { [key: string]: Location[] } = {
  at: [
    { name: "Austria", id: 103883259 },
    { name: "Vienna, Austria", id: 104916553 },
    { name: "Graz, Austria", id: 101257974 },
  ],
  hu: [
    { name: "Hungary", id: 100288700 },
    { name: "Budapest, Hungary", id: 104291169 },
    { name: "Debrecen, Hungary", id: 106661877 },
  ],
  bg: [
    { name: "Bulgaria", id: 105333783 },
    { name: "Sofia, Bulgaria", id: 103835801 },
    { name: "Plovdiv, Bulgaria", id: 100783188 },
  ],
  be: [
    { name: "Belgium", id: 100565514 },
    { name: "Brussels, Belgium", id: 100432943 },
    { name: "Antwerp, Belgium", id: 105102075 },
  ],
  fr: [
    { name: "France", id: 105015875 },
    { name: "Paris, France", id: 106383538 },
    { name: "Marseille, France", id: 103857854 },
  ],
  es: [
    { name: "Spain", id: 105646813 },
    { name: "Madrid, Spain", id: 100994331 },
    { name: "Barcelona, Spain", id: 107025191 },
  ],
  sk: [
    { name: "Slovakia", id: 103119917 },
    { name: "Bratislava, Slovakia", id: 90010246 },
    { name: "Košice, Slovakia", id: 105543012 },
  ],
  si: [
    { name: "Slovenia", id: 106137034 },
    { name: "Ljubljana, Slovenia", id: 100564415 },
    { name: "Maribor, Slovenia", id: 106499531 },
  ],
  hr: [
    { name: "Croatia", id: 104688944 },
    { name: "Zagreb, Croatia", id: 102392231 },
    { name: "Split, Croatia", id: 105620189 },
  ],
  cz: [
    { name: "Czechia", id: 104508036 },
    { name: "Prague, Czechia", id: 103973174 },
    { name: "Brno, Czechia", id: 101164731 },
  ],
  nl: [
    { name: "Netherlands", id: 102890719 },
    { name: "Amsterdam, Netherlands", id: 102011674 },
    { name: "Rotterdam, Netherlands", id: 100467493 },
  ],
  de: [
    { name: "Germany", id: 101282230 },
    { name: "Berlin, Germany", id: 106967730 },
    { name: "Hamburg, Germany", id: 106430557 },
  ],
  dk: [
    { name: "Denmark", id: 104514075 },
    { name: "Copenhagen, Denmark", id: 102194656 },
    { name: "Aarhus, Denmark", id: 107956996 },
  ],
  fi: [
    { name: "Finland", id: 100456013 },
    { name: "Helsinki, Finland", id: 106591199 },
    { name: "Espoo, Finland", id: 107130126 },
  ],
  se: [
    { name: "Sweden", id: 105117694 },
    { name: "Stockholm, Sweden", id: 100907646 },
    { name: "Gothenburg, Sweden", id: 104114836 },
  ],
  ee: [
    { name: "Estonia", id: 102974008 },
    { name: "Tallinn, Estonia", id: 104199723 },
    { name: "Tartu, Estonia", id: 111098841 },
  ],
  pt: [
    { name: "Portugal", id: 100364837 },
    { name: "Lisbon, Portugal", id: 100092973 },
    { name: "Porto, Portugal", id: 100108932 },
  ],
  lt: [
    { name: "Lithuania", id: 101464403 },
    { name: "Vilnius, Lithuania", id: 101060073 },
    { name: "Kaunas, Lithuania", id: 106306438 },
  ],
  lv: [
    { name: "Latvia", id: 104341318 },
    { name: "Riga, Latvia", id: 101869288 },
    { name: "Daugavpils, Latvia", id: 105512250 },
  ],
  gr: [
    { name: "Greece", id: 104677530 },
    { name: "Athens, Greece", id: 103077496 },
    { name: "Thessaloniki, Greece", id: 107227464 },
  ],
  it: [
    { name: "Italy", id: 103350119 },
    { name: "Rome, Italy", id: 106398949 },
    { name: "Milan, Italy", id: 100881402 },
  ],
};
