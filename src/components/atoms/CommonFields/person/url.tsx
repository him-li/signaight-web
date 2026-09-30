import Link from "next/link";
import { Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import Display from "@/components/atoms/Display";
import Capitalize from "@/utils/capitalize";
import type { Url } from "@/types/person/network_signature/url.interface";

export default function SocialMedia({ urls }: { urls?: Url }) {
  const entries: Array<{ key: string; value: string }> = [];
  if (!urls) return;

  for (const [key, rawValue] of Object.entries(urls)) {
    if (!rawValue) continue;

    const values: string[] =
      typeof rawValue === "string"
        ? [rawValue]
        : Array.isArray(rawValue)
          ? Array.from(
              new Set(
                rawValue.filter(
                  (v) => typeof v === "string" && v.trim().length > 0,
                ),
              ),
            )
          : [];

    if (values.length === 0) continue;

    values.forEach((value) =>
      entries.push({
        key: key.split("_")[0],
        value: value.trim(),
      }),
    );
  }

  return (
    <Display when={urls} fallback={<></>}>
      {entries.map((item, index) => {
        const Icon = getSocialMediaIcon(item.key);
        return (
          <Tooltip key={index}>
            <Tooltip.Content>{Capitalize(item.key)}</Tooltip.Content>
            <Tooltip.Trigger>
              <Link href={item.value ?? item.value} target="_blank">
                <Snippet
                  symbol={<Icon />}
                  // classNames={{
                  //   pre: "flex items-center gap-1  text-foreground text-xs",
                  //   base: "bg-transparent gap-0 p-0",
                  //   copyButton: item.value !== "" ? "" : "hidden",
                  //   content: "max-w-[100px] text-ellipsis",
                  // }}
                >
                  {item.value}
                </Snippet>
              </Link>
            </Tooltip.Trigger>
          </Tooltip>
        );
      })}
    </Display>
  );
}
