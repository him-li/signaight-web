import React from "react";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";
import { Layout, LayoutProps, OwnPropsOfLayout } from "@jsonforms/core";

const MainLayout = (
  props: LayoutProps & OwnPropsOfLayout & { uischema: Layout },
) => {
  const { uischema, schema, path, visible, renderers, cells } = props;
  if (!visible) {
    return null;
  }

  const itemsToRender = uischema.elements.map((element, index: number) => {
    return (
      <React.Fragment key={index + element.type}>
        <JsonFormsDispatch
          schema={schema}
          uischema={element}
          path={path}
          enabled={true}
          renderers={renderers}
          cells={cells}
          key={index}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="flex flex-col w-full h-full sticky top-0 z-20">
      <>{itemsToRender}</>
    </div>
  );
};

export default withJsonFormsLayoutProps(MainLayout);
