import React from "react";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";
import { Layout, LayoutProps, OwnPropsOfLayout } from "@jsonforms/core";

const EvaluationLayout = (
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
    <div className="flex h-auto w-full relative overflow-visible">
      {itemsToRender}
    </div>
  );
};

export default withJsonFormsLayoutProps(EvaluationLayout);
