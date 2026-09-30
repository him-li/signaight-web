"use client";
import { type FC, useState, useEffect } from "react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Icons } from "@/components/atoms/Icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isSelected = theme === "light";

  const handleChange = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <Switch.Root
      isSelected={isSelected}
      onChange={handleChange}
      className={clsx(
        "px-px transition-opacity hover:opacity-80 text-default-foreground cursor-pointer",
        className,
      )}
    >
      <Switch.Control
        className={clsx(
          "flex items-center justify-center gap-2 rounded-lg bg-transparent",
          className,
        )}
      >
        {isSelected ? <Icons.Moon /> : <Icons.Sun />}
      </Switch.Control>
    </Switch.Root>
  );
};
