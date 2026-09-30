import dynamic from "next/dynamic";
import EvaulationClientPage from "./EvaulationClientPage";

const EvaluationSidebar = dynamic(
  () => import("@/components/blocks/EvaluationSidebar/EvaluationSidebar"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function EvaluationSidebarComponent() {
  return (
    <span id="#/properties/evaluation-sidebar">
      <EvaulationClientPage>
        <EvaluationSidebar />
      </EvaulationClientPage>
    </span>
  );
}
