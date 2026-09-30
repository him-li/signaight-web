import { useMemo } from "react";
import { Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Display from "@/components/atoms/Display";
import { getPersonName } from "@/utils/getPersonName";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import Capitalize from "@/utils/capitalize";
import { extractPrefixes } from "@/utils/getPersonName";
import type { Name } from "@/types/person/personal_details/name.interface";
import { MatchedProfiles } from "@/types/person/network_signature/matched_profiles.interface";
import { extractNames } from "@/components/blocks/EnrichmentCenter/utils";

interface NameProps {
  name?: Name;
  showAllNames?: boolean;
  groupDuplication?: boolean;
  fallback?: string;
  matchedProfiles: MatchedProfiles;
}

export default function Name({
  name,
  showAllNames = false,
  groupDuplication = false,
  matchedProfiles,
}: NameProps) {
  const primaryNames = useMemo(
    () => extractNames(matchedProfiles),
    [matchedProfiles],
  );

  if (!name) return null;
  const primary =
    getPersonName(name, "full_name") ||
    getPersonName(name, "f_name") ||
    getPersonName(name, "l_name");

  const getVal = (partObj: unknown, key: string): string | undefined => {
    if (!partObj) return undefined;
    const v = partObj[key as keyof typeof partObj] as string | undefined;
    return typeof v === "string" && v.trim() ? v.trim() : undefined;
  };

  const sources: Array<{ source: string; value: string }> = [];
  const prefixes = new Set<string>();

  if (name.first_name) {
    extractPrefixes(name.first_name, "f_name").forEach((p) => prefixes.add(p));
  }
  if (name.middle_name) {
    extractPrefixes(name.middle_name, "mid_name").forEach((p) =>
      prefixes.add(p),
    );
  }
  if (name.last_name) {
    extractPrefixes(name.last_name, "l_name").forEach((p) => prefixes.add(p));
  }
  if (name.full_name) {
    extractPrefixes(name.full_name, "full_name").forEach((p) =>
      prefixes.add(p),
    );
  }

  for (const prefix of prefixes as any) {
    const keyPrefix = prefix ? `${prefix}_` : "";

    const f = getVal(name?.first_name, `${keyPrefix}f_name`);
    const m = getVal(name?.middle_name, `${keyPrefix}mid_name`);
    const l = getVal(name?.last_name, `${keyPrefix}l_name`);
    const full = getVal(name?.full_name, `${keyPrefix}full_name`);

    let combined: string | undefined;

    if (full) {
      combined = full;
    } else {
      const parts = [f, m, l].filter(Boolean);
      combined = parts.length ? parts.join(" ") : undefined;
    }

    if (combined) {
      sources.push({
        source: prefix || "primary",
        value: combined,
      });
    }
  }

  const groupMap: Record<string, Set<string>> = {};
  for (const { value, source } of [...sources, ...primaryNames]) {
    if (!groupMap[value]) groupMap[value] = new Set();
    groupMap[value].add(source);
  }

  const grouped = Object.entries(groupMap);

  return (
    <Display when={name} fallback={<></>}>
      <Display
        when={!showAllNames}
        fallback={
          <Display
            when={!groupDuplication}
            fallback={grouped.map(([value, platforms]) => (
              <Tooltip key={value}>
                <Tooltip.Content>
                  {Array.from(platforms).map((p) => (
                    <div key={p}>{Capitalize(p)}</div>
                  ))}
                </Tooltip.Content>
                <Tooltip.Trigger>
                  <Snippet
                    symbol={Array.from(platforms).map((platform) => {
                      const Icon = getSocialMediaIcon(platform);
                      return <Icon key={platform} />;
                    })}
                    // classNames={{
                    //   pre: "flex items-center gap-1  text-foreground text-xs",
                    //   base: "bg-transparent gap-0 p-0",
                    //   copyButton: value ? "" : "hidden",
                    //   content: "truncate max-w-[100px]",
                    //   symbol: "flex gap-1",
                    // }}
                  >
                    {value}
                  </Snippet>
                </Tooltip.Trigger>
              </Tooltip>
            ))}
          >
            {sources.map((item, index) => {
              const Icon = getSocialMediaIcon(item.source);
              return (
                <Tooltip key={item.value + item.source + index}>
                  <Tooltip.Content>{Capitalize(item.source)}</Tooltip.Content>
                  <Tooltip.Trigger>
                    <Snippet
                      symbol={<Icon />}
                      // classNames={{
                      //   pre: "flex items-center gap-1  text-foreground text-xs",
                      //   base: "bg-transparent gap-0 p-0",
                      //   copyButton: item.value !== "" ? "" : "hidden",
                      //   content: "truncate max-w-[100px]",
                      // }}
                    >
                      {item.value}
                    </Snippet>
                  </Tooltip.Trigger>
                </Tooltip>
              );
            })}
          </Display>
        }
      >
        <Snippet
          hideSymbol
          // classNames={{
          //   pre: "flex items-center gap-1  text-foreground text-xs",
          //   base: "bg-transparent gap-0 p-0",
          //   copyButton: primary !== "" ? "" : "hidden",
          //   content: "truncate max-w-[100px]",
          // }}
        >
          {primary}
        </Snippet>
      </Display>
    </Display>
  );
}
