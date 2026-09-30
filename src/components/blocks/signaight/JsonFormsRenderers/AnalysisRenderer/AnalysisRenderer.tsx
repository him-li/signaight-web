import dynamic from "next/dynamic";
import { withJsonFormsControlProps } from "@jsonforms/react";
const SubjectDash = dynamic(() => import("@/components/pages/AnalysisPage"), {
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
      <SubjectDash />
      <ProfileSelection />
    </>
  );
}

const SubjectDashWithJsonForms = withJsonFormsControlProps(SubjectDashRenderer);
export default SubjectDashWithJsonForms;
