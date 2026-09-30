/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps,
} from "react-virtualized";
import {
  useProjectActions,
  useProjectState,
} from "@/contexts/projectContext/ProjectContext";
import { ProjectItemProps, ProjectsListProps } from "./type";
import ProjectItem from "../../NavBar/ProjectsList/ProjectItem";
import ProjectMenuItem from "./ProjectMenuItem";
import { SEARCH_QURIES } from "@/constants/search";

const ITEM_HEIGHT = 40;

const renderItems = (
  type: "menu" | "search",
  props: ProjectItemProps,
  setSelectedProjectIds?: (ids: { [key: string]: boolean }) => void,
  selectedProjectIds?: { [key: string]: boolean },
  currentItem: string | null = null,
) => {
  switch (type) {
    case "menu":
      return (
        <ProjectMenuItem
          {...props}
          key={props.key}
          setSelectedProjectIds={setSelectedProjectIds}
          selectedProjectIds={selectedProjectIds}
          selectedItem={currentItem}
        />
      );
    case "search":
      return <ProjectItem {...props} key={props.key} />;
    default:
      return null;
  }
};
const _cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: ITEM_HEIGHT,
});

function ProjectsListLazyLoadingMemo({
  type,
  itemHeight = ITEM_HEIGHT,
  listHeight,
}: ProjectsListProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);

  const [height, setHeight] = useState(0);
  const { projects, pagination } = useProjectState();
  const [selectedProjectIds, setSelectedProjectIds] = useState<{
    [key: string]: boolean;
  }>({});
  const { getProjects } = useProjectActions();
  const currentItem = params.get(SEARCH_QURIES.ITEM);

  useEffect(() => {
    setSelectedProjectIds({ [currentItem!]: true });
  }, [currentItem]);

  const _rowRenderer = useCallback(
    ({ index, key, style, parent }: ListRowProps) => {
      if (index < projects?.length) {
        const data = projects?.[index]!;
        return (
          <CellMeasurer
            cache={_cache}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
          >
            {({ registerChild }) => (
              <div>
                {renderItems(
                  type,
                  { data, style, registerChild, key, index },
                  setSelectedProjectIds,
                  selectedProjectIds,
                  currentItem,
                )}
              </div>
            )}
          </CellMeasurer>
        );
      }
    },
    [projects, selectedProjectIds, type],
  );

  const _isRowLoaded = ({ index }: Index) => {
    return !!projects?.[index];
  };

  const handleNewPageLoad = async ({ stopIndex }: IndexRange) => {
    const page = Math.ceil(stopIndex / pagination.size);
    getProjects({ page, isAdd: true });
    if (page !== pagination.pages) {
      getProjects({ page: page + 1, isAdd: true });
    }
    if (page !== 1) {
      getProjects({ page: page - 1, isAdd: true });
    }
  };

  const loadMoreRows = handleNewPageLoad;

  useEffect(() => {
    const projectHeight = projects.length * itemHeight;
    if (ref.current && !listHeight) {
      const rect = ref?.current?.getBoundingClientRect();
      const calculatedHeight = window.innerHeight - (rect?.top ?? 0) - 15;
      setHeight(
        projectHeight > calculatedHeight ? calculatedHeight : projectHeight,
      );
    }
    if (listHeight) {
      setHeight(
        projectHeight > listHeight
          ? listHeight
          : projectHeight
            ? projectHeight
            : itemHeight,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <div ref={ref} style={{ height }}>
      <InfiniteLoader
        isRowLoaded={_isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={pagination.total}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                deferredMeasurementCache={_cache}
                rowHeight={_cache.rowHeight}
                ref={registerChild}
                height={height}
                overscanCount={0}
                rowCount={pagination.total}
                rowRenderer={_rowRenderer}
                width={width}
                onRowsRendered={onRowsRendered}
                noRowsRenderer={() => (
                  <div
                    className="flex items-center pl-4"
                    style={{ height: itemHeight }}
                  >
                    No items to show
                  </div>
                )}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}

const ProjectsListLazyLoading = memo(ProjectsListLazyLoadingMemo);

export default ProjectsListLazyLoading;
