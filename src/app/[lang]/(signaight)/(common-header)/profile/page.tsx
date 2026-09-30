import type { Metadata } from "next";
import SettingsDash from "@/components/blocks/SettingsDash";

export const metadata: Metadata = {
  title: `Profile`,
  description: `User profile`,
};

export default function ProfilePage() {
  return <SettingsDash />;
}
