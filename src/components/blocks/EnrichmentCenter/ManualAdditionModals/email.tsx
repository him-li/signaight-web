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
  email?: string;
};

export default function ManualEmailAdditionModal({
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
      email: "",
    },
  });
  const watchEmail = watch("email", "");

  useEffect(() => {
    trigger("email");
  }, [watchEmail, trigger]);

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const email = clean(values.email?.trim());
      let updatedPerson: Person = {} as Person;

      if (email) {
        updatedPerson = {
          ...person,
          personal_details: {
            ...person?.personal_details,
            email: {
              ...person?.personal_details?.email,
              email_address: [
                ...(person?.personal_details?.email?.email_address ?? []),
                ...(email ? [email] : []),
              ],
            },
          },
        };
      }

      const patchPayload = email
        ? {
            personal_details: {
              email: {
                email_address:
                  updatedPerson?.personal_details?.email?.email_address,
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
        description: "Email added successfully",
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
        <Tooltip.Content>Add Email Manually</Tooltip.Content>
      </Tooltip>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger onPress={state.close} />
            <Modal.Header>
              <Modal.Heading>Add Email</Modal.Heading>
            </Modal.Header>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Modal.Body className="p-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...register("email", {
                        required: "Email is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                      isInvalid={!!errors.email}
                      {...field}
                    >
                      <InputGroup>
                        <InputGroup.Prefix>
                          <Icons.Email />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          type="email"
                          placeholder="name@example.com"
                        />
                      </InputGroup>
                      <FieldError>
                        {errors.email && errors.email.message}
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
                  isDisabled={!isEmpty(errors) || watchEmail?.length === 0}
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
