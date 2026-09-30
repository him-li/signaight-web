"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { setPageLoading, setPageReady } from "@/store/pageLoadingSlice";
import {
  includeCurrentSubjectData,
  resetCurrentSubjectData,
} from "@/store/subjectsSlice";
import { getSubjectById } from "@/store/subjectsSlice";
import { useAppDispatch } from "@/store/store";
import Display from "@/components/atoms/Display";
import SubjectProfile from "@/components/blocks/signaight/SubjectProfile";
import { ROUTES } from "@/constants/routes";
import SubjectBlocks from "@/components/blocks/signaight/SubjectProfile/SubjectBlocks";
const PersonNotFound = dynamic(
  () => import("@/components/atoms/PersonNotFound"),
  {
    loading: () => null,
  },
);

export default function SubjectDash() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectIdStr = params?.subjectId?.toString();
  const [isCurrentPersonValid, setIsCurrentPersonValid] =
    useState<boolean>(true);

  useEffect(() => {
    const preparePage = async () => {
      dispatch(setPageLoading());
      const { payload: currentSubject } = await dispatch(
        getSubjectById(subjectIdStr),
      );
      if (currentSubject) {
        setIsCurrentPersonValid(true);
        dispatch(
          includeCurrentSubjectData({ ...currentSubject, id: subjectIdStr }),
        );
        dispatch(setPageReady());
      } else {
        setIsCurrentPersonValid(false);
      }
    };

    if (subjectIdStr) {
      preparePage();
    }

    return () => {
      dispatch(resetCurrentSubjectData());
    };
  }, [subjectIdStr]);

  return (
    <section
      id="#/properties/analysis-page"
      className="flex flex-col sm:flex-row grow lg:px-16 relative w-full"
    >
      <SubjectProfile />
      <Display when={!isCurrentPersonValid} fallback={null}>
        <PersonNotFound
          isOpen={!isCurrentPersonValid}
          page="Screening Page"
          title="Subject"
          link={ROUTES.SCREENING}
        />
      </Display>
      <SubjectBlocks />
    </section>
  );
}
