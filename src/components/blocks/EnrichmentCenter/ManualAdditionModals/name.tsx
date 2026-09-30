"use client";
import { useEffect } from "react";
import {
  Tooltip,
  Button,
  TextField,
  Label,
  ListBox,
  InputGroup,
  FieldError,
  Form,
  Modal,
  Select,
  toast,
  useOverlayState,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import isEmpty from "lodash/isEmpty";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import {
  getSubjectById,
  includeCurrentSubjectData,
} from "@/store/subjectsSlice";
import EventBus, { PersonDataChangeEvent } from "@/services/EventBus/EventBus";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import type { Person } from "@/types/person/index.interface";
import { SearchStatusEnum } from "@/types/person/searchstate.interface";
import { clean } from "../platformCollectors";
import { socialMediaName } from "@/constants/socialMediaName";
import { modal, button } from "styles/styles";

type FormValues = {
  platform?: string;
  f_name?: string;
  l_name?: string;
};

export default function ManualNameAdditionModal({
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
      f_name: "",
      l_name: "",
    },
  });
  const watchFName = watch("f_name", "");
  const watchLName = watch("l_name", "");

  useEffect(() => {
    trigger("f_name");
    trigger("l_name");
  }, [watchFName, watchLName, trigger]);

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const f_name = clean(values.f_name?.trim());
      const l_name = clean(values.l_name?.trim());
      let platform;
      if (values.platform === "telegram") {
        platform = "tgm";
        return platform;
      }
      platform = values.platform;
      let updatedPerson: Person = {} as Person;

      if (platform) {
        updatedPerson = {
          ...person,
          personal_details: {
            ...person?.personal_details,
            name: {
              ...person?.personal_details?.name,
              first_name: {
                ...person?.personal_details?.name?.first_name,
                f_name:
                  person?.personal_details?.name?.first_name.f_name ?? null,
                [`${platform}_f_name`]: f_name,
              },
              last_name: {
                ...person?.personal_details?.name?.last_name,
                l_name:
                  person?.personal_details?.name?.last_name.l_name ?? null,
                [`${platform}_l_name`]: l_name,
              },
              full_name: {
                ...person?.personal_details?.name?.full_name,
                full_name:
                  `${person?.personal_details?.name?.first_name.f_name ?? ""} ` +
                  `${person?.personal_details?.name?.last_name.l_name ?? ""}`,
                [`${platform}_full_name`]: `${f_name} ${l_name}`,
              },
            },
          },
        };
      }

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
        description: "Name added successfully",
      });
      const { payload: currentSubject } = await dispatch(
        getSubjectById(person?.id!),
      );
      if (currentSubject) {
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
        <Tooltip.Content>Add Names Manually</Tooltip.Content>
      </Tooltip>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger onPress={state.close} />
            <Modal.Header>
              <Modal.Heading>Add Names</Modal.Heading>
            </Modal.Header>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Modal.Body className="p-2 space-y-2">
                <Controller
                  name="platform"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <Label>Select Platform</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {Object.keys(socialMediaName).map((p) => {
                            const Icon = getSocialMediaIcon(p);
                            return (
                              <ListBox.Item
                                key={p}
                                id={p}
                                textValue={
                                  p.charAt(0).toUpperCase() + p.slice(1)
                                }
                              >
                                <Icon />
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            );
                          })}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  )}
                />
                <Controller
                  name="f_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      isInvalid={!!errors.f_name}
                      {...register("f_name", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                      {...field}
                    >
                      <Label>First Name</Label>
                      <InputGroup>
                        <InputGroup.Prefix>
                          <Icons.Name />
                        </InputGroup.Prefix>
                        <InputGroup.Input type="text" />
                      </InputGroup>
                      <FieldError>
                        {errors.f_name && errors.f_name.message}
                      </FieldError>
                    </TextField>
                  )}
                />

                <Controller
                  name="l_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      {...register("l_name", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                      isInvalid={!!errors.l_name}
                      {...field}
                    >
                      <Label>Last Name</Label>
                      <InputGroup>
                        <InputGroup.Prefix>
                          <Icons.Name />
                        </InputGroup.Prefix>
                        <InputGroup.Input type="text" />
                      </InputGroup>
                      <FieldError>
                        {errors.l_name && errors.l_name.message}
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
                  isDisabled={!isEmpty(errors)}
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
