"use client";
import { useCallback } from "react";
import Link from "next/link";
import {
  Button,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Modal,
  Tooltip,
  useOverlayState,
} from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { AxiosError } from "axios";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import {
  resetProjectSelectedSubjects,
  updateSubject,
} from "@/store/subjectsSlice";
import { Icons } from "@/components/atoms/Icons";
import Display from "@/components/atoms/Display";
import EventBus, { PersonDataChangeEvent } from "@/services/EventBus/EventBus";
import { toast } from "@heroui/react";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { modal, button } from "styles/styles";
import type { Person } from "@/types/person/index.interface";
import type { Website } from "@/types/person/personal_details/websites.interface";

type RelatedLinksFormData = {
  websites: { url: string; label?: string; category?: string }[];
};

export default function RelatedLinks({ person }: { person?: Person }) {
  const state = useOverlayState();
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectCurrentProjectId);
  const { refresh } = useSearchParamsActions();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<RelatedLinksFormData>({
    defaultValues: {
      websites:
        person?.personal_details?.websites?.websites?.map((w) => ({
          url: w.url ?? "",
          label: w.label ?? "",
          category: w.category ?? "",
        })) ?? [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "websites",
  });

  const handleFormSubmit = useCallback(
    async (values: RelatedLinksFormData) => {
      try {
        const websites: Website[] = (values.websites ?? [])
          .map((w) => ({
            url: w.url?.trim() ?? "",
          }))
          .filter((w) => !!w.url);

        const updatedPerson: Person = {
          personal_details: {
            ...person?.personal_details,
            websites: {
              ...person?.personal_details?.websites,
              websites: websites,
            },
          },
        };

        await dispatch(
          updateSubject({
            subjectId: person?.id,
            subjectDetails: updatedPerson,
          }),
        );

        EventBus.publish(
          "person-data-change",
          new PersonDataChangeEvent({
            ...updatedPerson,
            personal_details: {
              ...updatedPerson.personal_details,
            },
            id: person?.id,
          } as Person),
        );

        dispatch(resetProjectSelectedSubjects(projectId));
        reset();
        toast.success("Success", {
          description: "URLs added successfully",
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
    [dispatch, state.close, person, projectId, refresh, reset],
  );

  return (
    <div className="flex flex-col w-full h-fit">
      <Display
        when={
          person?.personal_details?.websites?.websites &&
          person?.personal_details?.websites?.websites?.length > 0
        }
        fallback={<></>}
      >
        <div aria-label="websites_list" className="flex flex-col justify-start">
          {person?.personal_details?.websites?.websites?.map((item, index) => (
            <Snippet
              key={item?.url + index}
              symbol={<Icons.Link />}
              // classNames={{
              //   pre: "flex items-center gap-1  text-foreground text-xs",
              //   base: "bg-transparent gap-0 p-0",
              //   copyButton: item?.url !== "" ? "" : "hidden",
              //   content: "truncate max-w-[100px]",
              // }}
            >
              <Link href={item?.url} target="_blank">
                {item?.url}
              </Link>
            </Snippet>
          ))}
        </div>
      </Display>

      <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Modal.Trigger>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                isIconOnly
                variant="ghost"
                className="place-self-end-safe rounded-full"
              >
                <Icons.Plus />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Add Related Links</Tooltip.Content>
          </Tooltip>
        </Modal.Trigger>
        <Modal.Backdrop>
          <Modal.Container scroll="inside">
            <Modal.Dialog className={modal.base}>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Add Related Links</Modal.Heading>
              </Modal.Header>
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Modal.Body className="w-full max-h-[80vh] overflow-y-auto">
                  {fields.map((field, index) => (
                    <Controller
                      key={field.id}
                      control={control}
                      name={`websites.${index}.url`}
                      render={({ field }) => (
                        <TextField
                          type="url"
                          {...register(`websites.${index}.url`, {
                            required: "URL is required",
                          })}
                          isInvalid={!!errors.websites?.[index]?.url}
                          {...field}
                        >
                          <Label>{`Related Link #${index + 1}`}</Label>
                          <Input placeholder="Enter your email" />
                          <FieldError>
                            {errors.websites?.[index]?.url?.message}
                          </FieldError>
                        </TextField>
                      )}
                    />
                  ))}
                </Modal.Body>
                <Modal.Footer className="w-full justify-between">
                  <Tooltip>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        variant="tertiary"
                        className="rounded-full"
                        onPress={() => append({ url: "" })}
                      >
                        <Icons.Plus />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Add Related Links</Tooltip.Content>
                  </Tooltip>
                  <Button
                    variant="ghost"
                    type="submit"
                    isDisabled={!isValid}
                    isPending={isSubmitting}
                    className={button.ghost_accent}
                  >
                    <Icons.Plus />
                    Save Links
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
