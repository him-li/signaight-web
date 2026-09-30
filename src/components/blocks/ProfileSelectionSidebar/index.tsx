"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeSpinner, openSpinner } from "@/store/pageLoadingSlice";
import {
  fetchCandidates,
  resetState,
  setFlows,
} from "@/store/profileSelectSlice";
import {
  selectProfileSelectFlowsSource,
  selectProfileSelectProfileSelected,
  selectProfileSelectSubjectDataId,
} from "@/store/profileSelectSlice/profileSelect.selectors";
import { Modal, toast } from "@heroui/react";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import Display from "@/components/atoms/Display";
import {
  selectProfileSelectCandidates,
  selectProfileSelectProfilePhoto,
  selectProfileSelectSubjectData,
} from "@/store/profileSelectSlice/profileSelect.selectors";
import SocialConnectionsFullListSkeleton from "../skeletons/SocialConnectionsFullListSkeleton";
import Leaks from "@/components/atoms/CommonFields/person/OnlineFootprint/Leaks";
import Profile from "@/components/atoms/CommonFields/person/profile";
import CandidateForm from "./CandidateForm";
import { modal } from "styles/styles";
const SocialConnections = dynamic(
  () => import("@/components/atoms/SocialConnections"),
  {
    ssr: false,
    loading: () => <SocialConnectionsFullListSkeleton />,
  },
);
export const EXCLUDED_SOURCES = [
  "darknet",
  "darkweb",
  "leaks",
  "metadata",
  "facebook_grfx",
];

export default function ProfileSelection() {
  const dispatch = useAppDispatch();
  const profileSelected = useAppSelector(selectProfileSelectProfileSelected);
  const subjectDataId = useAppSelector(selectProfileSelectSubjectDataId);
  const source = useAppSelector(selectProfileSelectFlowsSource);
  const candidates = useAppSelector(selectProfileSelectCandidates);
  const profilePhoto = useAppSelector(selectProfileSelectProfilePhoto);
  const person = useAppSelector(selectProfileSelectSubjectData)!;
  const getCandidates = async () => {
    try {
      dispatch(openSpinner());
      await dispatch(fetchCandidates({ personId: subjectDataId, source }));
      dispatch(closeSpinner());
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      toast.danger(error.name, { description: error.message });
    }
  };

  useEffect(() => {
    if (source) {
      getCandidates();
    }
  }, [source]);

  const handleDrawerClose = () => {
    dispatch(resetState());
    dispatch(setFlows([""]));
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={profileSelected} onOpenChange={handleDrawerClose}>
        <Modal.Container size="lg" scroll="inside">
          <Modal.Dialog
            className={modal.base + " relative overflow-hidden px-0 pb-0"}
          >
            <Modal.CloseTrigger />
            <BlurredBackground alt="profilephoto" src={profilePhoto} />
            <Modal.Header className="flex flex-col justify-start ps-8">
              <Modal.Heading>Review possible accounts</Modal.Heading>
              {candidates.some((candidate) => candidate.resource === "fixture") && (
                <p className="text-sm text-warning">Demo candidates only — no live social accounts were queried.</p>
              )}
              <div className="flex flex-col items-start">
                <Profile
                  person={person}
                  hideLocation
                  hidePhone={false}
                  textSize="lg"
                />
                <div className="flex py-2 gap-2 justify-center">
                  <SocialConnections person={person} profileSelection={true} />
                </div>
              </div>
            </Modal.Header>
            <Modal.Body className="gap-1 w-full flex flex-row flex-wrap">
              <Display
                when={EXCLUDED_SOURCES.includes(source)}
                fallback={
                  <CandidateForm
                    candidates={candidates}
                    source={source}
                    person={person}
                    buttonText="Confirm"
                    primary={true}
                  />
                }
              >
                <Leaks person={candidates[0]} />
              </Display>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
