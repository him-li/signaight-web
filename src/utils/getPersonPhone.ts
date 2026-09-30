import type { Phone } from "@/types/person/personal_details/phone.interface";

export type ExtractedPhone = {
  value: string;
  source: string;
};

const EXCLUDED_KEYS = new Set(["associated_phones", "discovery_phones"]);

export function getPersonPhones(phone?: Phone): ExtractedPhone[] {
  if (!phone) return [];

  const rows: ExtractedPhone[] = [];

  for (const [key, value] of Object.entries(phone)) {
    if (!value) continue;
    if (EXCLUDED_KEYS.has(key)) continue;
    if (key.endsWith("_part")) continue;

    let platform = key.split("_")[0];
    if (platform === "fb") platform = "facebook";

    const source = platform.charAt(0).toUpperCase() + platform.slice(1);

    if (Array.isArray(value)) {
      value.forEach((v) => v && rows.push({ value: v, source }));
    } else {
      rows.push({ value, source });
    }
  }

  return rows;
}

export function getPrimaryPhone(phone?: Phone): ExtractedPhone | null {
  const all = getPersonPhones(phone);
  return all.length > 0 ? all[0] : null;
}
