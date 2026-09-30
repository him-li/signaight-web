import type { Person } from "@/types/person/index.interface";
import type { PrimaryCandidateInfo } from "@/types/person/network_signature/matched_profiles.interface";
import type { Platform, RelationshipType, SocialPlatformKey } from "./types";

// ── Connection object builders ─────────────────────────────────────────────

function buildFacebookConnection(info: PrimaryCandidateInfo) {
  console.log("Building Facebook connection with candidate info:", info);
  const profileUrl = Array.isArray(info.profile_url)
    ? (info.profile_url[0] ?? null)
    : (info.profile_url ?? null);
  return {
    facebook_user_id: info.profile_id ?? "",
    facebook_full_name: info.full_name ?? null,
    facebook_profile_url: profileUrl,
    facebook_profile_picture: info.profile_picture ?? null,
  };
}

function buildInstagramConnection(info: PrimaryCandidateInfo) {
  console.log("Building Instagram connection with candidate info:", info);
  return {
    instagram_user_id: info.profile_id ?? "",
    instagram_username: info.profile_username ?? null,
    instagram_full_name: info.full_name ?? null,
    instagram_profile_picture: info.profile_picture ?? null,
  };
}

function buildConnection(
  platform: SocialPlatformKey,
  info: PrimaryCandidateInfo,
) {
  if (platform === "facebook") return buildFacebookConnection(info);
  if (platform === "instagram") return buildInstagramConnection(info);
  return null;
}

// ── Candidate info lookup ──────────────────────────────────────────────────

function getCandidateInfo(
  person: Person | null,
  platform: SocialPlatformKey,
  candidateId: string,
): PrimaryCandidateInfo | null {
  return (
    person?.network_signature?.matched_profiles?.[platform]
      ?.primary_candidate?.[candidateId] ?? null
  );
}

function getFirstCandidateInfo(
  person: Person | null,
  platform: SocialPlatformKey,
): PrimaryCandidateInfo | null {
  const candidates =
    person?.network_signature?.matched_profiles?.[platform]?.primary_candidate;
  if (!candidates) return null;
  const firstId = Object.keys(candidates)[0];
  return firstId ? (candidates[firstId] ?? null) : null;
}

// ── Accumulator helpers ────────────────────────────────────────────────────

type ConnectionsData = Record<string, Record<string, unknown[]>>;

function push(
  target: ConnectionsData,
  category: string,
  platform: string,
  item: object,
) {
  if (!target[category]) target[category] = {};
  if (!target[category][platform]) target[category][platform] = [];
  (target[category][platform] as object[]).push(item);
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Relationship mapping:
 *
 *   friendship    (Facebook only)
 *     → PersonA.friends.facebook   += B  (with picture)
 *     → PersonB.friends.facebook   += A  (with picture)
 *
 *   mutual_follow
 *     → PersonA.followers.{platform} += B
 *     → PersonB.followers.{platform} += A
 *
 *   a_follows_b
 *     → PersonA.following.{platform} += B
 *     → PersonB.followers.{platform} += A
 *
 *   b_follows_a
 *     → PersonB.following.{platform} += A
 *     → PersonA.followers.{platform} += B
 */
export function buildConnectionPatches(
  personA: Person | null,
  personB: Person | null,
  resolvedPlatforms: {
    platform: Platform;
    relationship_type: RelationshipType;
    candidate_id?: string;
  }[],
): { personAData: ConnectionsData; personBData: ConnectionsData } {
  const personAData: ConnectionsData = {};
  const personBData: ConnectionsData = {};

  for (const entry of resolvedPlatforms) {
    const { platform, relationship_type, candidate_id } = entry;

    // LinkedIn has no structured connection model on the backend — skip
    if (!platform) continue;

    const p = platform as SocialPlatformKey;

    const bInfo = getFirstCandidateInfo(personB, p);
    const aInfo = getFirstCandidateInfo(personA, p);

    const bConn = bInfo ? buildConnection(p, bInfo) : null;
    const aConn = aInfo ? buildConnection(p, aInfo) : null;

    console.log(
      `Building connection for platform ${p} with relationship ${relationship_type}, candidate_id ${candidate_id} `,
    );
    console.log("Person A candidate info:", aInfo);
    console.log("Person B candidate info:", bInfo);

    switch (relationship_type) {
      case "friendship":
        // Facebook friends — bidirectional, include profile picture on both sides
        if (p === "facebook") {
          if (bConn) push(personAData, "friends", "facebook", bConn);
          if (aConn) push(personBData, "friends", "facebook", aConn);
        }
        break;

      case "mutual_follow":
        // Both persons gain a follower from the other
        if (bConn) push(personAData, "followers", p, bConn);
        if (aConn) push(personBData, "followers", p, aConn);
        break;

      case "a_follows_b":
        if (bConn) push(personAData, "following", p, bConn);
        if (aConn) push(personBData, "followers", p, aConn);
        break;

      case "b_follows_a":
        if (aConn) push(personBData, "following", p, aConn);
        if (bConn) push(personAData, "followers", p, bConn);
        break;
    }
  }

  return { personAData, personBData };
}
