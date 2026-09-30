export interface ICache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  reinitialize?(): Promise<void> | void;
}

// Factory – never import server impl at module top level
export function createCache(): ICache {
  if (typeof window === "undefined") {
    // Server path
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return new (require("./server").ServerCache)();
  } else {
    // Browser path
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return new (require("./client").BrowserCache)();
  }
}
