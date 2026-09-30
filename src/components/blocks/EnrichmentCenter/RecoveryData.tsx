import { Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Display from "@/components/atoms/Display";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { Icons } from "@/components/atoms/Icons";
import Capitalize from "@/utils/capitalize";
import NotFound from "@/components/atoms/Icons/NotFound";
import type { Email } from "@/types/person/personal_details/email.interface";
import type { Phone } from "@/types/person/personal_details/phone.interface";
import type { PersonalDetails } from "@/types/person/personal_details/index.interface";

type PartialItem = {
  source: string;
  type: "email" | "phone";
  value: string;
};

export default function RecoveryData({ person }: { person?: PersonalDetails }) {
  const extractPartialFields = (
    obj: Email | Phone,
    type: "email" | "phone",
  ): PartialItem[] => {
    if (!obj) return [];

    return Object.entries(obj).flatMap(([key, value]) => {
      if (!key.endsWith("_part")) return [];

      if (!Array.isArray(value)) return [];

      const source = key.replace(`_${type}_part`, "");

      return value.map((v) => ({
        source,
        type,
        value: v,
      }));
    });
  };

  const emailPartials = extractPartialFields(person?.email ?? {}, "email");
  const phonePartials = extractPartialFields(person?.phone ?? {}, "phone");

  if (
    (!emailPartials || emailPartials?.length < 1) &&
    (!phonePartials || phonePartials?.length < 1)
  )
    return <NotFound size={100} text="No Recovery Data Detected" />;

  return (
    <>
      <Display when={emailPartials.length > 0} fallback={<></>}>
        {emailPartials.map((partial, index) => {
          const Icon = getSocialMediaIcon(partial.source);
          return (
            <Tooltip key={partial.value + index}>
              <Tooltip.Trigger>
                <Snippet
                  symbol={
                    <div className="flex gap-1">
                      <Icon />
                      <Icons.Email />
                    </div>
                  }
                >
                  {partial.value}
                </Snippet>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Source: {Capitalize(partial.source)}</p>
                <p>Type: {Capitalize(partial.type)}</p>
                <p>{partial.value}</p>
              </Tooltip.Content>
            </Tooltip>
          );
        })}
      </Display>
      <Display when={phonePartials.length > 0} fallback={<></>}>
        {phonePartials.map((partial, index) => {
          const Icon = getSocialMediaIcon(partial.source);
          return (
            <Tooltip key={partial.value + index}>
              <Tooltip.Trigger>
                <Snippet
                  symbol={
                    <>
                      <Icon />
                      <Icons.Phone />
                    </>
                  }
                >
                  {partial.value}
                </Snippet>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Source: {Capitalize(partial.source)}</p>
                <p>Type: {Capitalize(partial.type)}</p>
                <p>{partial.value}</p>
              </Tooltip.Content>
            </Tooltip>
          );
        })}
      </Display>
    </>
  );
}
