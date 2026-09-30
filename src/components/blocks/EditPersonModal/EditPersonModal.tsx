"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Label,
  Input,
  InputGroup,
  FieldError,
  Form,
  Modal,
  toast,
  UseOverlayStateReturn,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { socialMediaIcon } from "@/constants/socialMediaIcon";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { setPageLoading, setPageReady } from "@/store/pageLoadingSlice";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import {
  resetProjectSelectedSubjects,
  updateSubject,
  getSubjectById,
} from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";
import { Field_is_required } from "@/constants";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import EventBus, { PersonDataChangeEvent } from "@/services/EventBus/EventBus";
import { modal } from "styles/styles";

type EditPersonFormData = {
  f_name: string;
  l_name: string;
  email_address: string;
  linkedin: string;
};

interface EditPersonModalProps {
  personId: string;
  state: UseOverlayStateReturn;
}

export default function EditPersonModal({
  personId,
  state,
}: EditPersonModalProps) {
  const [person, setPerson] = useState<Person | null>(null);
  const { refresh } = useSearchParamsActions();
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectCurrentProjectId);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
    trigger,
  } = useForm<EditPersonFormData>({
    defaultValues: async () => (await getSubject()) as EditPersonFormData,
  });
  const watchEmail = watch("email_address", "");
  const watchLinkedin = watch("linkedin", "");

  useEffect(() => {
    trigger("email_address");
    trigger("linkedin");
  }, [watchEmail, watchLinkedin, trigger]);

  const getSubject = async () => {
    dispatch(setPageLoading());
    try {
      const { payload: subjectDetails } = await dispatch(
        getSubjectById(personId),
      );
      setPerson(subjectDetails ?? "");
      const { name, email } = subjectDetails?.personal_details ?? {};
      const { url } = subjectDetails.network_signature;
      const { first_name, last_name } = name ?? {};
      const { f_name } = first_name ?? {};
      const { l_name } = last_name ?? {};
      const { email_address: emailArray } = email ?? {};
      const email_address = emailArray?.[0] ?? "";
      const { linkedin_profile_url } = url ?? {};
      const returnValues = {
        f_name,
        l_name,
        email_address,
        linkedin: linkedin_profile_url,
      };
      dispatch(setPageReady());
      return returnValues;
    } catch (e) {
      const error = e as AxiosError;
      toast.danger(error.name, {
        description: error.message,
      });
    }
  };

  const handleFormSubmit = useCallback(
    async (values: EditPersonFormData) => {
      try {
        const { f_name, l_name, email_address, linkedin } = values;
        const trimmedFName = f_name ? f_name.trim() : null;
        const trimmedLName = l_name ? l_name.trim() : null;
        const trimmedEmail = email_address ? email_address.trim() : null;

        let linkedin_id = "";
        if (linkedin !== undefined || linkedin !== "") {
          const urlArr = linkedin?.split("/");
          if (urlArr?.length > 1) {
            const chunck = urlArr[urlArr.length - 1].includes("-")
              ? urlArr[urlArr.length - 1].split("-")
              : urlArr[urlArr.length - 2].split("-");
            if (chunck.length > 1) {
              const sub_chunck = chunck[chunck.length - 1];
              linkedin_id = sub_chunck;
            }
          } else {
            linkedin_id = linkedin;
          }
        }

        const updatedPerson: Person = {
          personal_details: {
            ...person?.personal_details,
            name: {
              first_name: { f_name: trimmedFName },
              last_name: { l_name: trimmedLName },
              full_name: { full_name: `${trimmedFName} ${trimmedLName}` },
            },
            email: { email_address: trimmedEmail ? [trimmedEmail] : undefined },
          },
          network_signature: {
            ...person?.network_signature,
            ...(linkedin_id && {
              user_id: {
                linkedin_user_id: [linkedin_id],
              },
            }),
            ...(linkedin && {
              url: {
                linkedin_profile_url: [linkedin],
              },
            }),
          },
        };

        await dispatch(
          updateSubject({ subjectId: personId, subjectDetails: updatedPerson }),
        );
        //publish event to subscribers
        EventBus.publish(
          "person-data-change",
          new PersonDataChangeEvent({
            ...updatedPerson,
            personal_details: {
              ...updatedPerson?.personal_details,
              visuals: {
                profile_photo: {
                  profile_picture:
                    updatedPerson?.personal_details?.visuals?.profile_photo
                      ?.profile_picture,
                },
              },
            },
            id: personId,
          } as Person),
        );
        dispatch(resetProjectSelectedSubjects(projectId));
        reset();
        toast.success("Success", {
          description: "Applicant updated successfully",
        });
        refresh();
        state.close();
      } catch (e) {
        const error = e as AxiosError;
        toast.danger("Error", {
          description: error.response?.statusText || error.message,
        });
      }
    },
    [person, dispatch, personId, projectId, refresh, reset, state],
  );
  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog
            aria-label="Edit Applicant Modal"
            className={modal.base}
          >
            <Modal.CloseTrigger />
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Modal.Header>
                <Modal.Heading>Edit Applicant</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="grid grid-cols-2 grid-rows-3 gap-2">
                <Controller
                  control={control}
                  name="f_name"
                  render={({ field }) => (
                    <TextField
                      id="f_name"
                      {...register("f_name", {
                        required: !watchEmail && !watchLinkedin,
                        minLength: {
                          value: 2,
                          message: "Minimum length should be 2",
                        },
                      })}
                      isInvalid={!!errors.f_name}
                      aria-label="First Name"
                      validationBehavior="aria"
                      {...field}
                    >
                      <Label>First Name</Label>
                      <Input />
                      <FieldError>
                        {errors.f_name && Field_is_required}
                      </FieldError>
                    </TextField>
                  )}
                />
                <Controller
                  control={control}
                  name="l_name"
                  render={({ field }) => (
                    <TextField
                      id="l_name"
                      {...register("l_name", {
                        required: !watchEmail && !watchLinkedin,
                        minLength: {
                          value: 2,
                          message: "Minimum length should be 2",
                        },
                      })}
                      isInvalid={!!errors.l_name}
                      aria-label="Last Name"
                      validationBehavior="aria"
                      {...field}
                    >
                      <Label>Last Name</Label>
                      <Input />
                      <FieldError>
                        {errors.l_name && Field_is_required}
                      </FieldError>
                    </TextField>
                  )}
                />
                <Controller
                  control={control}
                  name="linkedin"
                  render={({ field }) => (
                    <TextField
                      id="linkedin"
                      {...register("linkedin", {
                        validate: (value) => {
                          if (!value && !watchEmail) {
                            return "Either LinkedIn URL or Email is required";
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
                      className="col-span-2"
                      {...field}
                    >
                      <Label>LinkedIn ID/URL</Label>
                      <InputGroup>
                        <InputGroup.Prefix>
                          <socialMediaIcon.linkedin />
                        </InputGroup.Prefix>
                        <InputGroup.Input />
                      </InputGroup>
                      <FieldError>{errors.linkedin?.message}</FieldError>
                    </TextField>
                  )}
                />
                <Controller
                  control={control}
                  name="email_address"
                  render={({ field }) => (
                    <TextField
                      id="email_address"
                      {...register("email_address", {
                        validate: (value) => {
                          if (!value && !watchLinkedin) {
                            return "Either Email or LinkedIn URL is required";
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
                      isInvalid={!!errors.email_address}
                      aria-label="Email Address"
                      validationBehavior="aria"
                      className="col-span-2"
                      {...field}
                    >
                      <Label>Email Address</Label>
                      <InputGroup>
                        <InputGroup.Prefix>
                          <Icons.Email />
                        </InputGroup.Prefix>
                        <InputGroup.Input />
                      </InputGroup>
                      <FieldError>{errors.email_address?.message}</FieldError>
                    </TextField>
                  )}
                />
              </Modal.Body>
              <Modal.Footer className="w-full justify-end">
                <Button
                  fullWidth
                  variant="ghost"
                  type="submit"
                  isPending={isSubmitting}
                  isDisabled={
                    !!errors.f_name || !!errors.l_name || !!errors.email_address
                  }
                  className="min-w-fit px-4 rounded-full"
                >
                  <Icons.Edit />
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
