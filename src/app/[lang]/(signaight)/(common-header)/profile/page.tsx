import type { Metadata } from "next";
import JsonSchemaWrapper from "@/components/blocks/servers/JsonSchemaWrapper/JsonSchemaWrapper";

export const metadata: Metadata = {
  title: `Profile`,
  description: `User profile`,
};

export default async function ProfilePage(props: {
  params: { lang: string; campaignId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = await props.params;
  return <JsonSchemaWrapper lang={lang} type="page" template="profile" />;
}
