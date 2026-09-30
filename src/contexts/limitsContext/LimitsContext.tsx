/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { PropsWithChildren, useCallback, useMemo } from "react";
import {
  IActionType,
  IKind,
  ILimitsResponse,
} from "@/types/responses/limitsResponse";
import LimitsService from "@/services/limitsService";
import { useAppSelector } from "@/store/store";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { useLimitsMessageModal } from "@/components/blocks/modals/LimitsMessageModal/useLimitsMessageModal";

export type IHandlePersonsLimitsParams = {
  successCb: () => void;
  errorCb: () => void;
  personsCount: number;
};

const actionsList = {
  getLimits: (action: IActionType, kind: IKind): Promise<ILimitsResponse> =>
    Promise.resolve({} as ILimitsResponse),
  handlePersonsLimits: (p: IHandlePersonsLimitsParams) => {},
};

const LimitsActionsContext = React.createContext(actionsList);

type LimitsProviderProps = object;

function LimitsProvider({ children }: PropsWithChildren<LimitsProviderProps>) {
  const token = useAppSelector(getTokenSelector);
  const { modal, setOpenModal } = useLimitsMessageModal();

  const getLimits = useCallback(
    async (action: IActionType, kind: IKind) => {
      const result = await LimitsService.getLimits(action, kind, token);
      return result;
    },
    [token],
  );

  const handlePersonsLimits = useCallback(
    async ({
      successCb,
      errorCb,
      personsCount,
    }: IHandlePersonsLimitsParams) => {
      const r = await getLimits("create", "api.v1.persons");

      if (
        r.allow &&
        r.limits - r.current < personsCount &&
        r.limits - r.current !== 0
      ) {
        setOpenModal({
          message: `After submitting, our system will search for a maximum of ${r.limits - r.current} persons from your list. If you require any help, please <a class="underline" href="mailto:${process.env.NEXT_PUBLIC_EMAILS_FROM_EMAIL ?? "info@signaight.ai"}?subject=Maximum person of searching limit">contact us</a>.`,
          cb: () => {
            successCb();
          },
        });
      } else if (
        (r.allow && !r.limits && !r.current) ||
        (r.allow && r.limits - r.current >= personsCount)
      ) {
        successCb();
      } else {
        setOpenModal({
          message: `Search unavailable: you either don’t have permission or have reached your search limit (${r.limits} searches per day). If you require any help, please <a class="underline" href="mailto:${process.env.NEXT_PUBLIC_EMAILS_FROM_EMAIL ?? "info@signaight.ai"}?subject=Search unavailable">contact us</a>.`,
          cb: () => {
            errorCb();
          },
        });
      }
    },
    [getLimits, setOpenModal],
  );

  const actions = useMemo(
    () => ({ getLimits, handlePersonsLimits }),
    [getLimits, handlePersonsLimits],
  );

  return (
    <LimitsActionsContext.Provider value={actions}>
      {children}
      {modal}
    </LimitsActionsContext.Provider>
  );
}

function useLimitsActions() {
  const context = React.useContext(LimitsActionsContext);
  if (context === undefined) {
    throw new Error("useLimitsActions must be used within a LimitsProvider");
  }
  return context;
}

export default LimitsProvider;

export { useLimitsActions };
