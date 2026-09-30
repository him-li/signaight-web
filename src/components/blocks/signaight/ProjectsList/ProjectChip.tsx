"use client";
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icons } from "@/components/atoms/Icons";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { useProjectActions } from "@/contexts/projectContext/ProjectContext";
import { Card, Chip, CloseButton } from "@heroui/react";
import { ProjectItemProps } from "./type";
import { useAppDispatch } from "@/store/store";
import { SEARCH_QURIES } from "@/constants/search";
import LastUpdate from "@/components/atoms/CommonFields/person/lastUpdate";
import useDeleteProjectModal from "@/components/blocks/DeleteProjectModal/useDeleteProjectModal";

type Props = {
  children: ReactNode;
  selectedIds?: { [key: string]: boolean };
  setSelectedProjectIds?: (ids: { [key: string]: boolean }) => void;
};

const ITEM_HEIGHT = 40;

function ProjectChip({
  children,
  key,
  index,
  data,
  registerChild,
  style,
  selectedIds,
  setSelectedProjectIds,
}: ProjectItemProps & Props) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSelected, setSelected] = useState<boolean>(false);
  const [position, setPosition] = useState<DOMRect | null>(null);
  const { getProjects } = useProjectActions();
  const itemRef = useRef<HTMLDivElement>(null);
  const { modal, state } = useDeleteProjectModal(data);

  useEffect(() => {
    setSelected(selectedIds?.[data.id] ?? false);
  }, [selectedIds]);

  useEffect(() => {
    if (hoveredIndex === null) return;

    const timeout = setTimeout(() => {
      setHoveredIndex(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [hoveredIndex]);

  const handleProjectDelete = useCallback(async () => {
    state.open();
    setPosition(null);
  }, [data?.id, isSelected, dispatch, getProjects]);

  const handleClick = useCallback(() => {
    setSelectedProjectIds?.({ [data?.id!]: true });
    router.push(
      `${pathname}?${SEARCH_QURIES.ITEM}=${data?.id ?? ""}&${SEARCH_QURIES.PAGE}=1`,
    );
  }, [data?.id, pathname, setSelectedProjectIds, router]);

  if (!data) {
    return (
      <div
        className={`flex justify-center w-full h-[${ITEM_HEIGHT}px] items-center`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="w-full cursor-pointer relative"
      onClick={handleClick}
      onMouseEnter={() => {
        setPosition(itemRef.current!.getBoundingClientRect());
        setHoveredIndex(index);
      }}
      onMouseLeave={() => {
        setPosition(null);
        setHoveredIndex(null);
      }}
      key={key}
      ref={registerChild}
      style={style}
    >
      <Chip
        ref={itemRef}
        variant={isSelected ? "primary" : "tertiary"}
        color={isSelected ? "accent" : "default"}
        className={`relative text-sm min-w-full h-10 ease-in-out duration-300 cursor-pointer justify-center-safe rounded-full ${isSelected ? "hover:bg-accent-hover" : "hover:bg-default-hover"}`}
      >
        <Chip.Label>{children}</Chip.Label>
        {hoveredIndex === index ? (
          <CloseButton
            aria-label="Delete Project"
            onPress={handleProjectDelete}
            className="absolute end-0 bg-transparent"
          >
            <Icons.Delete />
          </CloseButton>
        ) : null}
      </Chip>
      {hoveredIndex !== null && position
        ? createPortal(
            <div
              id="project-chip-tooltip"
              style={{
                position: "fixed",
                left: Math.round(position?.left + position.width),
                top: Math.round(position?.top),
              }}
              className={`z-50 ml-0 w-64 h-10 bg-red shadow-lg`}
            >
              <Card>
                <Card.Header>
                  <Card.Title>{data?.title}</Card.Title>
                  <Card.Description>{data?.description}</Card.Description>
                </Card.Header>
                <Card.Content>
                  <p className={data?.created_at ? "" : "hidden"}>
                    Created at{" "}
                    {new Date(data?.created_at)?.toLocaleString("en-GB", {
                      timeZone: "Asia/Jerusalem",
                    })}
                  </p>
                  <LastUpdate lastupdate={data?.updated_at} />
                </Card.Content>
              </Card>
            </div>,
            document.body,
          )
        : null}
      {createPortal(modal, document.body)}
    </div>
  );
}

const ProjectChipMemo = memo(ProjectChip);
export default ProjectChipMemo;
