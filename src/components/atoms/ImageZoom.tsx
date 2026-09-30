import { Tooltip } from "@heroui/react";
import Image from "next/image";
import type { ReactNode } from "react";

type ImageZoomProps = {
  children: ReactNode;
  src?: string;
  isDisabled?: boolean;
};

export default function ImageZoom({
  children,
  src,
  isDisabled = false,
}: ImageZoomProps) {
  if (!src || src === "") return children;
  return (
    <Tooltip delay={750} isDisabled={isDisabled}>
      <Tooltip.Content placement="left" className="bg-transparent shadow-none">
        <Image
          alt={src ? src : ""}
          src={src ? src : ""}
          width={300}
          height={300}
          className="rounded-full"
        />
      </Tooltip.Content>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
    </Tooltip>
  );
}
