"use client";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { closeSpinner, openSpinner } from "@/store/pageLoadingSlice";
import { fetchIdentityExpanderCandidates } from "@/store/profileSelectSlice";
import { toast } from "@heroui/react";
import { PERSONAL_DETAILS_TITLES, CUSTOMIZABLE_TITLES } from "./constants";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import PersonalDetails from "./PersonalDetailsBlocks";
import PersonsSearchProvider from "@/contexts/personsSearchContext/PersonsSearchContext";
import LimitsProvider from "@/contexts/limitsContext/LimitsContext";
import PersonProvider from "@/contexts/personContext/PersonContext";
import type { PersonQuery } from "@/types/person/index.interface";

export default function EnrichmentCenter({
  layoutStyle,
}: {
  layoutStyle: string;
}) {
  const dispatch = useAppDispatch();
  const person = useAppSelector(selectCurrentSubjectData);
  const projectId = useAppSelector(selectCurrentProjectId);

  const getCandidates = async () => {
    try {
      dispatch(openSpinner());
      await dispatch(fetchIdentityExpanderCandidates({ personId: person?.id }));
      dispatch(closeSpinner());
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      toast.danger(error.name, { description: error.message });
    }
  };

  useEffect(() => {
    if (person?.id) {
      getCandidates();
    }
  }, [person?.id]);

  return (
    <LimitsProvider>
      <PersonProvider
        projectId={projectId || ""}
        personsData={{
          items: [],
          page: 1,
          pages: 1,
          total: 0,
          size: 0,
        }}
        searchQueries={{} as PersonQuery}
      >
        <PersonsSearchProvider>
          <div className={layoutStyle}>
            {PERSONAL_DETAILS_TITLES.map((title) => (
              <PersonalDetails
                key={title}
                person={person}
                title={title}
                isCustomizable={CUSTOMIZABLE_TITLES.includes(title)}
              />
            ))}
          </div>
        </PersonsSearchProvider>
      </PersonProvider>
    </LimitsProvider>
  );
}
