import { memo } from "react";
import { Avatar, Button, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";

const PersonAvatar = memo(
  ({ src, onOpen }: { src: string; onOpen: () => void }) => {
    return (
      <Tooltip>
        <Button
          aria-label="Change profile picture"
          className="h-auto rounded-full p-0"
          variant="ghost"
          onPress={onOpen}
        >
          <Avatar className="object-cover w-60 h-60 shadow-lg self-center-safe rounded-full">
            <Avatar.Image alt="Profile avatar" src={src} />
            <Avatar.Fallback>
              <Icons.Person />
            </Avatar.Fallback>
          </Avatar>
        </Button>
        <Tooltip.Content>Press to Change Profile Picture</Tooltip.Content>
      </Tooltip>
    );
  },
  (prev, next) => prev.src?.split("?")[0] === next.src?.split("?")[0],
);

PersonAvatar.displayName = "PersonAvatar";

export default PersonAvatar;
