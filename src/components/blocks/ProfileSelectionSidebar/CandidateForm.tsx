"use client";
import { useState, type FormEvent } from "react";
import { AxiosError } from "axios";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { Button, Form, toast } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaDetails } from "@/utils/getSocialMediaDetails";
import { getPersonName } from "@/utils/getPersonName";
import CandidateItem from "./CandidateItem";
import Display from "@/components/atoms/Display";
import {
  getSubjectById,
  includeCurrentSubjectData,
} from "@/store/subjectsSlice";
import {
  selectProfileSelectPrimaryId,
  selectProfileSelectSubjectDataFullName,
} from "@/store/profileSelectSlice/profileSelect.selectors";
import {
  fetchCandidates,
  setPrimary,
  updatePrimary,
} from "@/store/profileSelectSlice";
import { modal, button } from "styles/styles";
import type { Candidate } from "@/types/candidate.interface";
import type { Person } from "@/types/person/index.interface";
type CandidateFormProps = {
  candidates: Candidate[];
  source: string;
  person: Person;
  buttonText: string;
  primary: boolean;
  showSource?: boolean;
  showButtonSeparately?: boolean;
};

export default function CandidateForm({
  candidates,
  source,
  person,
  buttonText,
  primary,
  showSource = false,
  showButtonSeparately = false,
}: CandidateFormProps) {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectProfileSelectSubjectDataFullName);
  const primaryId = useAppSelector(selectProfileSelectPrimaryId);
  const [hasSelectedThisPlatform, setHasSelectedThisPlatform] =
    useState<boolean>(false);

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const personId = person.id;
      await dispatch(updatePrimary({ personId, candidateId: primaryId })).unwrap();
      await dispatch(fetchCandidates({ personId, source })).unwrap();
      toast.success("Success", {
        description: "The profile was selected successfully",
      });
      const { payload: currentSubject } = await dispatch(
        getSubjectById(person?.id!),
      );
      if (currentSubject) {
        dispatch(
          includeCurrentSubjectData({
            ...currentSubject,
            id: person?.id!,
            search_state: currentSubject.search_state,
          }),
        );
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      toast.danger(error.name, {
        description: error.message,
      });
    }
  };

  const handleMerge = async (candidateId: string) => {
    try {
      const personId = person.id;
      await dispatch(updatePrimary({ personId, candidateId: candidateId }));
      toast.success("Success", {
        description: "The profile was selected successfully",
      });
      await dispatch(
        fetchCandidates({
          personId: personId,
          resource: "grayfox",
          primary: false,
        }),
      );
      const { payload: currentSubject } = await dispatch(
        getSubjectById(person?.id!),
      );
      if (currentSubject) {
        dispatch(
          includeCurrentSubjectData({
            ...currentSubject,
            id: person?.id!,
            search_state: currentSubject.search_state,
          }),
        );
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      toast.danger(error.name, {
        description: error.message,
      });
    }
  };

  const handleCandidateChange = (nextValue: string) => {
    dispatch(setPrimary(nextValue));
    setHasSelectedThisPlatform(true);
  };

  return (
    <Form
      onSubmit={handleConfirm}
      className="overflow-y-auto p-0 space-y-2 w-full"
    >
      <div className="w-full px-8 pb-12">
        {candidates.map((candidate: Candidate) => {
          return (
            <CandidateItem
              candidate={candidate}
              handleCandidateChange={handleCandidateChange}
              primaryId={primaryId}
              source={source as never}
              sourceLink={getSocialMediaDetails}
              key={candidate.id}
              showSource={showSource}
              showButtonSeparately={showButtonSeparately}
              handleMerge={handleMerge}
            />
          );
        })}
        <Display
          when={source === "Linkedin" && !candidates}
          fallback={
            <CandidateItem
              candidate={{
                id: source?.toLowerCase(),
                city: "",
                name: "None",
                profile_photo: "",
                primary: false,
                search_id: "None",
                searched_at: new Date(),
                source: source,
                source_id: source,
                personal_details: {
                  name: {
                    first_name: {
                      f_name: "None",
                    },
                    last_name: {
                      l_name: "None",
                    },
                    full_name: {
                      full_name: "None",
                      facebook_full_name: "None",
                      instagram_full_name: "None",
                      linkedin_full_name: "None",
                      tiktok_full_name: "None",
                      twitter_full_name: "None",
                      xing_full_name: "None",
                    },
                  },
                },
              }}
              handleCandidateChange={handleCandidateChange}
              handleMerge={handleMerge}
              primaryId={primaryId}
              source={source as never}
              sourceLink={getSocialMediaDetails}
              key="no-candidate"
              showSource={showSource}
            />
          }
        >
          <CandidateItem
            candidate={{
              id: source?.toLowerCase(),
              city: "",
              name: "None",
              profile_photo: "",
              primary: primary,
              search_id: "None",
              searched_at: new Date(),
              source: source,
              source_id: source,
              personal_details: {
                name: {
                  first_name: {
                    f_name: getPersonName(
                      person?.personal_details?.name,
                      "f_name",
                    )!,
                  },
                  last_name: {
                    l_name: getPersonName(
                      person?.personal_details?.name,
                      "l_name",
                    )!,
                  },
                  full_name: {
                    full_name: name ?? "",
                    linkedin_full_name: name!,
                  },
                },
                visuals: {
                  profile_photo: {
                    linkedin_profile_picture:
                      person?.personal_details?.visuals?.profile_photo
                        ?.profile_picture,
                  },
                },
              },
              network_signature: {
                url: {
                  linkedin_profile_url:
                    person?.network_signature?.url?.linkedin_profile_url,
                },
              },
            }}
            handleCandidateChange={handleCandidateChange}
            handleMerge={handleMerge}
            primaryId={primaryId}
            source={source?.toLowerCase() as never}
            sourceLink={getSocialMediaDetails}
            key="no-candidate"
            showSource={showSource}
          />
        </Display>
      </div>
      <div
        className={
          showButtonSeparately
            ? "hidden"
            : "bg-default/70 backdrop-blur-md flex w-full items-center justify-evenly mt-2 py-2 absolute bottom-0 place-content-end-safe"
        }
      >
        <Button
          type="submit"
          variant="ghost"
          isDisabled={!hasSelectedThisPlatform}
          className={button.ghost_accent}
        >
          <Icons.Check />
          {buttonText}
        </Button>
      </div>
    </Form>
  );
}
