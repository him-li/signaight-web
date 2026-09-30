"use client";
import { memo, type ImgHTMLAttributes } from "react";
import { Avatar } from "@heroui/react";

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

function AvatarComponent({ src, alt, ...imgProps }: AvatarImageProps) {
  return (
    <Avatar className="absolute top-0 start-0 w-full h-full rounded-none">
      <Avatar.Image alt={alt} src={src} />
    </Avatar>
  );
}

const AvatarImage = memo(
  AvatarComponent,
  (prev, next) =>
    (prev.src ?? "").split("?")[0] === (next.src ?? "").split("?")[0],
);

export default AvatarImage;
