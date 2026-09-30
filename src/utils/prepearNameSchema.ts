import { validate } from "uuid";
import { IJsonSchemaParams } from "@/services/jsonFormService";

export const prepearPageName = (
  pathname: string,
  lang: string,
): IJsonSchemaParams["pageName"] => {
  const path = pathname
    .split("/")
    .filter((it) => it !== lang && it)
    .map((v) => (validate(v) ? "uuid" : v))
    .join("-") as IJsonSchemaParams["pageName"];
  return path ? path : "root";
};
