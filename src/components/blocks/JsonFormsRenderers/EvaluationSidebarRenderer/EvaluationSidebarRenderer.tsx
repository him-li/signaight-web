import { withJsonFormsControlProps } from "@jsonforms/react";
import EvaluationSidebarComponent from "@/components/pages/EvaluationPage/components/EvaluationSidebarComponent";

function EvaluationSidebarRendererWrapper() {
  return <EvaluationSidebarComponent />;
}

export default withJsonFormsControlProps(EvaluationSidebarRendererWrapper);
