"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, Label, TextField } from "@heroui/react";
import { FaTimes } from "react-icons/fa";
import PersonsService from "@/services/personsService";
import type { Person, PersonQuery } from "@/types/person/index.interface";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import { modal } from "styles/styles";
import { personDisplayName, SEARCH_DEBOUNCE_MS } from "./types";

export type ProfileBSearchProps = {
  /** Currently selected person ID (stored in the form field). */
  value: string;
  /** Called with the selected person's ID, or "" when cleared. */
  onChange: (id: string) => void;
  /** Called with the full Person object for the A→B header, or null when cleared. */
  onPersonSelect: (person: Person | null) => void;
  projectId?: string;
  token: string | null;
  personAId?: string;
  disabled?: boolean;
  error?: string;
};

const PersonResultItem = memo(
  function PersonResultItem({
    person,
    onSelect,
  }: {
    person: Person;
    onSelect: (p: Person) => void;
  }) {
    const name = personDisplayName(person);
    const avatar = getPersonAvatar(
      person.personal_details?.visuals?.profile_photo,
    );
    return (
      <button
        type="button"
        onMouseDown={() => onSelect(person)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-default-100 text-left transition-colors"
      >
        <Avatar size="sm" className="shrink-0 rounded-full">
          {avatar && <Avatar.Image src={avatar} alt={name} />}
          <Avatar.Fallback className="text-xs">
            {name.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
        <span className="text-sm">{name}</span>
      </button>
    );
  },
  (prev, next) => {
    if (prev.onSelect !== next.onSelect) return false;
    if (prev.person.id !== next.person.id) return false;
    const prevAvatar = getPersonAvatar(
      prev.person.personal_details?.visuals?.profile_photo,
    );
    const nextAvatar = getPersonAvatar(
      next.person.personal_details?.visuals?.profile_photo,
    );
    return prevAvatar?.split("?")[0] === nextAvatar?.split("?")[0];
  },
);

export default function ProfileBSearch({
  value,
  onChange,
  onPersonSelect,
  projectId,
  token,
  personAId,
  disabled,
  error,
}: ProfileBSearchProps) {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When form value is cleared externally (e.g. modal reset), clear display text
  useEffect(() => {
    if (!value) {
      setInputText("");
      setResults([]);
    }
  }, [value]);

  // ── Fetch helpers ──────────────────────────────────────────────────────────

  const fetchPersons = useCallback(
    async (query: Partial<PersonQuery>, pageSize: number) => {
      if (!projectId || !token) return [];
      const res = await PersonsService.getPersonsByProject({
        project_id: projectId,
        searchQuery: query as PersonQuery,
        token,
        pageSize,
      });
      return res.items.filter((p) => p.id !== personAId);
    },
    [projectId, token, personAId],
  );

  // Load initial suggestions on focus (no text needed)
  const handleFocus = useCallback(async () => {
    if (value || inputText.trim() || results.length > 0) return;

    setIsSearching(true);
    try {
      setResults(await fetchPersons({}, 7));
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [value, inputText, results.length, fetchPersons]);

  /**
   * Builds results by searching first name, last name, or email depending
   * on the shape of the input:
   *   - Contains "@"           → email_address__like (1 request)
   *   - Multi-word ("John Doe") → f_name__like + l_name__like AND query (1 request)
   *   - Single word             → parallel f_name + l_name, merged & deduped (2 requests)
   */
  const multiFieldSearch = useCallback(
    async (text: string): Promise<Person[]> => {
      const trimmed = text.trim();

      // ── Email ──────────────────────────────────────────────────────────────
      if (trimmed.includes("@")) {
        return fetchPersons({ email_address__like: trimmed }, 20);
      }

      // ── "First Last" → single AND query ───────────────────────────────────
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const [first, ...rest] = parts;
        return fetchPersons(
          { f_name__like: first, l_name__like: rest.join(" ") },
          20,
        );
      }

      // ── Single word → search first name OR last name in parallel ──────────
      const [byFirst, byLast, emailResults] = await Promise.all([
        fetchPersons({ f_name__like: trimmed }, 10).catch(() => [] as Person[]),
        fetchPersons({ l_name__like: trimmed }, 10).catch(() => [] as Person[]),
        fetchPersons({ email_address__like: trimmed }, 10).catch(
          () => [] as Person[],
        ),
      ]);

      // Merge and deduplicate by id, cap at 20
      const seen = new Set<string>();
      const merged: Person[] = [];
      for (const p of [...byFirst, ...byLast, ...emailResults]) {
        if (p.id && !seen.has(p.id)) {
          seen.add(p.id);
          merged.push(p);
          if (merged.length === 20) break;
        }
      }
      return merged;
    },
    [fetchPersons],
  );

  // Debounced search as user types
  const runSearch = useCallback(
    (text: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      setIsSearching(true);
      timerRef.current = setTimeout(async () => {
        try {
          const results = text.trim()
            ? await multiFieldSearch(text)
            : await fetchPersons({}, 7);
          setResults(results);
        } catch {
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      }, SEARCH_DEBOUNCE_MS);
    },
    [multiFieldSearch, fetchPersons],
  );

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleTextChange = useCallback(
    (text: string) => {
      setInputText(text);
      if (value) {
        onChange("");
        onPersonSelect(null);
      }
      runSearch(text);
    },
    [value, onChange, onPersonSelect, runSearch],
  );

  const handleSelect = useCallback(
    (person: Person) => {
      setInputText(personDisplayName(person));
      setResults([]);
      onChange(person.id!);
      onPersonSelect(person);
    },
    [onChange, onPersonSelect],
  );

  const handleClear = useCallback(() => {
    setInputText("");
    setResults([]);
    if (timerRef.current) clearTimeout(timerRef.current);
    onChange("");
    onPersonSelect(null);
  }, [onChange, onPersonSelect]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end gap-2">
        <div className="relative flex-1" onFocus={handleFocus}>
          <TextField
            value={inputText}
            onChange={handleTextChange}
            isDisabled={disabled}
            aria-label="Search Profile B"
          >
            <Label>Profile B</Label>
            <Input placeholder="Search by name or email…" />
          </TextField>

          {isSearching && (
            <p className="absolute left-0 top-full mt-1 text-xs text-default-400 ps-1">
              Searching…
            </p>
          )}

          {!isSearching && results.length > 0 && (
            <div
              className={`absolute left-0 top-full z-50 mt-1 w-full flex flex-col rounded-xl overflow-hidden border border-default-200 bg-white overflow-y-auto max-h-60`}
            >
              {results.map((p) => (
                <PersonResultItem
                  key={p.id}
                  person={p}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>

        {value && (
          <Button
            isIconOnly
            variant="ghost"
            type="button"
            onPress={handleClear}
            aria-label="Clear selection"
            className="shrink-0 mb-0.5"
          >
            <FaTimes size={12} />
          </Button>
        )}
      </div>

      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
}
