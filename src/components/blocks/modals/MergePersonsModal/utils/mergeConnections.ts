import type { Person } from "@/types/person/index.interface";
import { Connections } from "@/types/person/connections.interface";
import { uniqueBy } from "./uniqueBy";

export function mergeConnections(persons: Person[]): Connections | undefined {
  const facebookFriends = uniqueBy(
    persons.flatMap((p) => p.connections?.friends?.facebook ?? []),
    (f) => f.facebook_user_id,
  );

  const facebookFollowing = uniqueBy(
    persons.flatMap((p) => p.connections?.following?.facebook ?? []),
    (f) => f.facebook_user_id,
  );

  const instagramFollowing = uniqueBy(
    persons.flatMap((p) => p.connections?.following?.instagram ?? []),
    (f) => f.instagram_user_id,
  );

  if (
    !facebookFriends.length &&
    !facebookFollowing.length &&
    !instagramFollowing.length
  ) {
    return undefined;
  }

  return {
    friends: {
      facebook: facebookFriends,
    },
    following: {
      facebook: facebookFollowing,
      instagram: instagramFollowing,
    },
  };
}
