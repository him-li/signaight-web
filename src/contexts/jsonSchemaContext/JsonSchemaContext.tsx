"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { JsonSchemaReducer, initJsonSchemaState } from "./reducer";
import {
  JsonSchemaContextProps,
  JsonSchemaContextTypes,
  JsonSchemaProviderProps,
} from "./types";
import { ISchemaResponse } from "@/services/jsonFormService";
import { prepearPageName } from "@/utils/prepearNameSchema";
import { getErrorUiSchema } from "@/utils/getErrorUischema";
import { ROUTES } from "@/constants/routes";
import { getSchema } from "@/utils/getSchema";

const JsonSchemaStateContext = React.createContext<JsonSchemaContextProps>({
  ...initJsonSchemaState,
});

const JsonSchemaProvider: React.FC<
  PropsWithChildren<JsonSchemaProviderProps>
> = ({ children, lang, type, schema, uischema, layoutName }) => {
  const pathname = usePathname();
  const router = useRouter();
  const pageName = prepearPageName(pathname!, lang);

  const [state, dispatch] = React.useReducer(
    JsonSchemaReducer,
    initJsonSchemaState,
  );

  useEffect(() => {
    if (uischema) {
      dispatch({
        type: JsonSchemaContextTypes.SET_CURRENT_SCHEMA,
        payload: { data: schema },
      });
      dispatch({
        type: JsonSchemaContextTypes.SET_CURRENT_UI_SCHEMA,
        payload: { data: uischema },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uischema]);

  const setLayout = useCallback((result: ISchemaResponse | undefined) => {
    dispatch({
      type: JsonSchemaContextTypes.SET_CURRENT_SCHEMA,
      payload: { data: result?.schema },
    });
    dispatch({
      type: JsonSchemaContextTypes.SET_CURRENT_UI_SCHEMA,
      payload: { data: result?.uischema },
    });
  }, []);

  const getLayout = useCallback(async () => {
    if (pathname) {
      let result = await getSchema({ pageName, type, layoutName });
      if (!result) {
        result = await getSchema({ pageName, type, layoutName });
      }
      return result;
    }
    return undefined;
  }, [pageName, pathname, type, layoutName]);

  useEffect(() => {
    const getData = async () => {
      let layout = await getLayout();
      if (!layout) {
        if (pathname === ROUTES.HOME) {
          layout = getErrorUiSchema(
            "Something went wrong when try to get layout. Please try again later.",
          );
        } else {
          router.push(ROUTES.HOME);
          return;
        }
      }
      setLayout(layout);
    };
    if (!uischema) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const value = useMemo(() => state, [state]);

  return (
    <JsonSchemaStateContext.Provider value={value}>
      {children}
    </JsonSchemaStateContext.Provider>
  );
};

function useJsonSchemaState() {
  const context = React.useContext(JsonSchemaStateContext);
  if (context === undefined) {
    throw new Error(
      "useJsonSchemaState must be used within a JsonSchemaProvider",
    );
  }
  return context;
}

export default JsonSchemaProvider;

export { useJsonSchemaState };
