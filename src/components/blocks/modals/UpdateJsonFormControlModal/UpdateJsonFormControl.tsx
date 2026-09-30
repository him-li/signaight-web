import { Checkbox, TextField, Label, Input, FieldError } from "@heroui/react";
import { ControlProps } from "@jsonforms/core";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Field_is_required } from "@/constants";

type Props = ControlProps;

const UI_SCHEMA_FORM_NAME = "uischema.elements";

export default function UpdateJsonFormControl(props: Props) {
  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: UI_SCHEMA_FORM_NAME,
  });
  const index = fields.findIndex(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => item.scope === props.uischema.scope,
  );
  return (
    <>
      <Controller
        name={`${UI_SCHEMA_FORM_NAME}.${index}.label`}
        control={control}
        render={({ field }) => (
          <TextField
            id={`${UI_SCHEMA_FORM_NAME}.${index}.label`}
            aria-label={`${UI_SCHEMA_FORM_NAME}.${index}.label`}
            isRequired
            {...register(`${UI_SCHEMA_FORM_NAME}.${index}.label`, {
              required: Field_is_required,
              minLength: {
                value: 2,
                message: "Minimum length should be 2",
              },
            })}
            isInvalid={!!errors[`${UI_SCHEMA_FORM_NAME}.${index}.label`]}
            {...field}
          >
            <Label>Label:</Label>
            <Input placeholder="Enter your email" />
            <FieldError>
              {
                (errors[`${UI_SCHEMA_FORM_NAME}.${index}.label`]
                  ? // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                    errors[`${UI_SCHEMA_FORM_NAME}.${index}.label`]?.message!
                  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    "") as any
              }
            </FieldError>
          </TextField>
        )}
      />
      {props?.uischema?.options?.pagination && (
        <Controller
          name={`${UI_SCHEMA_FORM_NAME}.${index}.options.pagination.available`}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={`${UI_SCHEMA_FORM_NAME}.${index}.options.pagination.available`}
              aria-label={`${UI_SCHEMA_FORM_NAME}.${index}.options.pagination.available`}
              isRequired
              isSelected={
                getValues()[
                  `${UI_SCHEMA_FORM_NAME}.${index}.options.pagination.available`
                ]
              }
              {...register(
                `${UI_SCHEMA_FORM_NAME}.${index}.options.pagination.available`,
              )}
              {...field}
            >
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label htmlFor="option">Pagination Available</Label>
              </Checkbox.Content>
            </Checkbox>
          )}
        />
      )}
    </>
  );
}
