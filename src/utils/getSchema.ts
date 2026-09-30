import JsonSchemaService, {
  IJsonSchemaParams,
} from "@/services/jsonFormService";
const jsonSchemaService = JsonSchemaService.instance;

export async function getSchema({
  pageName,
  type,
  layoutName,
}: IJsonSchemaParams) {
  try {
    const jsonSchema = await jsonSchemaService?.get({
      pageName,
      type,
      layoutName,
    });
    return jsonSchema;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return undefined;
  }
}
