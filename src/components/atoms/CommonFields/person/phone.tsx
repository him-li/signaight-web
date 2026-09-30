"use client";
import { useMemo } from "react";
import { Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Display from "@/components/atoms/Display";
import { Icons } from "@/components/atoms/Icons";
import Capitalize from "@/utils/capitalize";
import NotFound from "@/components/atoms/Icons/NotFound";
import { getPersonPhones, getPrimaryPhone } from "@/utils/getPersonPhone";
import type { Phone } from "@/types/person/personal_details/phone.interface";

type PhoneProps = {
  phone?: Phone;
  hideSymbol?: boolean;
  isEntryPoint?: boolean;
  showAllPhones?: boolean;
  hideNotFound?: boolean;
};

export default function Phone({
  phone,
  hideSymbol,
  isEntryPoint,
  showAllPhones = false,
  hideNotFound = true,
}: PhoneProps) {
  const allPhones = useMemo(() => getPersonPhones(phone), [phone]);
  const primaryPhone = useMemo(() => getPrimaryPhone(phone), [phone]);

  return (
    <Display
      when={allPhones.length > 0}
      fallback={
        <Display
          when={hideNotFound}
          fallback={<NotFound size={100} text="No Phone Numbers Detected" />}
        >
          <></>
        </Display>
      }
    >
      <Display
        when={!showAllPhones}
        fallback={allPhones.map(({ value, source }, index) => (
          <Tooltip key={value + source + index}>
            <Tooltip.Content>
              {isEntryPoint && value === phone?.phones?.[0] && (
                <div>Initial Input</div>
              )}
              <div>{Capitalize(source)}</div>
              <div>{value}</div>
            </Tooltip.Content>
            <Tooltip.Trigger>
              <Snippet
                hideSymbol={hideSymbol ?? true}
                symbol={
                  isEntryPoint && value === phone?.phones?.[0] ? (
                    <Icons.EntryPoint fill="teal" />
                  ) : (
                    <Icons.Phone />
                  )
                }
                // classNames={{
                //   pre: "flex items-center gap-1  text-foreground",
                //   base: "bg-transparent gap-0 p-0",
                //   copyButton: value !== "" ? "" : "hidden",
                //   content: "truncate max-w-25 text-xs",
                // }}
              >
                {value}
              </Snippet>
            </Tooltip.Trigger>
          </Tooltip>
        ))}
      >
        {primaryPhone && (
          <Tooltip>
            <Tooltip.Content>
              {isEntryPoint && primaryPhone.value === phone?.phones?.[0] && (
                <div>Initial Input</div>
              )}
              <div>{primaryPhone.value}</div>
            </Tooltip.Content>
            <Tooltip.Trigger>
              <Snippet
                hideSymbol={hideSymbol ?? true}
                symbol={
                  isEntryPoint ? (
                    <Icons.EntryPoint fill="teal" />
                  ) : (
                    <Icons.Phone />
                  )
                }
                // classNames={{
                //   pre: "flex items-center gap-1  text-foreground",
                //   base: "bg-transparent gap-0 p-0",
                //   copyButton: primaryPhone.value !== "" ? "" : "hidden",
                //   content: "truncate max-w-25 text-xs",
                // }}
              >
                {primaryPhone.value}
              </Snippet>
            </Tooltip.Trigger>
          </Tooltip>
        )}
      </Display>
    </Display>
  );
}
