/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { PersonsMergeReducer, initPersonsMergeState } from "./reducer";
import {
  MergePersonsSteps,
  PersonsMergeContextProps,
  PersonsMergeContextTypes,
} from "./types";
import PersonsService from "@/services/personsService";
import { useAppSelector } from "@/store/store";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { MergePersonsRequest } from "@/types/requests/mergePersons";
import { toast } from "@heroui/react";
import { useSearchParamsActions } from "../searchParamsContext/SearchParamsContext";
import { BackdropLoader } from "@/components/blocks/BackdropLoader/BackdropLoader";
const actionsList = {
  setCurrentStep: (d: MergePersonsSteps) => {},
  getPersonsDetails: (v: string[]) => {},
  mergePersons: (
    v: Omit<MergePersonsRequest, "person_ids" | "project_id">,
  ) => {},
};

const PersonsMergeStateContext = React.createContext<PersonsMergeContextProps>({
  ...initPersonsMergeState,
});

const PersonsMergeActionsContext = React.createContext(actionsList);

type PersonsMergeProviderProps = object;

const PersonsMergeProvider: React.FC<
  PropsWithChildren<PersonsMergeProviderProps>
> = ({ children }) => {
  const [isMerging, setIsMerging] = useState(false);
  const { refresh } = useSearchParamsActions();
  const token = useAppSelector(getTokenSelector);
  const [state, dispatch] = React.useReducer(
    PersonsMergeReducer,
    initPersonsMergeState,
  );

  const setCurrentStep = useCallback((data: MergePersonsSteps) => {
    dispatch({
      type: PersonsMergeContextTypes.SET_CURRENT_STEP,
      payload: {
        data,
      },
    });
  }, []);

  const getPersonsDetails = useCallback(async (data: string[]) => {
    const personsData = await Promise.all(
      data.map((id) => PersonsService.getPerson(id, token)),
    );
    dispatch({
      type: PersonsMergeContextTypes.SET_PERSONS_TO_MERGE,
      payload: {
        data: personsData,
      },
    });
  }, []);

  const mergePersons = useCallback(
    async (data: Omit<MergePersonsRequest, "person_ids" | "project_id">) => {
      try {
        setIsMerging(true);
        const personIds = state.personsToMerge.map((p) => p.id!);
        const projectId = state.personsToMerge[0]?.project!.id!;
        const updatedData: MergePersonsRequest = {
          ...data,
          merged_person: {
            ...data.merged_person,
          },
          person_ids: personIds,
          project_id: projectId,
        };
        const result = await PersonsService.mergePersons(updatedData, token);
        toast.success("Merge seccess", {
          description: "The merge process has been completed successfully.",
        });
        refresh();
      } catch (error) {
        toast.danger("Merge error", {
          description:
            "The merge failed due to a temporary issue. Please try again.",
        });
      } finally {
        setIsMerging(false);
      }
    },
    [state.personsToMerge],
  );

  const value = useMemo(() => state, [state]);

  const actions = useMemo(
    () => ({ setCurrentStep, getPersonsDetails, mergePersons }),
    [setCurrentStep, getPersonsDetails, mergePersons],
  );

  return (
    <PersonsMergeActionsContext.Provider value={actions}>
      <PersonsMergeStateContext.Provider value={value}>
        {children}
        <BackdropLoader
          isOpen={isMerging}
          text="Merging persons, please wait…"
        />
      </PersonsMergeStateContext.Provider>
    </PersonsMergeActionsContext.Provider>
  );
};

function usePersonsMergeState() {
  const context = React.useContext(PersonsMergeStateContext);
  if (context === undefined) {
    throw new Error(
      "usePersonsMergeState must be used within a PersonsMergeProvider",
    );
  }
  return context;
}
function usePersonsMergeActions() {
  const context = React.useContext(PersonsMergeActionsContext);
  if (context === undefined) {
    throw new Error(
      "usePersonsMergeActions must be used within a PersonsMergeProvider",
    );
  }
  return context;
}

export default PersonsMergeProvider;

export { usePersonsMergeState, usePersonsMergeActions };
