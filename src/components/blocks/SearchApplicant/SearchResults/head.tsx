import { Checkbox } from "@heroui/react";
import FilterSearch from "@/components/atoms/FilterSearch";
import { toast } from "@heroui/react";

export default function SearchResultsHeader() {
  const handleSelectAll = () => {
    toast.info("Development in Progress");
  };

  return (
    <div className="grid grid-cols-6 w-full py-2 px-6 items-center">
      <div className="flex items-center gap-1">
        <Checkbox
          onChange={handleSelectAll}
          isSelected={false}
          className="hidden rounded-full"
        >
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>
        <p className="hidden lg:flex">Avatar</p>
      </div>
      <div className="hidden lg:grid lg:grid-cols-5 lg:col-span-5 lg:text-center lg:justify-items-center items-center">
        <p>Name</p>
        <p className="hidden">Email</p>
        <p>Education</p>
        <p>Last Job</p>
        <p>Location</p>
        <div className="flex justify-end">
          <FilterSearch />
        </div>
      </div>
    </div>
  );
}
