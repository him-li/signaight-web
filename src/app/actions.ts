"use server";
import { cookies } from "next/headers";
import { LAYOUT_NAME_COOKIE } from "@/constants";
import { SESSION_COOKIE_NAME } from "@/auth";
import { ROLES } from "@/constants/roles";

export async function createLayoutCookie(value: string) {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set({
    name: LAYOUT_NAME_COOKIE,
    value,
    httpOnly: true,
    path: "/",
  });
}

export async function getAllWatchlistPermissions() {
  "use server";
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const parsedToken = JSON.parse(atob(token?.value?.split(".")[1]!));

  if (parsedToken.permissions.includes(ROLES.SIGNAIGHT_ADMIN)) {
    return true;
  }
  return false;

}
