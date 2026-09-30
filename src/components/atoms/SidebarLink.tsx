import { Tooltip } from "@heroui/react";
import Link from "next/link";
import { type MouseEventHandler, JSX } from "react";

type SidebarLinkProps = {
  href: string;
  onPress: MouseEventHandler;
  withIcon?: boolean;
  icon?: JSX.Element;
  withTooltip?: boolean;
  tooltipText?: string;
  tooltipDisabled?: boolean;
  mb?: number;
  fontSize?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export default function SidebarLink({
  href,
  onPress,
  withIcon = false,
  icon,
  withTooltip = false,
  tooltipText,
  tooltipDisabled,
  children,
}: SidebarLinkProps) {
  return (
    <Link href={href} onClick={onPress}>
      {withTooltip ? (
        <Tooltip isDisabled={tooltipDisabled}>
          <Tooltip.Trigger className="flex px-4 py-2 justify-start font-semibold rounded-2xl">
            {withIcon && icon}
            <p>{children}</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltipText}</Tooltip.Content>
        </Tooltip>
      ) : (
        <div className="flex px-4 py-2 justify-start font-semibold rounded-2xl">
          {withIcon && icon}
          <p>{children}</p>
        </div>
      )}
    </Link>
  );
}
