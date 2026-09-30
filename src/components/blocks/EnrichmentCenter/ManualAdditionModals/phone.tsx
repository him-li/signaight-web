"use client";
import { useEffect } from "react";
import {
  Tooltip,
  Button,
  TextField,
  InputGroup,
  FieldError,
  Form,
  Modal,
  toast,
  useOverlayState,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import isEmpty from "lodash/isEmpty";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import {
  patchSubject,
  getSubjectById,
  includeCurrentSubjectData,
} from "@/store/subjectsSlice";
import EventBus, { PersonDataChangeEvent } from "@/services/EventBus/EventBus";
import type { Person } from "@/types/person/index.interface";
import { SearchStatusEnum } from "@/types/person/searchstate.interface";
import { clean } from "../platformCollectors";
import { modal, button } from "styles/styles";

type FormValues = {
  phone?: string;
};

export default function ManualPhoneAdditionModal({
  person,
}: {
  person: Person | null;
}) {
  const dispatch = useAppDispatch();
  const state = useOverlayState();
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      phone: "",
    },
  });
  const watchPhone = watch("phone", "");

  useEffect(() => {
    trigger("phone");
  }, [watchPhone, trigger]);

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const phone = clean(values.phone?.trim());
      let updatedPerson: Person = {} as Person;

      if (phone) {
        updatedPerson = {
          ...person,
          personal_details: {
            ...person?.personal_details,
            phone: {
              ...person?.personal_details?.phone,
              phones: [
                ...(person?.personal_details?.phone?.phones ?? []),
                ...(phone ? [phone] : []),
              ],
            },
          },
        };
      }

      const patchPayload = phone
        ? {
            personal_details: {
              phone: {
                phones: updatedPerson?.personal_details?.phone?.phones,
              },
            },
          }
        : {};

      EventBus.publish(
        "person-data-change",
        new PersonDataChangeEvent({
          ...updatedPerson,
          personal_details: updatedPerson.personal_details,
          id: person?.id,
        } as Person),
      );

      reset();
      state.close();
      toast.success("Success", {
        description: "Phone added successfully",
      });
      const { payload: currentSubject } = await dispatch(
        getSubjectById(person?.id!),
      );
      if (currentSubject) {
        await dispatch(
          patchSubject({
            subjectId: person?.id,
            subjectDetails: patchPayload,
          }),
        );
        dispatch(
          includeCurrentSubjectData({
            ...currentSubject,
            id: person?.id!,
            search_state: {
              is_done: false,
              status: SearchStatusEnum.in_progress,
            },
          }),
        );
      }
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
      toast.danger(error.name, { description: error.message });
    }
  };

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Tooltip>
        <Tooltip.Trigger>
          <Button isIconOnly variant="ghost" onPress={state.open}>
            <Icons.Plus />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Add Phone Number Manually</Tooltip.Content>
      </Tooltip>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger onPress={state.close} />
            <Modal.Header>
              <Modal.Heading>Add Phone Number</Modal.Heading>
            </Modal.Header>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Modal.Body className="p-2">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...register("phone", {
                        minLength: { value: 4, message: "Too short" },
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+[1-9]\d{1,14}$/,
                          message:
                            "Phone number must be in E.164 format (e.g. +1234567890)",
                        },
                      })}
                      isInvalid={!!errors.phone}
                      {...field}
                    >
                      <InputGroup>
                        <InputGroup.Prefix>
                          <Icons.Phone />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          type="tel"
                          placeholder="+1234567890"
                        />
                      </InputGroup>
                      <FieldError>
                        {errors.phone && errors.phone.message}
                      </FieldError>
                    </TextField>
                  )}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="ghost"
                  isPending={isSubmitting}
                  className={button.ghost_accent}
                  isDisabled={!isEmpty(errors) || watchPhone?.length === 0}
                >
                  <Icons.Plus />
                  Add
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
