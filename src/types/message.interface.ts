export type SocketMessage = {
  type: string;
  context: string;
  title: string;
  body: string;
  actions: SocketAction[];
};

export type SocketAction = {
  request_type: string;
  method: string;
  ident: string;
};
