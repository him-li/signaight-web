"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { ROUTES } from "@/constants/routes";

export default function ErrorClient({ reset }: { reset?: () => void }) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  return (
    <div className="w-full h-full">
      <section>
        <div className="py-8 px-4 mx-auto max-w-(--breakpoint-xl) lg:py-16 lg:px-6">
          <div className="mx-auto max-w-(--breakpoint-sm) text-center">
            <h1
              className={`mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl ${textColor}`}
            >
              500
            </h1>
            <p
              className={`mb-4 text-3xl tracking-tight font-bold md:text-4xl ${textColor}`}
            >
              Internal Server Error.
            </p>
            <p className={`mb-4 text-lg font-light ${textColor}`}>
              We are already working to solve the problem.{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full py-2">
          {reset ? (
            <Button onClick={() => reset?.()}>Try again</Button>
          ) : (
            <Link href={ROUTES.HOME}>
              <Button>Back to Homepage</Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
