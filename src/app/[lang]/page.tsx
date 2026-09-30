import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "SignAIght",
  description: "SignAIght",
};

export default async function Home() {
  redirect(ROUTES.SCREENING);
}
