import Link from "next/link";
import { Accordion, Button, Separator, Popover } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import { Icons } from "@/components/atoms/Icons";
import { socialMediaIcon } from "@/constants/socialMediaIcon";
import ImageZoom from "@/components/atoms/ImageZoom";
import type { Interests } from "@/types/person/interests.interface";
import { modal } from "styles/styles";
type InterestsProps = { interests?: Interests };

export default function InterestsAndGroups({ interests }: InterestsProps) {
  const hasPages = (interests?.pages?.length ?? 0) > 0;
  const hasTelegramGroups =
    (interests?.groups?.telegram_groups?.length ?? 0) > 0;
  return (
    <Accordion
      hideSeparator
      allowsMultipleExpanded
      defaultExpandedKeys={["1", "2"]}
    >
      <Accordion.Item
        id="1"
        key="1"
        aria-label="Facebook Pages"
        className={hasPages ? "" : "hidden"}
      >
        <Accordion.Heading className="text-sm font-medium">
          <Accordion.Trigger className="gap-2">
            <socialMediaIcon.facebook />
            Facebook Pages
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="flex flex-col text-xs text-foreground">
            {interests?.pages?.map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                {page.fb_page_url ? (
                  <div className="flex items-center-safe">
                    <Link href={page.fb_page_url} target="_blank">
                      {page.fb_page_name ?? ""}
                    </Link>
                    <Snippet
                      hideContent
                      hideSymbol
                      // classNames={{ base: "border-none", pre: "hidden" }}
                    >
                      {page.fb_page_url}
                    </Snippet>
                  </div>
                ) : (
                  (page.fb_page_name ?? "")
                )}
                {(page.fb_page_profile_photo || page.fb_page_cover_photo) && (
                  <ImageZoom
                    src={page.fb_page_profile_photo ?? page.fb_page_cover_photo}
                  >
                    <img
                      src={
                        page.fb_page_profile_photo ?? page.fb_page_cover_photo
                      }
                      width={30}
                      height={30}
                      alt={page.fb_page_name}
                      className="rounded-full"
                    />
                  </ImageZoom>
                )}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        id="1"
        key="2"
        aria-label="Telegram Groups"
        className={hasTelegramGroups ? "" : "hidden"}
      >
        <Accordion.Heading className="text-sm font-medium">
          <Accordion.Trigger className="gap-2">
            <socialMediaIcon.tgm />
            Telegram Groups
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="flex flex-col text-xs text-foreground gap-2">
            {interests?.groups?.telegram_groups?.map((group, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{group?.title}</p>
                  <p>{group?.telegram_public_group_screen_name}</p>
                  {group.lastseen ? (
                    <p>
                      Last seen:{" "}
                      {new Date(group?.lastseen)?.toLocaleString("en-GB", {
                        timeZone: "Asia/Jerusalem",
                      })}
                    </p>
                  ) : null}
                </div>
                {group.messages && (
                  <Popover>
                    <Button
                      isIconOnly
                      className="rounded-full"
                      variant="tertiary"
                    >
                      <Icons.ChevronRight />
                    </Button>
                    <Popover.Content className={modal.base}>
                      <Popover.Dialog className="max-w-80 items-start">
                        {group.messages.map((message, index) => (
                          <div
                            key={index}
                            className="flex flex-col text-xs text-foreground gap-2 my-1"
                          >
                            <p className="text-pretty">{message.text}</p>
                            <p>{message.date}</p>
                            <Separator />
                          </div>
                        ))}
                      </Popover.Dialog>
                    </Popover.Content>
                  </Popover>
                )}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
