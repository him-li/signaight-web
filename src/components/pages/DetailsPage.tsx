"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { getSubjectById } from "@/store/subjectsSlice";
import { setPageLoading, setPageReady } from "@/store/pageLoadingSlice";
import {
  includeCurrentSubjectData,
  resetCurrentSubjectData,
} from "@/store/subjectsSlice";
import EnrichmentCenter from "@/components/blocks/EnrichmentCenter/EnrichmentCenter";
import SubjectProfile from "@/components/blocks/signaight/SubjectProfile";
import Display from "@/components/atoms/Display";
import PersonNotFound from "@/components/atoms/PersonNotFound";
import { ROUTES } from "@/constants/routes";
const layout =
  "flex-1 columns-1 md:columns-2 ps-10 py-10 space-y-8 sm:w-2/3 md:w-3/4 backdrop-blur-lg";

export default function DetailsPage() {
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
      id="#/properties/details-page"
      className="flex flex-col sm:flex-row lg:px-16 relative w-full"
    >
      <Display
        when={isCurrentPersonValid}
        fallback={
          <PersonNotFound
            isOpen={!isCurrentPersonValid}
            page="Screening Page"
            title="Subject"
            link={ROUTES.SCREENING}
          />
        }
      >
        <SubjectProfile />
        <EnrichmentCenter layoutStyle={layout} />
      </Display>
    </section>
  );
}
