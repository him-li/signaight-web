import type { Person } from "@/types/person/index.interface";
import { Interests } from "@/types/person/interests.interface";
import { uniqueBy } from "./uniqueBy";

export function mergeInterests(persons: Person[]): Interests | undefined {
  const pages = uniqueBy(
    persons.flatMap((p) => p.interests?.pages ?? []),
    (p) => p.fb_page_name || p.fb_page_url,
  );

  const xingHobbies = Array.from(
    new Set(persons.flatMap((p) => p.interests?.xing_interests_hobbies ?? [])),
  );

  const followedHashtags = Object.assign(
    {},
    ...persons.map((p) => p.interests?.followed_hashtags).filter(Boolean),
  );

  const groups = uniqueBy(
    persons.flatMap((p) => p.interests?.groups?.telegram_groups ?? []),
    (g) =>
      (g.telegram_public_group_id ||
        g.telegram_public_group_screen_name ||
        g.title) as string,
  );

  if (
    !pages.length &&
    !xingHobbies.length &&
    !Object.keys(followedHashtags).length &&
    !Object.keys(groups).length
  ) {
    return undefined;
  }

  return {
    pages: pages.length ? pages : undefined,
    followed_hashtags: Object.keys(followedHashtags).length
      ? followedHashtags
      : undefined,
    groups: { telegram_groups: groups },
    xing_interests_hobbies: xingHobbies.length ? xingHobbies : undefined,
  };
}
