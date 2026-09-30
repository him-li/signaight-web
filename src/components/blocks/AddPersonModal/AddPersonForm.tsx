/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect } from "react";
import {
  Button,
  Form,
  TextField,
  Label,
  InputGroup,
  FieldError,
  toast,
} from "@heroui/react";
import { FormProvider, Controller, type UseFormReturn } from "react-hook-form";
import { usePersonsSearchState } from "@/contexts/personsSearchContext/PersonsSearchContext";
import { usePersonActions } from "@/contexts/personContext/PersonContext";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { useLimitsActions } from "@/contexts/limitsContext/LimitsContext";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { ALL_PROJECTS } from "@/constants/projects";
import { button } from "styles/styles";
import type { Person } from "@/types/person/index.interface";

export type AddPersonFormData = {
  f_name: string;
  l_name: string;
  email_address: string;
  phone: string;
  linkedin: string;
};

type PersonFormProps = {
  projectId: string | undefined;
  methods: UseFormReturn<AddPersonFormData, any, AddPersonFormData>;
  personTerm: string;
  onClose: () => void;
};

const REQUIRED_MESSAGE =
  "Either Email, Phone number or LinkedIn URL is required";

export default function PersonForm({
  projectId,
  methods,
  personTerm,
  onClose,
}: PersonFormProps) {
  const { moveToPage } = useSearchParamsActions();
  const { searchExisting } = usePersonsSearchState();
  const { handlePersonsLimits } = useLimitsActions();
  const { createPerson } = usePersonActions();
  const errors = methods.formState.errors;
  const trigger = methods.trigger;
  const register = methods.register;
  const watchEmail = methods.watch("email_address", "");
  const watchPhone = methods.watch("phone", "");
  const watchLinkedin = methods.watch("linkedin", "");
  const control = methods.control;
  const LinkedIn = getSocialMediaIcon("linkedin");

  useEffect(() => {
    trigger("email_address");
    trigger("phone");
    trigger("linkedin");
  }, [watchEmail, watchPhone, trigger]);

  const handleFormSubmit = useCallback(
    async (values: AddPersonFormData) => {
      await handlePersonsLimits({
        personsCount: 1,
        successCb: async () => {
          const { f_name, l_name, email_address, linkedin, phone } = values;
          const trimmedFName = f_name?.trim() || null;
          const trimmedLName = l_name?.trim() || null;
          const trimmedEmail = email_address?.trim() || null;

          if (!email_address && !phone && !linkedin) {
            toast.danger("Validation Error", {
              description: "Either email or phone is required.",
            });
            return;
          }

          let linkedin_id = "";
          let linkedin_url = "";

          if (linkedin && typeof linkedin === "string") {
            const urlArr = linkedin.split("/");
            if (urlArr.length > 1) {
              linkedin_url = linkedin;
              const chunk = urlArr[urlArr.length - 1].includes("-")
                ? urlArr[urlArr.length - 1].split("-")
                : (urlArr[urlArr.length - 2]?.split("-") ?? []);

              if (chunk.length > 1) {
                const sub_chunk = chunk[chunk.length - 1];
                linkedin_id = sub_chunk;
              }
            } else {
              linkedin_id = linkedin;
            }
          }

          const person: Person = {
            personal_details: {
              name: {
                first_name: { f_name: trimmedFName },
                last_name: { l_name: trimmedLName },
                full_name: {
                  full_name: `${trimmedFName ?? ""} ${trimmedLName ?? ""}`,
                },
              },
              email: {
                email_address: trimmedEmail ? [trimmedEmail] : [],
              },
              phone: { phones: phone ? [phone] : [] },
            },
            network_signature: {
              user_id: linkedin_id
                ? { linkedin_user_id: [linkedin_id] }
                : undefined,
              url: linkedin_url
                ? { linkedin_profile_url: [linkedin_url] }
                : undefined,
            },
          };
          createPerson(
            { person, searchExisting },
            () => {
              toast.success("Success", {
                description: "Subject was added successfully",
              });
              moveToPage(1);
              onClose();
            },
            (err: Error) => {
              toast.danger("Error", {
                description: err.message,
              });
              onClose();
            },
          );
        },
        errorCb: () => {},
      });
    },
    [projectId, searchExisting, methods, moveToPage],
  );

  const handleError = (values: any) => {
    if (typeof values === "string") {
      toast.danger(values);
    } else if (Array.isArray(values)) {
      values.forEach((err) => toast.danger(err));
    } else if (typeof values === "object" && values !== null) {
      Object.values(values).forEach((err) => {
        if (typeof err === "string") {
          toast.danger(err);
        } else if (Array.isArray(err)) {
          err.forEach((subErr) => toast.danger(String(subErr)));
        }
      });
    } else {
      toast.danger("Unknown error occurred.");
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        className="w-full flex flex-col gap-2 items-start justify-start"
        onSubmit={methods.handleSubmit(handleFormSubmit, handleError)}
      >
        <Controller
          control={control}
          name="f_name"
          render={({ field }) => (
            <TextField
              id="f_name"
              fullWidth
              {...register("f_name", {
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              isDisabled={!projectId || projectId === ALL_PROJECTS}
              isInvalid={!!errors.f_name}
              validationBehavior="aria"
              {...field}
            >
              <Label>First Name</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Icons.Name />
                </InputGroup.Prefix>
                <InputGroup.Input />
              </InputGroup>
              <FieldError>{errors.f_name && errors.f_name.message}</FieldError>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="l_name"
          render={({ field }) => (
            <TextField
              id="l_name"
              fullWidth
              {...register("l_name", {
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              isDisabled={!projectId || projectId === ALL_PROJECTS}
              isInvalid={!!errors.l_name}
              validationBehavior="aria"
              {...field}
            >
              <Label>Last Name</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Icons.Name />
                </InputGroup.Prefix>
                <InputGroup.Input />
              </InputGroup>
              <FieldError>{errors.l_name && errors.l_name.message}</FieldError>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="email_address"
          render={({ field }) => (
            <TextField
              id="email_address"
              fullWidth
              {...register("email_address", {
                required: !watchEmail && !watchPhone && !watchLinkedin,
                validate: (value) => {
                  if (!value && !watchLinkedin && !watchPhone) {
                    return REQUIRED_MESSAGE;
                  }
                  return true;
                },
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              isDisabled={!projectId || projectId === ALL_PROJECTS}
              isInvalid={!!errors.email_address}
              validationBehavior="aria"
              {...field}
            >
              <Label>Email Address</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Icons.Email />
                </InputGroup.Prefix>
                <InputGroup.Input type="email" />
              </InputGroup>
              <FieldError>{errors.email_address?.message}</FieldError>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <TextField
              id="phone"
              fullWidth
              {...register("phone", {
                required: !watchEmail && !watchPhone && !watchLinkedin,
                validate: (value) => {
                  if (!value && !watchEmail && !watchLinkedin) {
                    return REQUIRED_MESSAGE;
                  }
                  return true;
                },
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message:
                    "Phone number must be in E.164 format (e.g. +1234567890)",
                },
              })}
              isDisabled={!projectId || projectId === ALL_PROJECTS}
              isInvalid={!!errors.phone}
              validationBehavior="aria"
              {...field}
            >
              <Label>Phone Number</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Icons.Phone />
                </InputGroup.Prefix>
                <InputGroup.Input type="tel" placeholder="+1234567890" />
              </InputGroup>
              <FieldError>{errors.phone?.message}</FieldError>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="linkedin"
          render={({ field }) => (
            <TextField
              id="linkedin"
              fullWidth
              {...register("linkedin", {
                required: !watchEmail && !watchPhone && !watchLinkedin,
                validate: (value) => {
                  if (!value && !watchEmail && !watchPhone) {
                    return REQUIRED_MESSAGE;
                  }
                  return true;
                },
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              isInvalid={!!errors.linkedin}
              aria-label="LinkedIn ID/URL"
              validationBehavior="aria"
              {...field}
            >
              <Label>LinkedIn ID/URL</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <LinkedIn />
                </InputGroup.Prefix>
                <InputGroup.Input type="url" />
              </InputGroup>
              <FieldError>{errors.linkedin?.message}</FieldError>
            </TextField>
          )}
        />
        <div className="mt-2 w-full flex justify-center">
          <Button
            type="submit"
            variant="ghost"
            isDisabled={!projectId || projectId === ALL_PROJECTS}
            className={button.ghost_accent}
          >
            <Icons.Plus />
            Add {personTerm}
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}
