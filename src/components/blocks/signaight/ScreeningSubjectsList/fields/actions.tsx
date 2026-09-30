/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import dynamic from "next/dynamic";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { includeSelectedSubject } from "@/store/subjectsSlice";
import { Icons } from "@/components/atoms/Icons";
import type { Person } from "@/types/person/index.interface";
import { SearchStatusEnum } from "@/types/person/searchstate.interface";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import { selectCurrentSelectedSubjectsData } from "@/store/subjectsSlice/subjects.selectors";
import { ROUTES } from "@/constants/routes";
import useDeletePersonModal from "@/components/blocks/DeletePersonModal/useDeletePersonModal";
const RefreshSearch = dynamic(
  () => import("@/components/atoms/RefreshSearch"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function Actions({ person }: { person: Person }) {
  const dispatch = useAppDispatch();
  const { modal, state } = useDeletePersonModal(person);
  const selectedSubjects = useAppSelector(selectCurrentSelectedSubjectsData);
  const currentProject = useAppSelector(selectSelectedProject);
  const isSearching =
    person.search_state?.status === SearchStatusEnum.in_progress;
  const handleImageClick = (subjectId: string, subjectInfo: string) => {
    const isSubjectSelected = selectedSubjects.some(
      (subject: Person) => subject.id === subjectId,
    );
    if (!isSubjectSelected) {
      dispatch(
        includeSelectedSubject({
          project_id: currentProject?.id,
          subject: subjectInfo,
        }),
      );
    }
  };

  return (
    <div className="flex items-center justify-evenly">
      <RefreshSearch
        person={person}
        isIconOnly
        variant="ghost"
        size="sm"
        isDisabled={isSearching}
      />
      <Link href={`${ROUTES.ANALYSIS}/${person?.id}`}>
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          className="rounded-full"
          onPress={() => handleImageClick(person?.id!, JSON.stringify(person))}
        >
          <Icons.Eye />
        </Button>
      </Link>
      <Button
        isIconOnly
        key="delete"
        variant="ghost"
        size="sm"
        onPress={state.open}
        isDisabled={isSearching}
      >
        <Icons.Delete />
      </Button>
      {person && modal}
    </div>
  );
}
