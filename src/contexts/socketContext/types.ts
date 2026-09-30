export interface SignAIghtAction {
  request_type: string; // e.g., "http"
  method: string;
  ident: string;
}

export interface SignAIghtMessage {
  type: string; // "info" | "error" | ...
  context: string; // e.g., "urn:signaight:persons:uuid:..."
  title: string;
  body: string;
  actions?: SignAIghtAction[];
}

export interface SignAIghtEnvelope {
  message: SignAIghtMessage;
}
