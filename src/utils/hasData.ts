export function hasAnyNonEmptyStringOrArray(obj?: unknown): boolean {
  if (!obj) return false;

  return Object.values(obj).some((value) => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    if (Array.isArray(value)) {
      return value.some(
        (item) => typeof item === "string" && item.trim().length > 0,
      );
    }
    return false;
  });
}

export function hasDisplayableData(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return true;
  }
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (Array.isArray(value)) {
    return value.some(hasDisplayableData);
  }
  if (typeof value === "object") {
    return Object.values(value).some(hasDisplayableData);
  }

  return false;
}

export function hasValidHttpUrl(value?: string) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
