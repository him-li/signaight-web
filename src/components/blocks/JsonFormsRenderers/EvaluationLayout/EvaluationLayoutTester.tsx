import { rankWith, uiTypeIs } from "@jsonforms/core";

export const EvaluationLayoutTester = rankWith(
  1000,
  uiTypeIs("EvaluationLayout"),
);
