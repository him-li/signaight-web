/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FlowsState {
  loading: boolean;
  error: string | null;
  flowsList: any;
  flowRunning: boolean;
  selectedFlows: any[];
}
