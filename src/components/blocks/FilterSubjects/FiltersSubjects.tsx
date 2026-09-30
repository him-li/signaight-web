"use client";
import { useCallback, useState, type FormEvent } from "react";
import debounce from "lodash/debounce";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Form,
  Popover,
  TextField,
  Label,
  Input,
  FieldError,
  toast,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import HasFilters from "./HasFilters";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { useAppSelector } from "@/store/store";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import { useTableActions } from "@/contexts/tableContext/TableContext";
import { SEARCH_QURIES } from "@/constants/search";
import { modal, button } from "styles/styles";
const Score = dynamic(() => import("./Score"), {
  loading: () => <div />,
  ssr: false,
});

const multipleVariants = {
  compatibility: "compatibility__in",
  status: "status__in",
};

type FiltersSubjectsProps = {
  hideCompatibility?: boolean;
  hideMark?: boolean;
};

export default function FiltersSubjects({
  hideCompatibility,
  hideMark,
}: FiltersSubjectsProps) {
  const { setSelectedKeys } = useTableActions();
  const [isOpen, setIsOpen] = useState(false);
  const selectedProject = useAppSelector(selectSelectedProject);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const { setQueries, deleteQueries } = useSearchParamsActions();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        setSelectedKeys(new Set([]), false);
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
    },
    [setSelectedKeys],
  );

  const makeChangeCall = debounce((key: string, value: string) => {
    setSelectedKeys(new Set([]), false);
    setQueries([
      { key: SEARCH_QURIES.PAGE, value: "1" },
      { key, value },
    ]);
  }, 700);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      makeChangeCall(event.target.id, event.target.value);
    },
    [makeChangeCall],
  );

  const handleCheckBoxChange = useCallback(
    (key: string, values: (string | number)[]) => {
      setSelectedKeys(new Set(), false);
      let newKey = null;
      const formattedValues = values.map(String).join(",");
      const multipleKey =
        multipleVariants[key as keyof typeof multipleVariants];
      if (values.length > 1 && !!multipleKey) {
        newKey = multipleKey;
        setQueries([
          { key: SEARCH_QURIES.PAGE, value: "1" },
          { key: newKey, value: values.map(String).join(",") },
          { key, value: "" },
        ]);
      } else {
        const newValue = { [key]: formattedValues, [multipleKey]: "" };
        const queries = Object.entries(newValue).reduce(
          (acc, [k, v]) => {
            return [...acc, { key: k, value: v }];
          },
          [] as {
            key: string;
            value: string;
          }[],
        );
        setQueries([...queries, { key: SEARCH_QURIES.PAGE, value: "1" }]);
      }
    },
    [setQueries, setSelectedKeys],
  );

  const handleMarkChange = useCallback(
    (key: string, value: boolean) => {
      setSelectedKeys(new Set(), false);
      setQueries([
        { key: SEARCH_QURIES.PAGE, value: "1" },
        { key, value: value ? value.toString() : "" },
      ]);
    },
    [setQueries, setSelectedKeys],
  );

  const handleReset = useCallback(async () => {
    setSelectedKeys(new Set(), false);
    deleteQueries({ excludeKeys: [SEARCH_QURIES.ITEM] });
    setIsOpen(false);
  }, [deleteQueries, setSelectedKeys]);

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <HasFilters>
        <Button
          variant="tertiary"
          isDisabled={!selectedProject}
          className="text-xs text-foreground-500 font-semibold rounded-full"
        >
          {selectedProject ? <Icons.Filter /> : <Icons.Filter />}
          FILTERS
        </Button>
      </HasFilters>
      <Popover.Content
        aria-label="Filter Applicants"
        placement="bottom"
        className={modal.base + " gap-2 p-4 text-xs"}
      >
        <Popover.Dialog>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <TextField id="f_name__like" aria-label="First Name">
                <Label>First Name</Label>
                <div className="flex items-center-safe relative">
                  <Input
                    defaultValue={params.get("f_name__like") ?? ""}
                    onChange={handleInputChange}
                  />
                  {params.get("f_name__like") && (
                    <CloseButton
                      aria-label="Clear"
                      className="absolute end-1"
                      onPress={() => makeChangeCall("f_name__like", "")}
                    />
                  )}
                </div>
                <FieldError />
              </TextField>

              <TextField id="l_name__like" aria-label="Last Name">
                <Label>Last Name</Label>
                <div className="flex items-center-safe relative">
                  <Input
                    defaultValue={params.get("l_name__like") ?? ""}
                    onChange={handleInputChange}
                  />
                  {params.get("l_name__like") && (
                    <CloseButton
                      aria-label="Clear"
                      className="absolute end-1"
                      onPress={() => makeChangeCall("l_name__like", "")}
                    />
                  )}
                </div>
                <FieldError />
              </TextField>

              <TextField id="email_address__like" aria-label="Email">
                <Label>Email</Label>
                <div className="flex items-center-safe relative">
                  <Input
                    defaultValue={params.get("email_address__like") ?? ""}
                    onChange={handleInputChange}
                  />
                  {params.get("email_address__like") && (
                    <CloseButton
                      aria-label="Clear"
                      className="absolute end-1"
                      onPress={() => makeChangeCall("email_address__like", "")}
                    />
                  )}
                </div>
                <FieldError />
              </TextField>
              <TextField id="location__like" aria-label="Location">
                <Label>Location</Label>
                <div className="flex items-center-safe relative">
                  <Input
                    defaultValue={params.get("location__like") ?? ""}
                    onChange={handleInputChange}
                  />
                  {params.get("location__like") && (
                    <CloseButton
                      aria-label="Clear"
                      className="absolute end-1"
                      onPress={() => makeChangeCall("location__like", "")}
                    />
                  )}
                </div>
                <FieldError />
              </TextField>
            </div>
            <Accordion
              hideSeparator
              aria-label="Compatibilies and Searching Status"
              allowsMultipleExpanded
            >
              {hideCompatibility ? null : (
                <Accordion.Item aria-label="Compatibilies">
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      Compatibilies
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <CheckboxGroup
                        value={
                          params.get("compatibility")
                            ? params.get("compatibility")?.split(",")
                            : (params.get("compatibility__in")?.split(",") ??
                              [])
                        }
                        onChange={(values) =>
                          handleCheckBoxChange("compatibility", values)
                        }
                      >
                        <Checkbox
                          id="high_compatibility"
                          value="High Compatibility"
                        >
                          <Checkbox.Control className="rounded-full">
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Content>
                            <Label>High Compatibility</Label>
                          </Checkbox.Content>
                        </Checkbox>
                        <Checkbox
                          id="medium_compatibility"
                          value="Medium Compatibility"
                        >
                          <Checkbox.Control className="rounded-full">
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Content>
                            <Label>Medium Compatibility</Label>
                          </Checkbox.Content>
                        </Checkbox>
                        <Checkbox
                          id="low_compatibility"
                          value="Low Compatibility"
                        >
                          <Checkbox.Control className="rounded-full">
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Content>
                            <Label>Low Compatibility</Label>
                          </Checkbox.Content>
                        </Checkbox>
                        <Checkbox id="disqualified" value="Disqualified">
                          <Checkbox.Control className="rounded-full">
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Content>
                            <Label>Disqualified</Label>
                          </Checkbox.Content>
                        </Checkbox>
                      </CheckboxGroup>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              )}
              <Accordion.Item aria-label="Searching Status">
                <Accordion.Heading>
                  <Accordion.Trigger>
                    Searching Status
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>
                    <CheckboxGroup
                      value={
                        params.get("status")
                          ? params.get("status")?.split(",")
                          : (params.get("status__in")?.split(",") ?? [])
                      }
                      onChange={(values) =>
                        handleCheckBoxChange("status", values)
                      }
                    >
                      <Checkbox id="success" value="Success">
                        <Checkbox.Control className="rounded-full">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label>Search Completed</Label>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox id="in_progress" value="In progress">
                        <Checkbox.Control className="rounded-full">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label>Searching in Progress</Label>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox id="error" value="Error">
                        <Checkbox.Control className="rounded-full">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label>Search Error</Label>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox id="timeout" value="Timeout">
                        <Checkbox.Control className="rounded-full">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label>Search Timeout</Label>
                        </Checkbox.Content>
                      </Checkbox>
                    </CheckboxGroup>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
              {hideMark ? null : (
                <Accordion.Item aria-label="Marks">
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      Marks
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="flex flex-col gap-1">
                      <Checkbox
                        id="is_favorite"
                        defaultSelected={params.get("is_favorite") === "true"}
                        onChange={(selected) =>
                          handleMarkChange("is_favorite", selected)
                        }
                      >
                        <Checkbox.Control className="rounded-full">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label htmlFor="favorites">Favorites</Label>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox
                        id="is_attention"
                        defaultSelected={params.get("is_attention") === "true"}
                        onChange={(selected) =>
                          handleMarkChange("is_attention", selected)
                        }
                      >
                        <Checkbox.Control className="rounded-full">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label htmlFor="option">Attention Required</Label>
                        </Checkbox.Content>
                      </Checkbox>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              )}
            </Accordion>
            <Score />
            <div className="flex w-full mt-2 justify-center-safe">
              <Button
                onPress={handleReset}
                variant="ghost"
                className={button.ghost_accent}
              >
                <Icons.Undo />
                Reset
              </Button>
            </div>
          </Form>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
