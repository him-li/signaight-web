// db.ts
import { openDB } from "idb";

const DB_NAME = "signaight_cache_db";
const STORE_NAME = "cache";

export async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function getCache<T>(
  key: string,
): Promise<{ data: T; timestamp: number } | null> {
  const db = await getDb();
  return (await db.get(STORE_NAME, key)) || null;
}

export async function setCache<T>(
  key: string,
  value: { data: T; timestamp: number },
) {
  const db = await getDb();
  await db.put(STORE_NAME, value, key);
}

export async function deleteCache(key: string) {
  const db = await getDb();
  await db.delete(STORE_NAME, key);
}

export async function getAllKeys(): Promise<string[]> {
  const db = await getDb();
  return (await db.getAllKeys(STORE_NAME)).map(String);
}
