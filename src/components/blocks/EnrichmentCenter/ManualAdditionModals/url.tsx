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
import type { Candidate, Person } from "@/types/person/index.interface";
import type { Url } from "@/types/person/network_signature/url.interface";
import { SearchStatusEnum } from "@/types/person/searchstate.interface";
import { clean } from "../platformCollectors";
import { createCandidate, updatePrimary } from "@/store/profileSelectSlice";
import { socialMediaName } from "@/constants/socialMediaName";
import { extractAllUrls } from "../utils";
import { modal, button } from "styles/styles";

type FormValues = {
  platform?: string;
  url?: string;
};

export default function ManualURLAdditionModal({
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
      platform: "",
      url: "",
    },
  });
  const watchUrl = watch("url", "");

  useEffect(() => {
    trigger("url");
  }, [watchUrl, trigger]);

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const url = clean(values.url?.trim());
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
          personal_details: { ...person?.personal_details },
          network_signature: {
            matched_profiles: person?.network_signature?.matched_profiles,
            url: {
              ...(person?.network_signature?.url ?? {}),
              [`${platform}_profile_url`]: [
                ...((person?.network_signature?.url?.[
                  `${platform}_profile_url` as keyof Url
                ] as string[]) ?? []),
                url,
              ],
            },
          },
          search_state: {
            is_done: false,
            status: SearchStatusEnum.in_progress,
          },
        };
      }

      if (url) {
        const newCandidate: Candidate = {
          network_signature: {
            url: {
              [`${platform}_profile_url`]: [url],
            },
          },

          source: platform,
          resource: "vetric",
        };

        const { payload: createdCandidate } = await dispatch(
          createCandidate({
            personId: person?.id,
            candidate: newCandidate,
          }),
        );
        const createdCandidateId = createdCandidate?.id;
        await dispatch(
          updatePrimary({
            personId: person?.id,
            candidateId: createdCandidateId,
          }),
        );
      }

      EventBus.publish(
        "person-data-change",
        new PersonDataChangeEvent({
          ...updatedPerson,
          personal_details: updatedPerson.personal_details,
          network_signature: updatedPerson.network_signature,
          id: person?.id,
        } as Person),
      );

      reset();
      state.close();
      toast.success("Success", {
        description: "URL added successfully",
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
        <Tooltip.Content>Add Social Platform URL Manually</Tooltip.Content>
      </Tooltip>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger onPress={state.close} />
            <Modal.Header>
              <Modal.Heading>Add URL</Modal.Heading>
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
                        <Select.Value className="flex items-center-safe gap-1" />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className={modal.base}>
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
                  name="url"
                  control={control}
                  rules={{
                    required: "URL is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                      message: "Please enter a valid URL",
                    },
                    validate: (value) => {
                      const urls = extractAllUrls(
                        person?.network_signature?.url ?? {},
                      );
                      if (urls.includes(value!)) {
                        return "This URL already exists in the profile";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <TextField isInvalid={!!errors.url} {...field}>
                      <Label>Social Media URL</Label>
                      <InputGroup>
                        <InputGroup.Input
                          type="url"
                          placeholder="https://example.com/profile"
                        />
                      </InputGroup>
                      <FieldError>
                        {errors.url && errors.url.message}
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
                  isDisabled={!isEmpty(errors) || watchUrl?.length === 0}
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
