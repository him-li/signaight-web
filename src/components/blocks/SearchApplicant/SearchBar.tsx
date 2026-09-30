"use client";
import { useCallback } from "react";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  Form,
  TextField,
  Label,
  ListBox,
  InputGroup,
  FieldError,
  Select,
  toast,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import Capitalize from "@/utils/capitalize";
import { Icons } from "@/components/atoms/Icons";
import { linkedinLocationGeoIds } from "@/constants";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import {
  createActiveSearch,
  fetchActiveSearchById,
} from "@/store/activeSearchSlice";
import type { ActiveSearch } from "@/types/search.interface";
import { modal, button } from "styles/styles";
import Display from "@/components/atoms/Display";
import { BG_IMAGE_URL } from "@/constants/image";

interface SearchFormData {
  school?: string;
  title?: string;
  location?: string;
}

export default function SearchBar({ searches }: { searches: ActiveSearch[] }) {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, getValues, setValue } =
    useForm<SearchFormData>();

  const handleFormSubmit = handleSubmit((data: SearchFormData) => {
    const { school, title, location } = data;
    const locationIds = getValues().location;
    if (!school && !title && !location) {
      toast.danger("Please input at least one field");
      return;
    }
    const activeSearch = {
      school,
      title,
      location: locationIds,
    };
    dispatch(createActiveSearch({ activeSearch }));
  });

  const handleSelectSearch = useCallback(
    (searchId: string) => {
      dispatch(fetchActiveSearchById(searchId));
    },
    [dispatch],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setLocation = useCallback((e: any) => {
    const value = e.target.value;
    let ids = "";
    if (value.includes("all")) {
      ids = Object.values(linkedinLocationGeoIds)
        .flat()
        .map((location) => location.id)
        .toString();
    } else if (!value.includes("deselect")) {
      ids = value.toString();
    }

    setValue("location", ids);
  }, []);

  return (
    <Form
      onSubmit={handleFormSubmit}
      className="sticky top-0 grid grid-cols-4 lg:grid-cols-6 place-content-center-safe w-full p-8 gap-2 min-h-[20vh] bg-neutral-700 rounded-2xl"
    >
      <BlurredBackground alt="bg" src={BG_IMAGE_URL} />
      {queries.map((query) => (
        <Display
          key={query}
          when={query === "location"}
          fallback={
            <Controller
              control={control}
              name={query as keyof SearchFormData}
              render={({ field }) => (
                <TextField
                  id={query}
                  key={query}
                  fullWidth
                  className="col-span-4 lg:col-span-2 rounded-full"
                  {...field}
                >
                  <Label>{Capitalize(query)}</Label>
                  <InputGroup>
                    <InputGroup.Prefix>
                      {query === "school" ? (
                        <Icons.Education />
                      ) : (
                        <Icons.File />
                      )}
                    </InputGroup.Prefix>
                    <InputGroup.Input />
                  </InputGroup>
                  <FieldError />
                </TextField>
              )}
            />
          }
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                selectionMode="multiple"
                fullWidth
                value={getValues().location?.split(",")}
                onChange={setLocation}
                key={field.value}
                className="col-span-4 lg:col-span-2 rounded-full"
              >
                <Label>Location</Label>
                <Select.Trigger>
                  <Icons.Location />
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="all"
                      key="all"
                      textValue={getValues().location}
                    >
                      Select All
                    </ListBox.Item>
                    <ListBox.Item id="deselect" key="deselect" textValue="">
                      Deselect All
                    </ListBox.Item>
                    {
                      Object.entries(linkedinLocationGeoIds).map(
                        ([code, locations]) => (
                          <>
                            {locations.map((location) => (
                              <ListBox.Item
                                id={location.id}
                                key={location.id}
                                textValue={location.name}
                              >
                                <Avatar className="w-5 h-5">
                                  <Avatar.Image
                                    alt={location.name}
                                    src={`https://flagcdn.com/${code}.svg`}
                                  />
                                  <Avatar.Fallback>
                                    <Icons.Location />
                                  </Avatar.Fallback>
                                </Avatar>
                                {location.name}
                              </ListBox.Item>
                            ))}
                          </>
                        ),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ) as any
                    }
                  </ListBox>
                </Select.Popover>
              </Select>
            )}
          />
        </Display>
      ))}
      <div className="flex flex-col gap-2 sm:flex-row col-span-4 lg:col-span-6 justify-evenly items-center">
        <Button variant="ghost" type="submit" className={button.ghost_accent}>
          <Icons.Search />
          Search
        </Button>
        <Dropdown>
          <Button
            variant="ghost"
            type="button"
            className={button.ghost_accent}
            isDisabled={!searches || searches.length === 0}
          >
            <Icons.History />
            Historical Searches
          </Button>
          <Dropdown.Popover className={modal.base}>
            <Dropdown.Menu
              aria-label="Historical Searches"
              className="overflow-auto max-h-52 max-w-3xl"
            >
              {searches.map((search) => (
                <Dropdown.Item
                  key={search?.id}
                  onPress={() => handleSelectSearch(search?.id)}
                >
                  <Chip variant="tertiary">
                    <Icons.History />
                    <Chip.Label>
                      {new Date(search?.created_at)?.toLocaleString("en-GB", {
                        timeZone: "Asia/Jerusalem",
                      })}
                    </Chip.Label>
                  </Chip>
                  <Chip
                    variant="tertiary"
                    className={search?.school ? "visible" : "hidden"}
                  >
                    <Icons.Education />
                    <Chip.Label>{search?.school}</Chip.Label>
                  </Chip>
                  <Chip
                    variant="tertiary"
                    className={search?.title ? "visible" : "hidden"}
                  >
                    <Icons.File />
                    <Chip.Label>{search?.title}</Chip.Label>
                  </Chip>
                  <Chip
                    variant="tertiary"
                    className={search?.location ? "visible" : "hidden"}
                  >
                    <Icons.Location />
                    <Chip.Label>{search.location}</Chip.Label>
                  </Chip>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </Form>
  );
}

const queries = ["school", "title", "location"];
