"use client";
import dynamic from "next/dynamic";
import { JsonForms } from "@jsonforms/react";
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers";
import { useJsonSchemaState } from "@/contexts/jsonSchemaContext/JsonSchemaContext";

//testers
import NavbarTester from "@/components/blocks/signaight/JsonFormsRenderers/NavbarRenderer/NavbarTester";
import AnalysisTester from "@/components/blocks/signaight/JsonFormsRenderers/AnalysisRenderer/AnalysisTester";
import RiskMatrixTester from "@/components/blocks/signaight/JsonFormsRenderers/RiskMatrixRenderer/RiskMatrixTester";
import ScreeningTester from "@/components/blocks/signaight/JsonFormsRenderers/ScreeningRenderer/ScreeningTester";
import { MainLayoutTester } from "@/components/blocks/JsonFormsRenderers/MainLayout/MainLayoutTester";
import CapitolBackgroundSloganTester from "@/components/blocks/JsonFormsRenderers/CapitolBackgroundSloganRenderer/CapitolBackgroundSloganTester";
import ErrorTester from "@/components/blocks/JsonFormsRenderers/ErrorRenderer/ErrorTester";
import ErrorRenderer from "@/components/blocks/JsonFormsRenderers/ErrorRenderer/ErrorRenderer";
import { CampaignsLayoutTester } from "@/components/blocks/JsonFormsRenderers/CampaignsLayout/CampaignsTester";
import SettingsDashTester from "@/components/blocks/JsonFormsRenderers/SettingsDashRenderer/SettingsDashTester";
import SettingsDashRenderer from "@/components/blocks/JsonFormsRenderers/SettingsDashRenderer/SettingsDashRenderer";
import DetailsTester from "@/components/blocks/signaight/JsonFormsRenderers/DetailsRenderer/DetailsTester";

//renderers
const CampaignsLayout = dynamic(
  () =>
    import("@/components/blocks/JsonFormsRenderers/CampaignsLayout/CampaignsLayout"),
  {
    loading: () => null,
    ssr: false,
  },
);
const NavbarRenderer = dynamic(
  () =>
    import("@/components/blocks/signaight/JsonFormsRenderers/NavbarRenderer/NavbarRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const AnalysisRenderer = dynamic(
  () =>
    import("@/components/blocks/signaight/JsonFormsRenderers/AnalysisRenderer/AnalysisRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const DetailsRenderer = dynamic(
  () =>
    import("@/components/blocks/signaight/JsonFormsRenderers/DetailsRenderer/DetailsRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const RiskMatrixRenderer = dynamic(
  () =>
    import("@/components/blocks/signaight/JsonFormsRenderers/RiskMatrixRenderer/RiskMatrixRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const ScreeningRenderer = dynamic(
  () =>
    import("@/components/blocks/signaight/JsonFormsRenderers/ScreeningRenderer/ScreeningRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const MainLayout = dynamic(
  () => import("@/components/blocks/JsonFormsRenderers/MainLayout/MainLayout"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CapitolBackgroundSloganRenderer = dynamic(
  () =>
    import("@/components/blocks/JsonFormsRenderers/CapitolBackgroundSloganRenderer/CapitolBackgroundSloganRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);

const renderers = [
  ...vanillaRenderers,
  { tester: MainLayoutTester, renderer: MainLayout },
  {
    tester: CapitolBackgroundSloganTester,
    renderer: CapitolBackgroundSloganRenderer,
  },
  { tester: NavbarTester, renderer: NavbarRenderer },
  { tester: AnalysisTester, renderer: AnalysisRenderer },
  { tester: RiskMatrixTester, renderer: RiskMatrixRenderer },
  { tester: ScreeningTester, renderer: ScreeningRenderer },
  { tester: ErrorTester, renderer: ErrorRenderer },
  { tester: CampaignsLayoutTester, renderer: CampaignsLayout },
  { tester: SettingsDashTester, renderer: SettingsDashRenderer },
  { tester: DetailsTester, renderer: DetailsRenderer },
];

export default function JsonFormsBlock() {
  const { schema, uischema } = useJsonSchemaState();
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={{}}
      renderers={renderers}
      cells={vanillaCells}
      onChange={() => {}}
    />
  );
}
