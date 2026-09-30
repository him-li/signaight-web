export const getErrorUiSchema = (message: string) => {
  return {
    uischema: {
      type: "MainLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/error",
          label: "Error",
          options: {
            error: {
              message,
            },
          },
        },
      ],
    },
    schema: {
      type: "object",
      properties: {},
      required: [],
    },
  };
};
