"use client";
import React from "react";
import dynamic from "next/dynamic";
import { JsonForms } from "@jsonforms/react";
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers";
import { useJsonSchemaState } from "@/contexts/jsonSchemaContext/JsonSchemaContext";
import CampaignsHeaderTester from "../JsonFormsRenderers/CampaignsHeaderRenderer/CampaignsHeaderTester";
import CampaignsTableTester from "../JsonFormsRenderers/CampaignsTableRenderer/CampaignsTableTester";
import CampaignsFooterTester from "../JsonFormsRenderers/CampaignsFooterRenderer/CampaignsFooterTester";
import CampaignsTabsTester from "../JsonFormsRenderers/CampaignsTabsRenderer/CampaignsTabsTester";
import CampaignSettingsTester from "../JsonFormsRenderers/CampaignSettingsRenderer/CampaignSettingsTester";
import CampaignsLeaderboardTester from "../JsonFormsRenderers/CampaignsLeaderboardRenderer/CampaignsLeaderboardTester";
import CampaignApplicantsTester from "../JsonFormsRenderers/CampaignApplicantsRenderer/CampaignApplicantsTester";
import CampaignSearchTester from "../JsonFormsRenderers/CampaignSearchRenderer/CampaignSearchTester";
import CampaignEvaluationTester from "../JsonFormsRenderers/CampaignEvaluationRenderer/CampaignEvaluationTester";
import CapitolBackgroundSloganTester from "../JsonFormsRenderers/CapitolBackgroundSloganRenderer/CapitolBackgroundSloganTester";
import SettingsDashTester from "../JsonFormsRenderers/SettingsDashRenderer/SettingsDashTester";
import { MainLayoutTester } from "../JsonFormsRenderers/MainLayout/MainLayoutTester";
import { CampaignsLayoutTester } from "../JsonFormsRenderers/CampaignsLayout/CampaignsTester";
import SignAIghtRootTester from "../JsonFormsRenderers/SignAIghtRootRenderer/SignAIghtRootTester";
import ErrorTester from "../JsonFormsRenderers/ErrorRenderer/ErrorTester";
import ErrorRenderer from "../JsonFormsRenderers/ErrorRenderer/ErrorRenderer";
import EvaluationSidebarTester from "../JsonFormsRenderers/EvaluationSidebarRenderer/EvaluationSidebarTester";

const EvaluationSidebarRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/EvaluationSidebarRenderer/EvaluationSidebarRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignsHeaderRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignsHeaderRenderer/CampaignsHeaderRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignsTableRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignsTableRenderer/CampaignsTableRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignsFooterRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignsFooterRenderer/CampaignsFooterRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignsTabsRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignsTabsRenderer/CampaignsTabsRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignSettingsRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignSettingsRenderer/CampaignSettingsRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignsLeaderboardRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignsLeaderboardRenderer/CampaignsLeaderboardRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignApplicantsRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignApplicantsRenderer/CampaignApplicantsRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignSearchRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignSearchRenderer/CampaignSearchRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignEvaluationRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CampaignEvaluationRenderer/CampaignEvaluationRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CapitolBackgroundSloganRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/CapitolBackgroundSloganRenderer/CapitolBackgroundSloganRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const SettingsDashRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/SettingsDashRenderer/SettingsDashRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);
const MainLayout = dynamic(
  () => import("../JsonFormsRenderers/MainLayout/MainLayout"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CampaignsLayout = dynamic(
  () => import("../JsonFormsRenderers/CampaignsLayout/CampaignsLayout"),
  {
    loading: () => null,
    ssr: false,
  },
);
const SignAIghtRootRenderer = dynamic(
  () =>
    import("../JsonFormsRenderers/SignAIghtRootRenderer/SignAIghtRootRenderer"),
  {
    loading: () => null,
    ssr: false,
  },
);

const renderers = [
  ...vanillaRenderers,
  { tester: CampaignsHeaderTester, renderer: CampaignsHeaderRenderer },
  { tester: CampaignsTableTester, renderer: CampaignsTableRenderer },
  { tester: CampaignsFooterTester, renderer: CampaignsFooterRenderer },
  { tester: CampaignsTabsTester, renderer: CampaignsTabsRenderer },
  { tester: CampaignSettingsTester, renderer: CampaignSettingsRenderer },
  {
    tester: CampaignsLeaderboardTester,
    renderer: CampaignsLeaderboardRenderer,
  },
  { tester: CampaignApplicantsTester, renderer: CampaignApplicantsRenderer },
  { tester: CampaignSearchTester, renderer: CampaignSearchRenderer },
  { tester: CampaignEvaluationTester, renderer: CampaignEvaluationRenderer },
  {
    tester: CapitolBackgroundSloganTester,
    renderer: CapitolBackgroundSloganRenderer,
  },
  { tester: SettingsDashTester, renderer: SettingsDashRenderer },
  { tester: MainLayoutTester, renderer: MainLayout },
  { tester: CampaignsLayoutTester, renderer: CampaignsLayout },
  { tester: SignAIghtRootTester, renderer: SignAIghtRootRenderer },
  { tester: ErrorTester, renderer: ErrorRenderer },
  { tester: EvaluationSidebarTester, renderer: EvaluationSidebarRenderer },
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
