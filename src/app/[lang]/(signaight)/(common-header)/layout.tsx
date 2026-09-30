import type { ReactNode } from "react";
import JsonSchemaWrapper from "@/components/blocks/servers/JsonSchemaWrapper/JsonSchemaWrapper";
import Navbar from "@/components/blocks/signaight/Navbar";

export default async function CommonHeaderLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <>
      <Navbar />
      <JsonSchemaWrapper
        lang={lang}
        type="layout"
        template={[
          "riskmatrix",
          "screening",
          "analysis-uuid",
          "profile",
          "details-uuid",
        ]}
      >
        {children}
      </JsonSchemaWrapper>
    </>
  );
}
