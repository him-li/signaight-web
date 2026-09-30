"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Person } from "@/types/person/index.interface";
import { usePersonActions, usePersonState } from "./PersonContext";
import { SEARCH_QURIES } from "@/constants/search";

type Item = Person;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStatus = (item?: Item | null): string | null =>
  item?.search_state?.status ?? null;

const isInProgress = (item?: Item | null) =>
  typeof getStatus(item) === "string" &&
  getStatus(item)!.toLowerCase() === "in progress";

/**
 * Watches items; while any item is "In progress", call getPersons() every 30s.
 * Stops automatically when no items are "In progress".
 */
export function usePersonsAutoPolling(
  intervalMs = 30_000,
  immediateFirstTick = true,
) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const currentPage = params.get(SEARCH_QURIES.PAGE) ?? "1";
  const { getPersons } = usePersonActions();
  const { persons: items } = usePersonState();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const intervalRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);

  // derive whether we should be polling from current items
  const shouldPoll = useMemo(() => {
    if (!items || items.length === 0) return false;
    return items.some(isInProgress);
  }, [items]);

  console.log("usePersonsAutoPolling: shouldPoll =", shouldPoll);

  // single tick with overlap guard
  const tick = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      await getPersons({
        page: +currentPage,
        isAdd: false,
        withoutCache: true,
      });
      // no need to manually stop here; the effect below will react to items changing
    } catch (e) {
      setError(e);
      // choose to keep polling on transient errors
    } finally {
      inFlightRef.current = false;
      setIsLoading(false);
    }
  };

  // manage start/stop as items change
  useEffect(() => {
    // clear any existing interval first
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!shouldPoll) {
      setIsActive(false);
      return; // nothing to do
    }

    // start polling
    setIsActive(true);
    if (immediateFirstTick) void tick(); // fire once right away
    intervalRef.current = window.setInterval(() => {
      void tick();
    }, intervalMs);

    // cleanup when dependency changes or on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsActive(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPoll, intervalMs, currentPage]); // depends only on the derived flag, not on getPersons identity

  return { isActive, isLoading, error };
}
