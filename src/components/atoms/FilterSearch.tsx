"use client";
import { useCallback, type FormEvent, type ChangeEvent } from "react";
import { AxiosError } from "axios";
import {
  Button,
  ButtonGroup,
  TextField,
  Label,
  Input,
  FieldError,
  Popover,
  Form,
  toast,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch } from "@/store/store";
import {
  fetchSubjects,
  getRankingInfo,
  includeSearchQuery,
  resetSearchQuery,
} from "@/store/subjectsSlice";
import { modal } from "styles/styles";

export default function FilterSearch() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = ["company", "school", "language", "talks_about"]; //to be replaced by selectors when be ready

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        toast.success("Filter Applied", {
          description: "Filters Successfully Applied",
        });
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
      dispatch(fetchSubjects());
      dispatch(getRankingInfo());
    },
    [dispatch],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(includeSearchQuery({ [event.target.id]: event.target.value }));
    },
    [dispatch],
  );

  const handleReset = useCallback(async () => {
    dispatch(resetSearchQuery());
    dispatch(fetchSubjects());
    dispatch(getRankingInfo());
  }, [dispatch]);

  return (
    <Popover>
      <Button
        type="button"
        variant="tertiary"
        className="text-medium rounded-full"
      >
        <Icons.Search />
        Filters
      </Button>
      <Popover.Content aria-label="Filter Applicants" className={modal.base}>
        <Popover.Dialog>
          <Form onSubmit={handleSubmit} className="gap-2">
            <TextField id="company" aria-label="Company">
              <Label>Company</Label>
              <Input value={filters?.company} onChange={handleInputChange} />
              <FieldError />
            </TextField>
            <TextField id="school" aria-label="School">
              <Label>School</Label>
              <Input value={filters?.school} onChange={handleInputChange} />
              <FieldError />
            </TextField>
            <TextField id="language" aria-label="Language">
              <Label>Language</Label>
              <Input value={filters?.language} onChange={handleInputChange} />
              <FieldError />
            </TextField>
            <TextField id="talks_about" aria-label="Talks About">
              <Label>Talks About</Label>
              <Input
                value={filters?.talks_about}
                onChange={handleInputChange}
              />
              <FieldError />
            </TextField>
            <ButtonGroup>
              <Button type="submit" variant="ghost">
                <Icons.Search />
                Search
              </Button>
              <Button onPress={handleReset} variant="ghost">
                <Icons.Undo />
                Reset
              </Button>
            </ButtonGroup>
          </Form>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
