import { useCallback } from "react";
import {
  Accordion,
  ComboBox,
  Label,
  ListBox,
  useFilter,
  Button,
  DatePicker,
  DateField,
  Calendar,
  Form,
  TextField,
  Input,
  FieldError,
  Modal,
  TextArea,
  toast,
  UseOverlayStateReturn,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch } from "@/store/store";
import { updateProject } from "@/store/projectsSlice";
import { useProjectState } from "@/contexts/projectContext/ProjectContext";
import { airportOptions } from "@/utils/getAirports";
import { useLayoutState } from "@/contexts/layoutContext/LayoutContext";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { layouts } from "@/constants/layouts";
import Capitalize from "@/utils/capitalize";
import { modal, button } from "styles/styles";
import type { Project, ProjectPNRFormType } from "@/types/project.interface";

type EditProjectFormData = {
  title: string;
  description?: string;
  pnr_data?: ProjectPNRFormType;
};

type EditProjectModalProps = {
  state: UseOverlayStateReturn;
  item: Project;
};

function mapPNRFormToDomain(pnr?: ProjectPNRFormType) {
  if (!pnr) return undefined;
  return {
    ...pnr,
    flight_date: pnr.flight_date ? pnr.flight_date.toString() : undefined,
  };
}

export default function EditProjectModal({
  state,
  item,
}: EditProjectModalProps) {
  const { layoutName } = useLayoutState();
  const projectTerm = Capitalize(
    layouts.find((layout) => layout.key === layoutName)?.project!,
  );
  const { id, title, description, pnr_data } = item;
  const { refresh } = useSearchParamsActions();
  const { projects: projectList } = useProjectState();
  const dispatch = useAppDispatch();
  const { contains } = useFilter({ sensitivity: "base" });

  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, errors, isSubmitting },
  } = useForm<EditProjectFormData>({
    defaultValues: {
      title: title,
      description: description,
      pnr_data: pnr_data,
    },
  });

  const onSubmit = useCallback(
    async (data: EditProjectFormData) => {
      try {
        const payload = {
          ...item,
          title: data.title.trim(),
          description: data.description,
          updated_at: new Date(),
          pnr_data: mapPNRFormToDomain(data.pnr_data),
        };
        await dispatch(updateProject({ id: id!, project: payload })).unwrap();
        refresh();
        state.close();
        toast.success("Success", {
          description: "Project updated successfully",
        });
      } catch (error) {
        console.log("Failed to update project:", error);
      }
    },
    [id, dispatch, state, refresh],
  );

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit {projectTerm}</Modal.Heading>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body className="p-2">
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <TextField
                      id="title"
                      aria-label="Title"
                      {...register("title", {
                        required: "This field is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                        validate: (value) => {
                          const sameTitle = projectList.some(
                            (project: Project) => project?.title === value,
                          );
                          return (
                            !sameTitle ||
                            "There is already a project with this name"
                          );
                        },
                      })}
                      isInvalid={errors.title ? true : false}
                      validationBehavior="aria"
                      {...field}
                    >
                      <Label>Title</Label>
                      <Input />
                      <FieldError>
                        {errors.title && errors.title.message}
                      </FieldError>
                    </TextField>
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextField
                      aria-label="Description"
                      id="description"
                      {...register("description", {
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                      isInvalid={errors.description ? true : false}
                      validationBehavior="aria"
                      {...field}
                    >
                      <Label>Description</Label>
                      <TextArea aria-label="Project Description" />
                      <FieldError>
                        {errors.description && errors.description.message}
                      </FieldError>
                    </TextField>
                  )}
                />
                {projectTerm == "Watchlist" ? (
                  <Accordion hideSeparator>
                    <Accordion.Item id="pnr">
                      <Accordion.Heading>
                        <Accordion.Trigger className="text-sm font-semibold">
                          PNR Data
                          <Accordion.Indicator />
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body className="flex flex-col gap-2">
                          <Controller
                            control={control}
                            name="pnr_data.departure_airport"
                            render={({ field }) => (
                              <ComboBox
                                {...field}
                                value={field?.value ?? null}
                                onChange={(key) => field?.onChange(key)}
                              >
                                <Label>Departure Airport</Label>
                                <ComboBox.InputGroup>
                                  <Input placeholder="Select Airport" />
                                  <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <ComboBox.Popover className={modal.base}>
                                  <ListBox items={airportOptions}>
                                    {(airport) => (
                                      <ListBox.Item
                                        id={airport?.key}
                                        key={airport?.key}
                                        textValue={airport?.label}
                                      >
                                        {airport?.label}
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    )}
                                  </ListBox>
                                </ComboBox.Popover>
                              </ComboBox>
                            )}
                          />
                          <Controller
                            control={control}
                            name="pnr_data.arrival_airport"
                            render={({ field }) => (
                              <ComboBox
                                {...field}
                                value={field?.value ?? null}
                                onChange={(key) => field?.onChange(key)}
                              >
                                <Label>Arrival Airport</Label>
                                <ComboBox.InputGroup>
                                  <Input placeholder="Select Airport" />
                                  <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <ComboBox.Popover className={modal.base}>
                                  <ListBox items={airportOptions}>
                                    {(airport) => (
                                      <ListBox.Item
                                        id={airport?.key}
                                        key={airport?.key}
                                        textValue={airport?.label}
                                      >
                                        {airport?.label}
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    )}
                                  </ListBox>
                                </ComboBox.Popover>
                              </ComboBox>
                            )}
                          />
                          <Controller
                            control={control}
                            name="pnr_data.airline"
                            render={({ field }) => (
                              <TextField {...field}>
                                <Label>Airline</Label>
                                <Input />
                                <FieldError />
                              </TextField>
                            )}
                          />
                          <Controller
                            control={control}
                            name="pnr_data.flight_number"
                            render={({ field }) => (
                              <TextField {...field}>
                                <Label>Flight Number</Label>
                                <Input />
                                <FieldError />
                              </TextField>
                            )}
                          />
                          <Controller
                            control={control}
                            name="pnr_data.flight_date"
                            render={({ field }) => (
                              <DatePicker
                                value={field?.value}
                                onChange={field.onChange}
                              >
                                <Label>Flight Date</Label>
                                <DateField.Group>
                                  <DateField.Input>
                                    {(segment) => (
                                      <DateField.Segment segment={segment} />
                                    )}
                                  </DateField.Input>
                                  <DateField.Suffix>
                                    <DatePicker.Trigger>
                                      <DatePicker.TriggerIndicator />
                                    </DatePicker.Trigger>
                                  </DateField.Suffix>
                                </DateField.Group>
                                <DatePicker.Popover className={modal.base}>
                                  <Calendar aria-label="Choose date">
                                    <Calendar.Header>
                                      <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                      </Calendar.YearPickerTrigger>
                                      <Calendar.NavButton slot="previous" />
                                      <Calendar.NavButton slot="next" />
                                    </Calendar.Header>
                                    <Calendar.Grid>
                                      <Calendar.GridHeader>
                                        {(day) => (
                                          <Calendar.HeaderCell>
                                            {day}
                                          </Calendar.HeaderCell>
                                        )}
                                      </Calendar.GridHeader>
                                      <Calendar.GridBody>
                                        {(date) => (
                                          <Calendar.Cell date={date} />
                                        )}
                                      </Calendar.GridBody>
                                    </Calendar.Grid>
                                  </Calendar>
                                </DatePicker.Popover>
                              </DatePicker>
                            )}
                          />
                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                ) : null}
              </Modal.Body>
              <Modal.Footer className="w-full justify-end">
                <Button
                  variant="ghost"
                  type="submit"
                  isPending={isSubmitting}
                  isDisabled={!isDirty || isSubmitting}
                  className={button.ghost_accent}
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
