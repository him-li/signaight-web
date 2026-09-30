"use client";
import { useEffect } from "react";
import { useSocket } from "./SocketContext";
import { SignAIghtEnvelope, SignAIghtMessage } from "./types";

type NamespaceHandlers = {
  [namespace: string]: (message: SignAIghtMessage) => void;
};

function extractNamespace(context: string): string {
  const parts = context.split(":");
  // e.g., ["urn", "signaight", "persons", "uuid", "..."]
  return parts.slice(1, 3).join(":"); // "signaight:persons"
}

export function useSocketMessageRouter(handlers: NamespaceHandlers) {
  const { onEvent, offEvent } = useSocket();

  useEffect(() => {
    const listener = (envelope: SignAIghtEnvelope) => {
      const message = envelope.message;
      const ns = extractNamespace(message.context);

      const handler = handlers[ns];
      if (handler) {
        handler(message);
      } else {
        console.warn(`⚠️ No handler for namespace: ${ns}`, message);
      }
    };

    onEvent<SignAIghtEnvelope>("message", listener);
    return () => offEvent("message");
  }, [handlers]);
}
