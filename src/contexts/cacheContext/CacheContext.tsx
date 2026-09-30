"use client";
import React, { createContext, useContext, useCallback } from "react";
import { getCache, setCache, deleteCache } from "@/utils/db";

// type CacheEntry<T> = {
//   data: T;
//   timestamp: number;
// };

type CacheContextType = {
  get: <T>(key: string) => Promise<T | null>;
  set: <T>(key: string, data: T) => Promise<void>;
  revalidate: <T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number,
  ) => Promise<T>;
  clear: (key: string) => Promise<void>;
};

const CacheContext = createContext<CacheContextType | null>(null);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const get = useCallback(async <T,>(key: string): Promise<T | null> => {
    const entry = await getCache<T>(key);
    return entry?.data ?? null;
  }, []);

  const set = useCallback(async <T,>(key: string, data: T) => {
    await setCache<T>(key, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  const revalidate = useCallback(
    async <T,>(
      key: string,
      fetcher: () => Promise<T>,
      ttl = 5 * 60 * 1000,
    ): Promise<T> => {
      const entry = await getCache<T>(key);
      const now = Date.now();

      if (entry && now - entry.timestamp < ttl) {
        return entry.data;
      }

      const fresh = await fetcher();
      await set(key, fresh);
      return fresh;
    },
    [set],
  );

  const clear = useCallback(async (key: string) => {
    await deleteCache(key);
  }, []);

  return (
    <CacheContext.Provider value={{ get, set, revalidate, clear }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const ctx = useContext(CacheContext);
  if (!ctx) throw new Error("useCache must be used inside CacheProvider");
  return ctx;
};
