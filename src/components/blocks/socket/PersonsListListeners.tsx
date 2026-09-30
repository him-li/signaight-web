"use client";
import { useRef } from "react";
import { FAILED_MESSAGE } from "@/constants/socketio";
import {
  usePersonActions,
  usePersonState,
} from "@/contexts/personContext/PersonContext";
import { useSocketMessageRouter } from "@/contexts/socketContext/useSocketMessageRouter";
import { getSearchesList } from "@/store/searchesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getRankingInfo, getSubjectAnalysis } from "@/store/subjectsSlice";
import { toast } from "@heroui/react";
import { SignAIghtMessage } from "@/contexts/socketContext/types";
import { getLeaderboardInfo } from "@/store/subjectsSlice/subjects.actions";
import EventsServices from "@/services/eventsServices";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { Search } from "@/types/search.interface";
import PersonsService from "@/services/personsService";

const CACHE_TTL = 30000;

function PersonsListListeners() {
  const { getPersons, updatePersonIfExists } = usePersonActions();
  const { pagination } = usePersonState();
  const token = useAppSelector(getTokenSelector);
  const dispatch = useAppDispatch();
  const eventBufferRef = useRef<{ [key: string]: SignAIghtMessage[] }>({});
  const lastRequestTimeRef = useRef<{ [key: string]: number }>({});

  const maybeTriggerGetPersons = async (key: string, searchId?: string) => {
    const now = Date.now();
    const currentTime = lastRequestTimeRef.current[key] || 0;
    const timeSinceLastRequest = now - currentTime;

    if (
      eventBufferRef.current[key]?.length > 0 &&
      timeSinceLastRequest > CACHE_TTL
    ) {
      if (searchId) {
        lastRequestTimeRef.current[key] = now;
        eventBufferRef.current[key] = [];
        const data: Search = await EventsServices.getSearch(searchId, token);
        const personId = data.persons_list?.[0];
        if (personId) {
          const person = await PersonsService.getPerson(
            personId as string,
            token,
          );
          if (person) {
            updatePersonIfExists({ ...person, _id: personId });
          }
        }
      }

      dispatch(getRankingInfo());
      dispatch(getLeaderboardInfo());
      dispatch(getSubjectAnalysis());
    }
  };

  const maybeTriggerGetSearches = (key: string) => {
    const now = Date.now();
    const currentTime = lastRequestTimeRef.current[key] || 0;
    const timeSinceLastRequest = now - currentTime;
    if (
      eventBufferRef.current[key]?.length > 0 &&
      timeSinceLastRequest > CACHE_TTL
    ) {
      dispatch(getSearchesList());
      lastRequestTimeRef.current[key] = now;
      eventBufferRef.current[key] = [];
    }
  };

  //   const handleSocketMessage = (msg: SignAIghtMessage) => {
  //   const key = msg.body;
  //   if (eventBufferRef?.current?.[key]) {
  //     eventBufferRef.current[key].push(msg);
  //   } else {
  //     eventBufferRef.current[key] = [msg];
  //   }
  //   maybeTriggerGetPersons(key);
  // };

  // useSocketMessageRouter({
  //   "signaight:persons": handleSocketMessage,
  // });

  useSocketMessageRouter({
    "signaight:events/search": (msg) => {
      const key = msg.body;
      if (eventBufferRef?.current?.[key]) {
        eventBufferRef.current[key].push(msg);
      } else {
        eventBufferRef.current[key] = [msg];
      }
      const splitted = msg.context.split(":");
      const searchId = splitted ? splitted[splitted?.length - 1] : "";
      maybeTriggerGetPersons(key, searchId);
      const keySearch = msg.body + "searches";
      if (eventBufferRef?.current?.[keySearch]) {
        eventBufferRef.current[keySearch].push(msg);
      } else {
        eventBufferRef.current[keySearch] = [msg];
      }
      maybeTriggerGetSearches(keySearch);
    },
  });
  useSocketMessageRouter({
    "signaight:persons_batch_deleted": (msg) => {
      getPersons({
        page: pagination.page,
        isAdd: false,
        withoutCache: true,
      });
      dispatch(getRankingInfo());
      if (msg.title.includes(FAILED_MESSAGE)) {
        toast.danger(msg.title, {
          description: msg.body,
        });
      } else {
        toast.success(msg.title, {
          description: msg.body,
        });
      }
    },
  });

  return null;
}

export default PersonsListListeners;
