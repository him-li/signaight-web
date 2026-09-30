"use client";
import { type ChangeEvent } from "react";
import Link from "next/link";
import debounce from "lodash/debounce";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Popover,
  ProgressBar,
  Separator,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import {
  useProjectState,
  useProjectActions,
} from "@/contexts/projectContext/ProjectContext";
import { ROUTES } from "@/constants/routes";
import ProjectsListLazyLoading from "../../signaight/ProjectsList/ProjectsListLazyLoading";
import { modal } from "styles/styles";

export default function ProjectsList({ name }: { name: string }) {
  const { searchQuery, loading, projects } = useProjectState();
  const { getProjects } = useProjectActions();

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    getProjects({
      page: 1,
      isAdd: false,
      withoutCache: true,
      searchParams: { title__like: value },
    });
  }, 700);

  return (
    <Popover>
      <Button
        variant="ghost"
        className="inline-flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => {
          if (!projects.length) {
            getProjects({
              page: 1,
              isAdd: false,
              withoutCache: true,
            });
          }
        }}
      >
        {name}
      </Button>
      <Popover.Content className={modal.base} aria-label="analysis_users">
        <Popover.Dialog>
          <TextField
            autoFocus
            id="project_search"
            defaultValue={searchQuery.title__like}
            // onClear={() =>
            //   handleChange({
            //     target: { value: "" },
            //   } as ChangeEvent<HTMLInputElement>)
            // }
          >
            <Label>Search</Label>
            <Input placeholder="Search" onChange={handleChange} />
            <FieldError />
          </TextField>
          <Link href={ROUTES.SCREENING}>
            <Button
              aria-label="Campaigns list"
              className="justify-start my-2"
              variant="ghost"
              fullWidth
            >
              <Icons.LinkAnalysis />
              Campaigns
            </Button>
          </Link>

          <Separator />
          <div className="w-full">
            <div className="h-2">
              {loading ? (
                <ProgressBar
                  isIndeterminate
                  aria-label="Loading..."
                  className="h-full"
                  size="sm"
                />
              ) : null}
            </div>
            <div className="pl-4 pb-2 text-xs">Campaign List</div>
            <ProjectsListLazyLoading
              type="search"
              itemHeight={30}
              listHeight={200}
            />
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
