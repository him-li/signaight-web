import { memo } from "react";
import { Avatar } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";

const CandidateAvatar = memo(
  ({ src }: { src: string }) => {
    return (
      <Avatar className="min-h-40 min-w-40 h-full object-cover place-self-center-safe self-center-safe rounded-none">
        <Avatar.Image alt="profile_picture" src={src} />
        <Avatar.Fallback>
          <Icons.Person />
        </Avatar.Fallback>
      </Avatar>
    );
  },
  (prev, next) => prev.src?.split("?")[0] === next.src?.split("?")[0],
);

export default CandidateAvatar;
