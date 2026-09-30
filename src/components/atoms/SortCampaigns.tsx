"use client";
import { Button, Dropdown, Label } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchProjects,
  includeSearchQuery,
  selectProjectsState,
} from "@/store/projectsSlice";
import { SEARCH_QURIES } from "@/constants/search";
import { modal } from "styles/styles";

export default function SortCampaigns() {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectProjectsState).searchQuery.order_by;

  const handleClick = (value: string) => {
    dispatch(
      includeSearchQuery({
        [SEARCH_QURIES.ORDER_BY]: value,
      }),
    );
    dispatch(fetchProjects());
  };

  return (
    <Dropdown>
      <Button>
        <Icons.Sort />
        <div>Sort by:</div>
        <div>
          {currentSort === "title"
            ? "Title"
            : currentSort === "-created_at"
              ? "Created At"
              : currentSort === "-updated_at"
                ? "Updated At"
                : "Custom"}
        </div>
      </Button>
      <Dropdown.Popover className={modal.base}>
        <Dropdown.Menu aria-label="Sort Campaigns" className="p-2 shadow-md">
          <Dropdown.Item
            id="title"
            key="title"
            textValue="Title"
            onPress={() => handleClick("title")}
          >
            <Label>Title</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="created_at"
            key="create_at"
            textValue="Created at"
            onPress={() => handleClick("-created_at")}
          >
            <Label>Created at</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="updated_at"
            key="updated_at"
            textValue="Updated at"
            onPress={() => handleClick("-updated_at")}
          >
            <Label>Updated at</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
