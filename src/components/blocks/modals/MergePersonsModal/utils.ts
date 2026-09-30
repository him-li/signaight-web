/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person } from "@/types/person/index.interface";
import { GroupedFields, MergeField } from "./PersonMergeTable/types";
import { PersonMeta, Side } from "./types";

export function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function hasEntityArrays(obj: Record<string, any>): boolean {
  return Object.values(obj).some(
    (v) => Array.isArray(v) && v.length > 0 && isPlainObject(v[0]),
  );
}

export function toHumanTitle(value: string): string {
  const lastValue = value?.split(".")?.at(-1);
  return (
    lastValue
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      ?.replace("F Name", "First Name")
      ?.replace("L Name", "Last Name")
      ?.replace("Fb", "") || ""
  );
}

export const ENTITY_ARRAY_KEYS = new Set([
  "linkedin_schools",
  "facebook_schools",
  "xing_schools",
  "linkedin_work",
  "facebook_work",
  "xing_work",
  "email_address",
  "phones",
  "check_ins",
  "nationality",
  "additional_details",
  "volunteer_experience",
  "facebook_family_members",
  "geo_trace",
  "pages",
  "posts",
  "languages",
  "associated_email",
  "associated_phones",
  "discovery_phones",
  "apple_phone_part",
  "ebay_phone_part",
  "microsoft_phone_part",
  "linkedin_phone_numbers",
  "fb_phones",
  "misc",
  "linkedin_interests",
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
type FlatEntry = {
  path: string;
  value: unknown;
};

export function getNestedKeysWithValuesAndArrays(
  obj: unknown,
  parentKey = "",
  result: FlatEntry[] = [],
): FlatEntry[] {
  if (Array.isArray(obj)) {
    const lastKey = parentKey.split(".").at(-1);

    if (lastKey && ENTITY_ARRAY_KEYS.has(lastKey)) {
      result.push({ path: parentKey, value: obj });
      return result;
    }

    obj.forEach((item, index) => {
      getNestedKeysWithValuesAndArrays(item, `${parentKey}[${index}]`, result);
    });
    return result;
  }

  if (obj !== null && typeof obj === "object") {
    const lastKey = parentKey.split(".").at(-1);
    if (lastKey && ENTITY_ARRAY_KEYS.has(lastKey)) {
      result.push({ path: parentKey, value: obj });
      return result;
    }
    for (const key of Object.keys(obj)) {
      const path = parentKey ? `${parentKey}.${key}` : key;
      getNestedKeysWithValuesAndArrays(
        (obj as Record<string, any>)[key],
        path,
        result,
      );
    }
    return result;
  }
  if (obj) {
    // primitive
    result.push({ path: parentKey, value: obj });
  }
  return result;
}

export function buildMergeFields(
  persons: { path: string; value: unknown }[][],
): MergeField[] {
  if (!persons || persons.length < 2) {
    return [];
  }
  const firstMap = new Map(persons[0]?.map((i) => [i.path, i.value]));
  const secondMap = new Map(persons[1]?.map((i) => [i.path, i.value]));
  if (persons?.[2]) {
    const thirdMap = new Map(persons[2]?.map((i) => [i.path, i.value]) ?? []);
    const paths = new Set([
      ...Array.from(firstMap.keys()),
      ...Array.from(secondMap.keys()),
      ...Array.from(thirdMap.keys()),
    ]);

    return Array.from(paths).map((path) => ({
      path,
      firstValue: firstMap.get(path),
      secondValue: secondMap.get(path),
      thirdValue: thirdMap.get(path),
    }));
  }

  const paths = new Set([
    ...Array.from(firstMap.keys()),
    ...Array.from(secondMap.keys()),
  ]);

  return Array.from(paths).map((path) => ({
    path,
    firstValue: firstMap.get(path),
    secondValue: secondMap.get(path),
    withoutThird: true,
  }));
}

export const LEVEL1_LABELS: Record<string, string> = {
  network_signature: "Network signature",
  personal_details: "Personal details",
  search_state: "Search state",
  link_analysis: "Link analysis",
  recruiting_source: "Recruiting source",
  biographic_details: "Biographic details",
  last_update: "Last update",
};

export const LEVEL2_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  location: "Location",
  visuals: "Visuals",
  websites: "Websites",
  username: "Username",
  url: "URLs",
  user_id: "User IDs",
  matched_profiles: "Matched profiles",
};

export function groupMergeFields2Level(fields: MergeField[]): GroupedFields {
  const groups: GroupedFields = {};

  for (const field of fields) {
    const parts = field.path.split(".");

    const level1 = parts[0] ?? "other";
    const level2 = parts[1] ?? "general";

    if (!groups[level1]) groups[level1] = {};
    if (!groups[level1][level2]) groups[level1][level2] = [];

    groups[level1][level2].push(field);
  }
  return groups;
}

export function formatLabel(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function isImageUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)(\?.*)?)$/i.test(value)
  );
}

export function isLinkUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isEmpty(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function buildInitialSelection(
  fields: MergeField[],
  personsMeta: Record<Side, PersonMeta>,
): Record<string, Side> {
  const selection: Record<string, Side> = {};

  for (const field of fields) {
    const candidates: Side[] = [];

    if (!isEmpty(field.firstValue)) candidates.push("first");
    if (!isEmpty(field.secondValue)) candidates.push("second");
    if (!isEmpty(field.thirdValue)) candidates.push("third");

    // 1️⃣ No values → default
    if (candidates.length === 0) {
      selection[field.path] = "first";
      continue;
    }

    // 2️⃣ Only one value → select it
    if (candidates.length === 1) {
      selection[field.path] = candidates[0];
      continue;
    }

    // 3️⃣ Conflict → choose most recently updated person
    let latestSide = candidates[0];
    let latestTime = personsMeta[latestSide]?.lastUpdated
      ? new Date(personsMeta[latestSide].lastUpdated!)
      : new Date();

    for (const side of candidates.slice(1)) {
      const time = personsMeta[side]?.lastUpdated
        ? new Date(personsMeta[side].lastUpdated!)
        : new Date();
      if (time > latestTime) {
        latestSide = side;
        latestTime = time;
      }
    }

    selection[field.path] = latestSide;
  }

  return selection;
}

export function buildBulkSelection(
  fields: MergeField[],
  side: Side,
): Record<string, Side> {
  const next: Record<string, Side> = {};

  for (const field of fields) {
    next[field.path] = side;
  }

  return next;
}

function parsePath(path: string): (string | number)[] {
  const parts: (string | number)[] = [];

  path.split(".").forEach((segment) => {
    const matches = segment.match(/([^\[\]]+)|\[(\d+)\]/g);
    if (!matches) return;

    for (const m of matches) {
      if (m.startsWith("[")) {
        parts.push(Number(m.slice(1, -1)));
      } else {
        parts.push(m);
      }
    }
  });

  return parts;
}

function ensureFullName(person: Person) {
  const name = person?.personal_details?.name;
  if (!name) return;

  // If full_name already exists → do nothing
  if (name.full_name?.full_name) return;

  const fName = name.first_name?.f_name;
  const lName = name.last_name?.l_name;

  if (!fName && !lName) return;

  const full = [fName, lName].filter(Boolean).join(" ");

  if (!name.full_name) {
    name.full_name = {
      full_name: "",
    };
  }

  name.full_name.full_name = full;
}

export function unflattenToObject(flat: Record<string, any>): Person {
  const result: Person = {} as Person;

  for (const [path, value] of Object.entries(flat)) {
    const keys = parsePath(path);

    let current: any = result;

    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;

      if (isLast) {
        current[key] = value;
        return;
      }

      const nextKey = keys[index + 1];

      if (current[key] === undefined) {
        // decide object vs array
        current[key] = typeof nextKey === "number" ? [] : {};
      }

      current = current[key];
    });
  }

  ensureFullName(result);

  return result;
}
