"use client";
import { memo, type ImgHTMLAttributes } from "react";
import clsx from "clsx";
import { BG_IMAGE_URL } from "@/constants/image";

interface BlurredBackgroundProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  zIndex?: string;
  overflow?: "hidden" | "visible";
  radius?: "none" | "sm" | "md" | "lg" | "full";
}

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

function BG({
  src,
  zIndex = "-z-10",
  overflow = "hidden",
  radius = "none",
  className,
  loading = "lazy",
  decoding = "async",
  ...imgProps
}: BlurredBackgroundProps) {
  const finalSrc = src && src !== "" ? src : BG_IMAGE_URL;

  return (
    <div
      className={clsx(
        "absolute inset-0 w-full h-full",
        overflow === "hidden" ? "overflow-hidden" : "overflow-visible",
        radiusMap[radius],
        zIndex,
      )}
    >
      <img
        src={finalSrc}
        alt="background"
        loading={loading}
        decoding={decoding}
        {...imgProps}
        className={clsx(
          "w-full h-full object-cover blur-3xl hover:scale-110 pointer-events-none select-none",
          className,
        )}
      />
    </div>
  );
}

const BlurredBackground = memo(
  BG,
  (prev, next) =>
    (prev.src ?? "").split("?")[0] === (next.src ?? "").split("?")[0],
);

export default BlurredBackground;
