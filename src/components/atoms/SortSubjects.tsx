"use client";
import { useState } from "react";
import { Button, Dropdown, Label, Key } from "@heroui/react";
import { Icons, SocialPlatforms } from "@/components/atoms/Icons";
import { useAppSelector } from "@/store/store";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import {
  useSearchParamsActions,
  useSearchParamsState,
} from "@/contexts/searchParamsContext/SearchParamsContext";
import { usePathname, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { sortingStrings } from "@/constants";
import { SEARCH_QURIES } from "@/constants/search";
import { useLayoutState } from "@/contexts/layoutContext/LayoutContext";
import { layouts } from "@/constants/layouts";
import { ALL_PROJECTS } from "@/constants/projects";
import { modal } from "styles/styles";

export default function SortSubjects() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set([""]));
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentItem } = useSearchParamsState();
  const params = new URLSearchParams(searchParams!);
  const currentSort =
    params.get(SEARCH_QURIES.ORDER_BY) ??
    (pathname?.includes(ROUTES.RISKMATRIX)
      ? sortingStrings.risk_score_asc
      : "");
  const selectedProject = useAppSelector(selectSelectedProject);
  const { setQueries } = useSearchParamsActions();
  const { layoutName } = useLayoutState();
  const layout = layouts.find((layout) => layout.key === layoutName);
  const handleClick = (value: Key) => {
    setQueries([
      { key: SEARCH_QURIES.PAGE, value: "1" },
      { key: SEARCH_QURIES.ORDER_BY, value: value as string },
    ]);
  };

  const riskScoreFilter = `${sortingStrings.risk_score_asc},${sortingStrings.f_name_asc}`;

  return (
    <Dropdown>
      <Button
        variant="tertiary"
        isDisabled={!selectedProject}
        className="text-xs text-foreground-500 font-semibold rounded-full"
      >
        <Icons.Sort />
        <div>SORT BY</div>
        <div>
          {currentSort === sortingStrings.f_name_asc
            ? "NAME"
            : currentSort === sortingStrings.personal_email
              ? "EMAIL"
              : currentSort === sortingStrings.personal_location_asc
                ? "LOCATION"
                : currentSort === sortingStrings.last_update_asc
                  ? "LAST UPDATE"
                  : currentSort === sortingStrings.signaight_score_desc
                    ? "SIGNAIGHT SCORE"
                    : currentSort === riskScoreFilter
                      ? "RISK SCORE"
                      : "CUSTOM"}
        </div>
      </Button>
      <Dropdown.Popover className={modal.base}>
        <Dropdown.Menu
          aria-label="Sort Persons"
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            setSelected(key as string);
            handleClick(key);
          }}
        >
          <Dropdown.Item
            id={sortingStrings.f_name_asc}
            key={sortingStrings.f_name_asc}
            textValue="Name"
          >
            <Icons.Name />
            <Label>Name</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item
            id={sortingStrings.personal_email}
            key={sortingStrings.personal_email}
            textValue="Email"
          >
            <Icons.Email />
            <Label>Email</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item
            id={sortingStrings.personal_location_asc}
            key={sortingStrings.personal_location_asc}
            textValue="Location"
          >
            <Icons.Location />
            <Label>Location</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item
            id={sortingStrings.last_update_asc}
            key={sortingStrings.last_update_asc}
            textValue="Last Update"
          >
            <Icons.Update />
            <Label>Last Update</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item
            id={sortingStrings.signaight_score_desc}
            key={sortingStrings.signaight_score_desc}
            className={layout?.label === "SignAIght" ? "hidden" : ""}
            textValue="SignAIght Score"
          >
            <SocialPlatforms.SignAIght />
            <Label>
              Real<strong className="text-teal-500">Eye</strong> Score
            </Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item
            id={riskScoreFilter}
            key={riskScoreFilter}
            textValue="Risk Score"
            className={
              layout?.label === "SignAIght" && currentItem !== ALL_PROJECTS
                ? ""
                : "hidden"
            }
          >
            <SocialPlatforms.SignAIght />
            <Label>Risk Score</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
