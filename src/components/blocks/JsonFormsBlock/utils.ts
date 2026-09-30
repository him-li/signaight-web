import { UISchemaElement } from "@jsonforms/core";

type UISchemaElementType = UISchemaElement & {
  elements?: UISchemaElementType[];
};

export const getSchema = (
  data: UISchemaElementType,
  type: "PersonalDataLayout" | "AnalysisLayout" | UISchemaElement["type"],
): UISchemaElementType | undefined => {
  const foundObject = data.type === type;
  if (!foundObject && data.elements) {
    return data.elements.reduce(
      (acc, it) => ({ ...acc, ...getSchema(it, type) }),
      {} as UISchemaElementType,
    );
  }
  if (foundObject) {
    return data;
  }
};
