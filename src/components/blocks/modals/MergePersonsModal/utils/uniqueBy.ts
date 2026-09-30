export function uniqueBy<T>(
  items: T[],
  keyFn: (item: T) => string | number,
): T[] {
  const map = new Map<string | number, T>();
  for (const item of items) {
    map.set(keyFn(item), item);
  }
  return Array.from(map.values());
}
