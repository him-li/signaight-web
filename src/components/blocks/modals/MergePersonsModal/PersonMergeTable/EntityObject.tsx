/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasEntityArrays, isPlainObject, toHumanTitle } from "../utils";
import EntityArray from "./EntityArray";

export default function EntityObject({ value }: { value: any }) {
  if (!value) return null;

  if (isPlainObject(value) && hasEntityArrays(value)) {
    return (
      <div className="space-y-4">
        {Object.entries(value).map(([key, v]) => {
          if (Array.isArray(v) && v.length) {
            return (
              <div key={key}>
                <div className="text-xs font-semibol mb-1">
                  {toHumanTitle(key)}
                </div>
                <EntityArray value={v} />
              </div>
            );
          }

          // Skip non-array values at this level (verified, nulls, etc.)
          return null;
        })}
      </div>
    );
  }

  // 2️⃣ Plain object → show as key-value grid
  if (isPlainObject(value)) {
    const entries = Object.entries(value).filter(
      ([, v]) => v !== null && v !== undefined,
    );

    return (
      <div className="text-xs">
        {entries.map(([key, v]) =>
          v ? (
            <div key={key} className="contents">
              {/* Key */}
              <div className="font-medium">{toHumanTitle(key)}</div>

              {/* Value */}
              <div className="break-all">
                {isPlainObject(v) || Array.isArray(v)
                  ? JSON.stringify(v)
                  : String(v)}
              </div>
            </div>
          ) : null,
        )}
      </div>
    );
  }

  // 3️⃣ Fallback
  return (
    <pre className="text-xs p-2 rounded">{JSON.stringify(value, null, 2)}</pre>
  );
}
