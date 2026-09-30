import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { JsonSchemaProviderProps } from "@/contexts/jsonSchemaContext/types";
import { headers } from "next/headers";
import { PAGE_PATH_HEADER } from "@/constants/routes";
import { prepearPageName } from "@/utils/prepearNameSchema";
import { IJsonSchemaParams, ISchemaResponse } from "@/services/jsonFormService";
import { SIGNAIGHT_LAYOUT_KEY } from "@/constants/layouts";
import { getSchema } from "@/utils/getSchema";

const JsonSchemaProvider = dynamic(
  () => import("@/contexts/jsonSchemaContext/JsonSchemaContext"),
);
const JsonSignAIghtFormsBlock = dynamic(
  () => import("@/components/blocks/signaight/JsonFormsBlock/JsonFormsBlock"),
);

const renderBlocks = {
  [SIGNAIGHT_LAYOUT_KEY]: <JsonSignAIghtFormsBlock />,
};

const JsonSchemaWrapper = async (
  props: Omit<JsonSchemaProviderProps, "layoutName"> & {
    children?: ReactNode;
    template: IJsonSchemaParams["pageName"] | IJsonSchemaParams["pageName"][];
  },
) => {
  const start = performance.now();
  const headersdata = await headers();
  const pathname = headersdata.get(PAGE_PATH_HEADER)!;
  const pageName = prepearPageName(pathname!, props.lang);
  const layoutType = SIGNAIGHT_LAYOUT_KEY;
  const type = props.type;
  let result: ISchemaResponse | undefined = undefined;

  const template =
    typeof props.template === "string"
      ? props.template
      : props.template.find((item) => pageName.startsWith(item));

  if (!template || (template && !pageName.startsWith(template))) {
    return props.children || null;
  }

  try {
    result = await getSchema({
      pageName: template!,
      type,
      layoutName: layoutType,
    });
    if (!result) {
      result = await getSchema({
        pageName: template!,
        type,
        layoutName: layoutType,
      });
    }
  } catch (error) {
    console.log("ERROR FETCHING SCHEMA:", error);
  }
  const end = performance.now();
  const durationMs = (end - start).toFixed(2);
  console.log("jsonShcemaWrapper durationMs", durationMs);
  return (
    <JsonSchemaProvider
      {...props}
      type={type}
      uischema={result?.uischema}
      schema={result?.schema}
      layoutName={layoutType}
    >
      {(renderBlocks[layoutType as keyof typeof renderBlocks] as ReactNode) ||
        null}
      {props.children}
    </JsonSchemaProvider>
  );
};

export default JsonSchemaWrapper;
