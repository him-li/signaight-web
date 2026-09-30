"use client";
import { useMemo } from "react";
import { Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Display from "@/components/atoms/Display";
import { Icons } from "@/components/atoms/Icons";
import Capitalize from "@/utils/capitalize";
import NotFound from "@/components/atoms/Icons/NotFound";
import { getPersonEmail } from "@/utils/getPersonEmail";
import type { Email } from "@/types/person/personal_details/email.interface";

type EmailProps = {
  email?: Email;
  hideSymbol?: boolean;
  isEntryPoint?: boolean;
  showAllEmails?: boolean;
  hideNotFound?: boolean;
};

export default function Email({
  email,
  hideSymbol,
  isEntryPoint,
  showAllEmails = false,
  hideNotFound = true,
}: EmailProps) {
  const { allEmails, primaryEmail } = useMemo(
    () => getPersonEmail(email),
    [email],
  );

  return (
    <Display
      when={allEmails && allEmails.length > 0}
      fallback={
        <Display
          when={hideNotFound}
          fallback={<NotFound size={100} text="No Emails Detected" />}
        >
          <></>
        </Display>
      }
    >
      <Display
        when={!showAllEmails}
        fallback={allEmails.map(({ value, source }, index) => (
          <Tooltip key={value + source + index}>
            <Tooltip.Trigger>
              <Snippet
                hideSymbol={hideSymbol ?? true}
                symbol={
                  isEntryPoint && value === email?.email_address?.[0] ? (
                    <Icons.EntryPoint fill="teal" />
                  ) : (
                    <Icons.Email />
                  )
                }
                // classNames={{
                //   pre: "flex items-center gap-1  text-foreground text-xs",
                //   base: "bg-transparent gap-0 p-0",
                //   copyButton: value !== "" ? "" : "hidden",
                //   content: "truncate max-w-[100px]",
                // }}
              >
                {value}
              </Snippet>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {isEntryPoint && value === email?.email_address?.[0] ? (
                <div>Initial Input</div>
              ) : null}
              <div>{Capitalize(source)}</div>
              <div>{value}</div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <Snippet
              hideSymbol={hideSymbol ?? true}
              symbol={
                isEntryPoint ? (
                  <Icons.EntryPoint fill="teal" />
                ) : (
                  <Icons.Email />
                )
              }
              // classNames={{
              //   pre: "flex items-center gap-1  text-foreground text-xs",
              //   base: "bg-transparent gap-0 p-0",
              //   copyButton: primaryEmail.value !== "" ? "" : "hidden",
              //   content: "truncate max-w-[100px]",
              // }}
            >
              {primaryEmail.value}
            </Snippet>
          </Tooltip.Trigger>
          <Tooltip.Content>
            {isEntryPoint ? <div>Initial Input</div> : null}
            <div>{primaryEmail.value}</div>
          </Tooltip.Content>
        </Tooltip>
      </Display>
    </Display>
  );
}
