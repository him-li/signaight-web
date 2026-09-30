"use client";
import { Chip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppSelector } from "@/store/store";
import {
  selectCurrentSubjectLanguages,
  selectSubjectsState,
} from "@/store/subjectsSlice";
import MarkPerson from "@/components/blocks/MarkPerson";
import Location from "@/components/atoms/CommonFields/person/location";
import SearchStatus from "@/components/atoms/CommonFields/person/status";
import type { Person } from "@/types/person/index.interface";

export default function PersonInfo({ isVertical }: { isVertical?: boolean }) {
  const person = useAppSelector(selectSubjectsState)
    .currentSubjectData as Person;
  const languageArray = useAppSelector(selectCurrentSubjectLanguages);
  const style = `flex align-top ps-4 border-s-2 border-gray-500 ${isVertical ? "justify-between" : "flex-col justify-center"}`;

  return (
    <div
      className={
        isVertical
          ? "columns-1"
          : "flex flex-col sm:flex-row justify-between w-full text-sm z-10"
      }
    >
      <div className={style}>
        <p>Search Status</p>
        <SearchStatus searchState={person?.search_state} />
      </div>
      <div className={style}>
        <p>Residence</p>
        <Location location={person?.personal_details?.location} />
      </div>
      <div className={style}>
        <p>Languages</p>
        <Chip variant="tertiary">
          <Icons.Language />
          <Chip.Label>
            {languageArray.length > 0
              ? languageArray.map((language) => {
                  let languageStr = "";
                  const langLen = languageArray?.length ?? 0;
                  const lastLangIndex = langLen - 1;
                  if (language != languageArray?.[lastLangIndex]) {
                    languageStr = ` ${language?.language} /`;
                  } else {
                    languageStr = ` ${language?.language}`;
                  }
                  return languageStr;
                })
              : "---"}
          </Chip.Label>
        </Chip>
      </div>
      <div className="w-fit my-auto">
        <MarkPerson person={person} />
      </div>
    </div>
  );
}
