import { SocialPlatforms, type IconBaseProps } from "@/components/atoms/Icons";
import type { ReactNode } from "react";
interface NotFoundProps extends IconBaseProps {
  blur?: "" | "0" | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  text?: string | ReactNode;
}
export default function NotFound({
  blur = "none",
  text,
  ...iconProps
}: NotFoundProps) {
  return (
    <div
      className={`flex flex-col grow m-auto w-full h-full justify-center items-center blur-${blur}`}
    >
      <SocialPlatforms.SignAIght
        opacity={0.2}
        size={iconProps.size ?? 400}
        {...iconProps}
      />
      {text}
    </div>
  );
}
