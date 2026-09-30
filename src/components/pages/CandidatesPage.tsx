"use client";
import dynamic from "next/dynamic";
const ProfileSelection = dynamic(
  () => import("@/components/blocks/ProfileSelectionSidebar"),
  {
    loading: () => null,
    ssr: false,
  },
);
const CandidatesTable = dynamic(
  () => import("@/components/blocks/CandidatesTable"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function CandidatesPage() {
  return (
    <div id="#/properties/campaigns-applicants">
      <CandidatesTable />
      <ProfileSelection />
    </div>
  );
}
