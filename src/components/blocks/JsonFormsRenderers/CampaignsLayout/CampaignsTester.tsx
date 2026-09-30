import { rankWith, uiTypeIs } from "@jsonforms/core";

export const CampaignsLayoutTester = rankWith(
  1000,
  uiTypeIs("CampaignsLayout"),
);
