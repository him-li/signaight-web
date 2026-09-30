import { withJsonFormsControlProps } from "@jsonforms/react";
import SearchPage from "@/components/pages/SearchPage/SearchPage";

const Container = () => {
  return (
    <div className="flex grow w-full h-[88vh]">
      <SearchPage />
    </div>
  );
};

export default withJsonFormsControlProps(Container);
