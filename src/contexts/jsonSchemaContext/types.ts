import { ActionMap } from "../types";
import { JsonSchema, UISchemaElement } from "@jsonforms/core";

export type JsonSchemaContextProps = {
  schema?: JsonSchema;
  uischema?: UISchemaElement;
};

export enum JsonSchemaContextTypes {
  SET_CURRENT_SCHEMA = "SET_CURRENT_SCHEMA",
  SET_CURRENT_UI_SCHEMA = "SET_CURRENT_UI_SCHEMA",
}

export type JsonSchemaContextPayload = {
  [JsonSchemaContextTypes.SET_CURRENT_SCHEMA]: {
    data: JsonSchemaContextProps["schema"];
  };
  [JsonSchemaContextTypes.SET_CURRENT_UI_SCHEMA]: {
    data: JsonSchemaContextProps["uischema"];
  };
};

export type JsonSchemaActions =
  ActionMap<JsonSchemaContextPayload>[keyof ActionMap<JsonSchemaContextPayload>];

export type JsonSchemaProviderProps = {
  schema?: JsonSchema;
  uischema?: UISchemaElement;
  lang: string;
  type: "layout" | "page";
  layoutName: string;
};
