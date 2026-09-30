import dynamic from "next/dynamic";
import { withJsonFormsControlProps } from "@jsonforms/react";
const DetailsPage = dynamic(() => import("@/components/pages/DetailsPage"), {
  loading: () => <div />,
  ssr: false,
});
const ProfileSelection = dynamic(
  () => import("@/components/blocks/ProfileSelectionSidebar"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
function SubjectDashRenderer() {
  return (
    <>
      <DetailsPage />
      <ProfileSelection />
    </>
  );
}

const SubjectDashWithJsonForms = withJsonFormsControlProps(SubjectDashRenderer);
export default SubjectDashWithJsonForms;
