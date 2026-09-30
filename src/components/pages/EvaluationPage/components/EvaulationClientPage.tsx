"use client";
import { Icons } from "@/components/atoms/Icons";
import { Button, Popover } from "@heroui/react";
import { useRef, type ReactNode } from "react";
import SidabarClientImage from "./SidabarClientImage";
import { modal } from "styles/styles";

type Props = { children: ReactNode };

export default function EvaulationClientPage({ children }: Props) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Popover>
        <Button
          className="sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden fixed top-1/2 h-32"
          isIconOnly
        >
          <Icons.ChevronRight />
        </Button>
        <Popover.Content
          className={modal.base + " flex items-center justify-center md:hidden"}
          placement="left"
        >
          <Popover.Dialog>
            <SidabarClientImage />
            {children}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <div
        className={`hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex min-h-svh w-80 relative`}
        onMouseDown={(event) => event.preventDefault()}
        ref={sidebarRef}
      >
        <SidabarClientImage />
        {children}
      </div>
    </>
  );
}
