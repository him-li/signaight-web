import { memo } from "react";
import { Avatar } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";

const PersonImage = memo(
  ({ src, alt }: { src: string; alt: string }) => {
    return (
      <Avatar className="rounded-full w-20 h-20">
        <Avatar.Image src={src} alt={alt} />
        <Avatar.Fallback>
          <Icons.Person />
        </Avatar.Fallback>
      </Avatar>
    );
  },
  (prev, next) => prev.src?.split("?")[0] === next.src?.split("?")[0],
);

export default PersonImage;
