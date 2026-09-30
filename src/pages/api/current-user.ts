import type { NextApiRequest, NextApiResponse } from "next";
import { decodeUserInfo, SESSION_COOKIE_NAME } from "@/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies[SESSION_COOKIE_NAME];
  const userinfo = decodeUserInfo(token);
  if (!userinfo) return res.status(401).json({ detail: "Not authenticated" });
  return res.status(200).json({ userinfo });
}
