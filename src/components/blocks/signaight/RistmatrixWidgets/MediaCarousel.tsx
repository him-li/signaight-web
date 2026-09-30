"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Icons } from "@/components/atoms/Icons";
import ImageZoom from "@/components/atoms/ImageZoom";
import Display from "@/components/atoms/Display";
import { useRiskmatrixWidgetsState } from "@/contexts/riskmatrixWidgetsContext/RiskmatrixWidgetsContext";
import { getFlagLabel, getSelectedFlags } from "./utils";
import { ROUTES } from "@/constants/routes";
import type {
  FlagsStatisticsResponse,
  PersonInfo,
} from "@/types/responses/flagsStatisticResponse";
type CarouselImage = {
  flag: string;
  personId: string;
  avatar: string;
  src: string;
};

function buildCarouselImages(
  personsFlags: FlagsStatisticsResponse,
  activeFlags: string[],
): CarouselImage[] {
  if (!personsFlags) return [];

  return Object.entries(personsFlags)
    .filter(([flag]) => activeFlags.length === 0 || activeFlags.includes(flag))
    .flatMap(([flag, data]) =>
      (data?.persons ?? []).flatMap((person: PersonInfo) =>
        (person?.flag_images ?? []).map((src) => ({
          flag,
          personId: person?.id,
          avatar: person?.profile_picture ?? "",
          src,
        })),
      ),
    );
}

const wrapperClassName =
  "rounded-2xl h-[20vh] shadow-md bg-default hover:bg-default-hover ease-in-out duration-300 backdrop-blur-xl overflow-hidden scrollbar-hide";

export default function MediaCarousel({ duration = 3000 }) {
  const { personsFlags } = useRiskmatrixWidgetsState();
  const searchParams = useSearchParams();
  const selectedFlags = getSelectedFlags(searchParams);
  const images = useMemo(
    () => buildCarouselImages(personsFlags, selectedFlags),
    [personsFlags, selectedFlags],
  );
  const hasAnyPerson =
    Object.values(personsFlags).some((entry) => entry?.persons?.length > 0) &&
    Object.values(personsFlags).some((entry) => entry?.count > 0);

  const [index, setIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue<number>(0);

  useEffect(() => {
    if (containerRef?.current) {
      const containerWidth = containerRef?.current?.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index]);

  useEffect(() => {
    if (!isHovered && images?.length > 1) {
      const interval = setInterval(() => {
        setIndex((i) => (i + 1) % images?.length);
      }, duration);
      return () => clearInterval(interval);
    }
  }, [isHovered, duration, images?.length]);

  return (
    <Display
      when={images?.length > 1}
      fallback={
        <div
          className={`${wrapperClassName} bg-accent flex flex-col justify-evenly px-8`}
        >
          <strong className="text-pretty">
            {hasAnyPerson
              ? `Post Detected for ${selectedFlags?.length > 0 ? selectedFlags?.map(getFlagLabel).join(", ") : "Red Flags"}`
              : "Red Flags Detected"}
          </strong>
          <strong className="text-3xl">0</strong>
        </div>
      }
    >
      <div
        className={`${wrapperClassName} relative`}
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className="flex" style={{ x }}>
          {images.map((image, index) => (
            <div
              key={image?.src + index}
              className="shrink-0 w-full h-full relative overflow-hidden"
            >
              <img
                alt={image?.src}
                src={image?.src}
                className="w-full h-[20vh] object-cover select-none pointer-events-none"
              />
              <ImageZoom src={image?.avatar}>
                <Link
                  href={`${ROUTES.ANALYSIS}/${image?.personId}`}
                  className="absolute top-2 start-4 z-20"
                >
                  <Avatar size="lg">
                    <Avatar.Image src={image?.avatar} />
                    <Avatar.Fallback>
                      <Icons.Person />
                    </Avatar.Fallback>
                  </Avatar>
                </Link>
              </ImageZoom>
            </div>
          ))}
        </motion.div>
        <Button
          isIconOnly
          variant="ghost"
          isDisabled={index === 0}
          onPress={() => setIndex((i) => Math.max(0, i - 1))}
          className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full"
        >
          <Icons.ChevronLeft />
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          isDisabled={index === images?.length - 1}
          onPress={() => setIndex((i) => Math.min(images?.length - 1, i + 1))}
          className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full"
        >
          <Icons.ChevronRight />
        </Button>
        <div className="absolute bottom-4 start-1/2 -translate-x-1/2 flex gap-2">
          {images?.map((_, i) => (
            <button
              key={i}
              type="button"
              title={i.toString()}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </Display>
  );
}
