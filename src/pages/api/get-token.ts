import type { NextApiRequest, NextApiResponse } from "next";
import { SESSION_COOKIE_NAME } from "@/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies[SESSION_COOKIE_NAME];
  if (!token) return res.status(401).json({ detail: "Not authenticated" });
  return res.status(200).json({ access_token: token });
}
