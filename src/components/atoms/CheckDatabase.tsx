import { Checkbox, Label, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import {
  usePersonsSearchActions,
  usePersonsSearchState,
} from "@/contexts/personsSearchContext/PersonsSearchContext";

export default function CheckDatabase() {
  const { setSearchExisting } = usePersonsSearchActions();
  const { searchExisting } = usePersonsSearchState();

  return (
    <Checkbox defaultSelected={searchExisting} onChange={setSearchExisting}>
      <Checkbox.Control className="rounded-full">
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="basic-terms" className="flex items-center-safe">
          Check Database
          <Tooltip>
            <Tooltip.Content placement="bottom" className="max-w-52">
              When the checkbox is checked, the system will first check the
              database for existing data. If there is data from the last year of
              added applicant(s), the data will be pulled from the database
              instead of performing a new enrichment flow.
            </Tooltip.Content>
            <Tooltip.Trigger>
              <Icons.Help size={15} className="cursor-help mx-2" />
            </Tooltip.Trigger>
          </Tooltip>
        </Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
