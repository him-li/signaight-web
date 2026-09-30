import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";
import { Layout, LayoutProps, OwnPropsOfLayout } from "@jsonforms/core";

const PersonalDataLayout = (
  props: LayoutProps & OwnPropsOfLayout & { uischema: Layout },
) => {
  const { uischema, schema, path, visible, renderers, cells } = props;
  if (!visible) {
    return null;
  }
  const chunk = Math.ceil(uischema.elements.length / 2);
  const a1 = uischema.elements.slice(0, chunk);
  const a2 = uischema.elements.slice(chunk, chunk + uischema.elements.length);
  const itemsToRenderLeft = a1.map((element, index: number) => {
    return (
      <div key={index + element.type}>
        <JsonFormsDispatch
          schema={schema}
          uischema={element}
          path={path}
          enabled={true}
          renderers={renderers}
          cells={cells}
          key={index}
        />
      </div>
    );
  });
  const itemsToRenderRight = a2.map((element, index: number) => {
    return (
      <div key={index + element.type}>
        <JsonFormsDispatch
          schema={schema}
          uischema={element}
          path={path}
          enabled={true}
          renderers={renderers}
          cells={cells}
          key={index}
        />
      </div>
    );
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10 w-full px-16 pb-10">
      <div>{itemsToRenderLeft}</div>
      <div>{itemsToRenderRight}</div>
    </div>
  );
};

export default withJsonFormsLayoutProps(PersonalDataLayout);
