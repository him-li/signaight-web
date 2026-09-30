"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

/** Legacy schema renderer retained as a single-product SignAIght landing block. */
export default function CapitolBackgroundSlogan() {
  const router = useRouter();

  return (
    <div
      className="fixed top-0 flex h-dvh w-screen items-center justify-center bg-background text-foreground"
      id="#/properties/root"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="text-5xl font-semibold">SignAIght</h1>
        <Button onPress={() => router.push(ROUTES.SCREENING)}>
          Open SignAIght
        </Button>
      </div>
    </div>
  );
}
