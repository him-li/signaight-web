/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchActiveSearches,
  fetchActiveSearchById,
} from "@/store/activeSearchSlice";
import { getRankingInfo } from "@/store/subjectsSlice";
import { setRecalculationStatus } from "@/store/projectsSlice";
import type { SocketMessage } from "@/types/message.interface";
import {
  messageActionIdents,
  messageActionMethods,
  messageActionReqTypes,
  messageTitles,
} from "@/constants";
import { toast } from "@heroui/react";
import { selectActiveSearch } from "@/store/activeSearchSlice/activeSearch.selectors";
import { useSocket } from "@/contexts/socketContext/SocketContext";

export default function Socket() {
  const [searchingIndicator, setSearchingIndicator] = useState<any>();
  const dispatch = useAppDispatch();
  const currentActiveSearchId = useAppSelector(selectActiveSearch)?.id;
  const { socket } = useSocket();

  const handleFetchProjects = () => {
    dispatch(fetchActiveSearches());
  };

  const handleInitiateRecalculation = async () => {
    dispatch(setRecalculationStatus(true));
  };

  const handleFinishRecalculation = async () => {
    dispatch(setRecalculationStatus(false));
  };

  const handleLoadingActiveSearch = () => {
    setSearchingIndicator(
      toast.info("Searching in Progress", {
        timeout: Infinity,
      }),
    );
    return searchingIndicator;
  };

  const handleFetchActiveSearch = async (payload: any) => {
    const parts = payload.context.split(":");
    const searchId = parts[parts.length - 1];
    dispatch(fetchActiveSearchById(searchId));
    setSearchingIndicator(undefined);
  };

  const handleFetchRanking = async () => {
    dispatch(getRankingInfo());
  };

  const initialSocket = async () => {
    if (socket) {
      try {
        socket.on("message", (payload: any) => {
          const message: SocketMessage = payload.message;
          const messageTitle = message.title;
          const messageActions = message.actions;
          for (const action of messageActions) {
            const requestType = action.request_type;
            const method = action.method;
            const ident = parseUrn(action.ident);

            switch (requestType) {
              case messageActionReqTypes.http: {
                switch (method) {
                  case messageActionMethods.get: {
                    switch (ident) {
                      case messageActionIdents.projects: {
                        handleFetchProjects();
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
          switch (messageTitle) {
            case messageTitles.updatedProject: {
              handleFetchRanking();
              handleInitiateRecalculation();
              break;
            }
            case messageTitles.searchFinished: {
              break;
            }
            case messageTitles.activeSearchInitiated: {
              handleLoadingActiveSearch();
              break;
            }
            case messageTitles.activeSearchFinished: {
              handleFetchActiveSearch(message);
              break;
            }
            case messageTitles.finishedRecalculation: {
              handleFinishRecalculation();
              break;
            }
            case messageTitles.addedPerson: {
              if (currentActiveSearchId) {
                dispatch(fetchActiveSearchById(currentActiveSearchId));
              }
              break;
            }
            default:
              break;
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      initialSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return null;
}

const parseUrn = (urn: string) => {
  const splittedUrn = urn.split(":");
  const splittedUrnLength = splittedUrn.length;
  if (splittedUrnLength === 3) return splittedUrn[2];
  else if (splittedUrnLength === 4) return splittedUrn;
};
