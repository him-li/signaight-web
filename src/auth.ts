import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "user_session";

export type UserInfo = {
  sub: string;
  id?: string;
  email: string;
  given_name?: string;
  family_name?: string;
  is_active?: boolean;
  email_verified?: boolean;
  permissions: string[];
};

export function decodeUserInfo(token?: string): UserInfo | null {
  if (!token) return null;
  try {
    const encoded = token.split(".")[1];
    const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(Buffer.from(normalized, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return { token: token ?? null, userinfo: decodeUserInfo(token) };
}
