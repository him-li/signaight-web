import { sortingStrings } from ".";

export const searchProjectsQuery = {
  title__like: "",
  description__like: "",
  order_by: sortingStrings.created_at_desc,
};
export const searchPersonsQuery = {
  f_name__like: "",
  l_name__like: "",
  email_address__like: "",
  location__like: "",
  order_by: [
    sortingStrings.signaight_score_desc,
    sortingStrings.f_name_asc,
    sortingStrings.search_state_status_asc,
  ],
  status: "",
  compatibility: "",
  is_favorite: "",
  is_attention: "",
};

export const SEARCH_COUNT = 50;
export const SEARCH_PERSONS_COUNT = 6;
export const SEARCH_APPLICANTS_COUNT = 8;
export const SEARCH_CAMPAIGNS_COUNT = 12;

export const SEARCH_QURIES = {
  PAGE: "page",
  ITEM: "it",
  ORDER_BY: "order_by",
  SCRORE_GTE: "signaight_score__gte",
  SCRORE_LTE: "signaight_score__lte",
  SCRORE_LT: "signaight_score__lt",
  RISK_SCRORE_GTE: "risk_score__gte",
  RISK_SCRORE_LTE: "risk_score__lte",
  RISK_SCRORE_LT: "risk_score__lt",
  STATUS: "status",
  COMPATABILITY: "compatibility",
  FLAGS: "flags__in",
};
