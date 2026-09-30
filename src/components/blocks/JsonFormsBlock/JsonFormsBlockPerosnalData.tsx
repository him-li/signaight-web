"use client";
import React, { useMemo } from "react";
import { JsonForms } from "@jsonforms/react";
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers";
import { useJsonSchemaState } from "@/contexts/jsonSchemaContext/JsonSchemaContext";
import PersonalDetails from "@/components/blocks/JsonFormsRenderers/PersonalDetails/PersonalDetails";
import PersonalDetailsTester from "@/components/blocks/JsonFormsRenderers/PersonalDetails/PersonalDetailsTester";
import { PersonalDataLayoutTerster } from "../JsonFormsRenderers/PersonalDataLayout/PersonalDataLayoutTester";
import PersonalDataLayout from "../JsonFormsRenderers/PersonalDataLayout/PersonalDataLayout";
import WorkExperienceTester from "../JsonFormsRenderers/WorkExperience/WorkExperienceTester";
import WorkExperienceWithJsonForms from "../JsonFormsRenderers/WorkExperience/WorkExperience";
import OnlineFootprintRenderer from "../JsonFormsRenderers/OnlineFootprint/OnlineFootprintRenderer";
import OnlineFootprintTester from "../JsonFormsRenderers/OnlineFootprint/OnlineFootprintTester";
import VolunteerExperienceTester from "../JsonFormsRenderers/VolunteerExperienceRenderer/VolunteerExperienceTester";
import VolunteerExperienceRenderer from "../JsonFormsRenderers/VolunteerExperienceRenderer/VolunteerExperienceRenderer";
import EducationTester from "../JsonFormsRenderers/EducationRenderer/EducationTester";
import EducationRenderer from "../JsonFormsRenderers/EducationRenderer/EducationRenderer";
import HonorsAwardsTester from "../JsonFormsRenderers/HonorsAwardsRenderer/HonorsAwardsTester";
import HonorsAwardsRenderer from "../JsonFormsRenderers/HonorsAwardsRenderer/HonorsAwardsRenderer";
import { getSchema } from "./utils";

const renderers = [
  ...vanillaRenderers,
  { tester: PersonalDetailsTester, renderer: PersonalDetails },
  { tester: PersonalDataLayoutTerster, renderer: PersonalDataLayout },
  { tester: WorkExperienceTester, renderer: WorkExperienceWithJsonForms },
  { tester: OnlineFootprintTester, renderer: OnlineFootprintRenderer },
  { tester: VolunteerExperienceTester, renderer: VolunteerExperienceRenderer },
  { tester: EducationTester, renderer: EducationRenderer },
  { tester: HonorsAwardsTester, renderer: HonorsAwardsRenderer },
];

export default function JsonFormsBlockPerosnalData() {
  const { schema, uischema } = useJsonSchemaState();
  const actualSchema = useMemo(
    () => getSchema(uischema!, "PersonalDataLayout"),
    [uischema],
  );
  return (
    <JsonForms
      schema={schema}
      uischema={actualSchema}
      data={{}}
      renderers={renderers}
      cells={vanillaCells}
      onChange={() => {}}
    />
  );
}
