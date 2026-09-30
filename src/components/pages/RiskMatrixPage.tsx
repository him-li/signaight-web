"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import { getLeaderboardInfo } from "@/store/subjectsSlice/subjects.actions";
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
  () => import("@/components/blocks/signaight/RiskMatrixSubjectsList"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function RiskMatrixPage() {
  const dispatch = useAppDispatch();
  const project_id = useAppSelector(selectCurrentProjectId);
  const { state, modal } = useAddApplicantModal();

  useEffect(() => {
    if (!project_id) return;
    dispatch(getLeaderboardInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_id]);

  return (
    <div id="#/properties/risk-matrix-page" className="w-full">
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
