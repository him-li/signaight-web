import dynamic from "next/dynamic";
const EvaluationNavbar = dynamic(
  () => import("@/components/blocks/EvaluationNavbar"),
  {
    loading: () => null,
    ssr: false,
  },
);
const EvaluationDash = dynamic(
  () => import("@/components/blocks/EvaluationDash"),
  {
    loading: () => null,
    ssr: false,
  },
);

/** Retained from the former recruiting workflow as a unique reusable evaluation capability. */
export default function EvaluationPage() {
  return (
    <div
      className="flex flex-col w-full items-center gap-2"
      id="#/properties/campaigns-evaluation"
    >
      <EvaluationNavbar />
      <EvaluationDash />
    </div>
  );
}
