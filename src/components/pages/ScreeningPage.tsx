"use client";
import dynamic from "next/dynamic";
import { Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { button } from "styles/styles";
import useAddApplicantModal from "@/components/blocks/AddPersonModal/useAddPersonModal";
const LimitsProvider = dynamic(
  () => import("@/contexts/limitsContext/LimitsContext"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const PersonsSearchProvider = dynamic(
  () => import("@/contexts/personsSearchContext/PersonsSearchContext"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const SubjectsList = dynamic(
  () => import("@/components/blocks/signaight/ScreeningSubjectsList"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function ScreeningPage() {
  const { state, modal } = useAddApplicantModal();
  return (
    <div id="#/properties/screening-page" className="w-full">
      <SubjectsList />
      <LimitsProvider>
        <PersonsSearchProvider>
          <Button
            id="add-subject"
            key="add-subject"
            onPress={state.open}
            isIconOnly
            size="lg"
            variant="ghost"
            aria-label="Add Subject"
            className={button.ghost_accent + " fixed bottom-5 end-0"}
          >
            <Icons.Plus />
          </Button>
        </PersonsSearchProvider>
      </LimitsProvider>
      {modal}
    </div>
  );
}
