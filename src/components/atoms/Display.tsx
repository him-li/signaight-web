"use client";
import { Skeleton, type SkeletonProps } from "@heroui/react";
import type { ReactNode } from "react";

interface DisplayProps extends Omit<SkeletonProps, "children"> {
  when: unknown;
  fallback?: ReactNode;
  children: ReactNode;
}

export default function Display(props: DisplayProps) {
  const { when, fallback, ...skeletonProps } = props;
  return when ? (
    props.children
  ) : fallback ? (
    fallback
  ) : (
    <Skeleton animationType="none" {...skeletonProps} />
  );
}
