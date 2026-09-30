import type { ChangeEvent } from "react";
import debounce from "lodash/debounce";
import {
  TextField,
  CloseButton,
  InputGroup,
  FieldError,
  Tooltip,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import {
  useAnalysisActions,
  useAnalysisState,
} from "@/contexts/analisysContext/AnalysisContext";

export default function SearchInput() {
  const { getUsers, setValue } = useAnalysisActions();
  const { searchField, searchValue } = useAnalysisState();

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    getUsers({
      page: 1,
      isAdd: false,
      searchField,
      searchValue: e.target.value,
    });
  }, 700);

  return (
    <TextField
      id="user_search"
      autoFocus
      defaultValue={searchValue}
      className="grow"
    >
      <InputGroup
        fullWidth
        autoFocus
        className="bg-transparent shadow-none rounded-none pe-2 border-b border-transparent data-focus-within:border-foreground data-focus-within:ring-0"
      >
        <InputGroup.Prefix>
          <Icons.Search />
        </InputGroup.Prefix>
        <InputGroup.Input
          placeholder="Search"
          onChange={(d) => {
            setValue(d.target.value);
            handleChange(d);
          }}
        />
        {searchValue && (
          <Tooltip>
            <Tooltip.Content>Clear Input</Tooltip.Content>
            <Tooltip.Trigger>
              <CloseButton
                aria-label="Clear"
                onPress={() => {
                  setValue("");
                  handleChange({
                    target: { value: "" },
                  } as ChangeEvent<HTMLInputElement>);
                }}
                className="bg-transparent"
              />
            </Tooltip.Trigger>
          </Tooltip>
        )}
      </InputGroup>
      <FieldError />
    </TextField>
  );
}
