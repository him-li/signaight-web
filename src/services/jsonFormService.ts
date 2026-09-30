/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonSchema, UISchemaElement } from "@jsonforms/core";
import { createCache } from "./cache/cacheService";
const cache = createCache();

export type ISchemaResponse = {
  schema?: JsonSchema;
  uischema?: UISchemaElement;
};

export type IJsonSchemaParams = {
  pageName:
    | "campaigns-uuid-evaluation-uuid"
    | "campaigns"
    | "campaigns-uuid"
    | "campaigns-uuid-applicants"
    | "campaigns-uuid-search"
    | "campaigns-uuid-settings"
    | "root"
    | "settings"
    | "riskmatrix"
    | "screening"
    | "analysis-uuid"
    | "details-uuid"
    | "profile";
  type: "layout" | "page";
  layoutName: string;
};

class JsonFormService {
  private static instance: JsonFormService;

  constructor() {
    if (!JsonFormService.instance) {
      JsonFormService.instance = this;
    }
    return JsonFormService.instance;
  }

  private async makeKey(params: IJsonSchemaParams) {
    return `jsonforms:${params.layoutName}:${params.pageName}:${params.type}:uischema`;
  }

  async set({
    value,
    pageName,
    type,
    layoutName,
  }: IJsonSchemaParams & { value: string }) {
    const key = await this.makeKey({ pageName, type, layoutName });
    await cache?.set(key, value);
  }

  async get({
    pageName,
    type,
    layoutName,
  }: IJsonSchemaParams): Promise<ISchemaResponse> {
    const isServer = typeof window === "undefined";
    if (isServer) {
      const key = (await this.makeKey({ pageName, type, layoutName })) + "v2";

      // 1) Try cache
      const cached = await cache?.get(key);
      if (cached) {
        try {
          const uischema = JSON.parse(cached) as UISchemaElement;
          return {
            uischema,
            schema: {
              type: "object",
              properties: {},
              required: [],
            } as JsonSchema,
          };
        } catch {
          // fall through to fs import on parse error
        }
      }

      // Dynamic import stays server-side (server-only above)
      const { default: uischema } = await import(
        `../schemas/${layoutName}/${pageName}/${type}/uischema.json`,
        { assert: { type: "json" } }
      );

      // 3) Write-through to cache (no TTL or add TTL if you prefer)
      await cache?.set(key, JSON.stringify(uischema));

      return {
        uischema,
        schema: {
          type: "object",
          properties: {},
          required: [],
        } as JsonSchema,
      };
    }

    const { default: uischema } = await import(
      `../schemas/${layoutName}/${pageName}/${type}/uischema.json`,
      { assert: { type: "json" } }
    );
    return {
      uischema,
      schema: {
        type: "object",
        properties: {},
        required: [],
      } as JsonSchema,
    };
  }
}

const JSON_FORM_SERVICE_KEY = Symbol.for("json_form_service");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasCache = globalSymbols.indexOf(JSON_FORM_SERVICE_KEY) > -1;
if (!hasCache) {
  (global as any)[JSON_FORM_SERVICE_KEY] = new JsonFormService();
}

const singleton = { instance: {} as JsonFormService | undefined };
Object.defineProperty(singleton, "instance", {
  get: function () {
    return (global as any)[JSON_FORM_SERVICE_KEY];
  },
});

Object.freeze(singleton);

export default singleton;
