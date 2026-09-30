"use client";
import { Tooltip, Card } from "@heroui/react";
import Image from "next/image";
import Display from "@/components/atoms/Display";
import { useState, type ReactNode } from "react";

export default function LinkPreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const [metadata, setMetadata] = useState<{
    title?: string;
    description?: string;
    image?: string;
  } | null>(null);

  const fetchMetadata = async () => {
    try {
      const res = await fetch(
        `/api/link-metadata?url=${encodeURIComponent(href)}`,
      );
      const json = await res.json();
      setMetadata(json);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Tooltip
      onOpenChange={(open) => {
        if (open && metadata == null) {
          fetchMetadata();
        }
      }}
    >
      <Tooltip.Content>
        <Display when={metadata} fallback="Loading...">
          <Card>
            <Card.Header className="flex-col items-start">
              <Card.Title className="font-bold text-large">
                {metadata?.title}
              </Card.Title>
              <Card.Description className="text-tiny">
                {metadata?.description}
              </Card.Description>
            </Card.Header>
            <Card.Content
              className={
                metadata?.image ? "visible overflow-visible py-2" : "hidden"
              }
            >
              <Image
                fill
                alt="Card background"
                className="object-cover rounded-xl"
                src={metadata?.image!}
              />
            </Card.Content>
          </Card>
        </Display>
      </Tooltip.Content>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
    </Tooltip>
  );
}
