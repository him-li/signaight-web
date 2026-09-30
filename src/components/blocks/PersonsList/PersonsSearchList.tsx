"use client";
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
  Button,
  Checkbox,
  ProgressBar,
  Skeleton,
  Modal,
  Tooltip,
} from "@heroui/react";
import Profile from "@/components/atoms/CommonFields/person/profile";
import NotFound from "@/components/atoms/Icons/NotFound";
import {
  useAnalysisActions,
  useAnalysisState,
} from "@/contexts/analisysContext/AnalysisContext";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import SelectFieldToSearch from "./SelectFieldToSearch";
import useMergePersonsModal from "@/components/blocks/modals/MergePersonsModal/useMergePersonsModal";
import { useTableState } from "@/contexts/tableContext/TableContext";
import { usePersonState } from "@/contexts/personContext/PersonContext";
import { Icons } from "@/components/atoms/Icons";
import {
  MIN_PERSONS_TO_MERGE,
  MAX_PERSONS_TO_MERGE,
} from "@/components/blocks/ActionStudio";
import { SearchStatusEnum } from "@/types/person/searchstate.interface";
import { Person } from "@/types/person/index.interface";
import { modal, button } from "styles/styles";
const HEIGHT = 55;
const START_POINT = 1;

export default function PersonsSearchList({
  pathname,
  isMergeMode = false,
}: {
  pathname: string;
  isMergeMode?: boolean;
}) {
  const { users, loading, pagination } = useAnalysisState();
  const { getUsers } = useAnalysisActions();
  const { selectedKeys } = useTableState();
  const { persons } = usePersonState();
  const [selectedMap, setSelectedMap] = useState<Map<string, Person>>(
    new Map(),
  );

  useEffect(() => {
    if (!selectedKeys || selectedKeys === "all") return;
    setSelectedMap((prev) => {
      const next = new Map(prev);
      persons.forEach((person) => {
        const isSelected =
          typeof selectedKeys === "string"
            ? selectedKeys === person.id
            : selectedKeys.has(person?.id!);
        if (isSelected && person.id) {
          next.set(person?.id, person);
        }
      });
      return next;
    });
  }, [selectedKeys, persons]);

  const selectedPersons = useMemo(
    () => Array.from(selectedMap.values()),
    [selectedMap],
  );

  const isDisabled =
    selectedPersons?.length < MIN_PERSONS_TO_MERGE ||
    selectedPersons?.length > MAX_PERSONS_TO_MERGE ||
    selectedPersons?.some(
      (p) =>
        !(
          p.search_state?.is_done &&
          p.search_state?.status === SearchStatusEnum.success
        ),
    );

  const handleSelect = useCallback((person: Person, checked: boolean) => {
    setSelectedMap((prev) => {
      const next = new Map(prev);
      if (checked && person.id) {
        next.set(person.id, person);
      } else {
        next.delete(person.id!);
      }
      return next;
    });
  }, []);

  const _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: HEIGHT,
  });

  const _rowRenderer = ({ index, key, style, parent }: ListRowProps) => {
    const item = users?.[index];
    if (!item) {
    }
    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div key={key} ref={registerChild} style={style}>
            {item && item.id !== undefined ? (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={item.id}
                  value={item.id}
                  isSelected={selectedMap.has(item.id)}
                  onChange={(checked) => handleSelect(item, checked)}
                  isDisabled={
                    !(
                      item?.search_state?.is_done &&
                      item?.search_state?.status === SearchStatusEnum.success
                    )
                  }
                  className={isMergeMode ? "" : "hidden"}
                >
                  <Checkbox.Control className="rounded-full active:bg-accent">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>

                <Link href={`${pathname}/${item.id}`} className="flex-1">
                  <Profile person={item} hideLocation hideStatus={false} />
                </Link>
              </div>
            ) : (
              <Skeleton className="h-25 rounded-lg" />
            )}
          </div>
        )}
      </CellMeasurer>
    );
  };

  const _isRowLoaded = ({ index }: Index) => {
    return !!users?.[index];
  };

  const handleNewPageLoad = async ({ stopIndex }: IndexRange) => {
    const page = Math.ceil(stopIndex / pagination.size);
    getUsers({ page, isAdd: true });
    if (page !== pagination.pages) {
      getUsers({ page: page + START_POINT, isAdd: true });
    }
    if (page !== START_POINT) {
      getUsers({ page: page - START_POINT, isAdd: true });
    }
    getUsers({ page, isAdd: true });
  };

  const loadMoreRows = loading
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      (params: IndexRange): Promise<any> => new Promise(() => {})
    : handleNewPageLoad;

  const rowCount = useMemo(() => pagination.total, [pagination.total]);
  const { modal: MergePersonsModal, state } =
    useMergePersonsModal(selectedPersons);

  return (
    <Modal.Dialog aria-label="search_persons" className={modal.base + " p-0"}>
      <Modal.Header className="p-0">
        {loading ? (
          <ProgressBar isIndeterminate aria-label="Loading..." size="sm">
            <ProgressBar.Output />
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        ) : null}
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="flex">
          <SelectFieldToSearch />
          <SearchInput />
        </div>
        {users.length ? (
          <InfiniteLoader
            isRowLoaded={_isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    deferredMeasurementCache={_cache}
                    rowHeight={_cache.rowHeight}
                    ref={registerChild}
                    height={rowCount <= 5 ? rowCount * (HEIGHT + 12) : 250}
                    overscanCount={0}
                    rowCount={rowCount}
                    rowRenderer={_rowRenderer}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    className="px-8 py-4"
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        ) : (
          <NotFound size={100} text="No Items Found" />
        )}
      </Modal.Body>
      <Modal.Footer
        className={isMergeMode ? "items-center-safe p-2" : "hidden"}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <Icons.Help size={15} className="cursor-help mx-2" />
          </Tooltip.Trigger>
          <Tooltip.Content className="flex flex-col break-normal text-pretty">
            <p>
              Please select at least {MIN_PERSONS_TO_MERGE} persons and at most{" "}
              {MAX_PERSONS_TO_MERGE} persons to merge.
            </p>
            <p>
              Please note that only persons with a{" "}
              <strong className="text-accent">
                {SearchStatusEnum.success.toLowerCase()}
              </strong>{" "}
              search status can be merged.
            </p>
          </Tooltip.Content>
        </Tooltip>
        <Button
          onPress={state.open}
          variant="ghost"
          isDisabled={isDisabled}
          className={button.ghost_accent}
        >
          <Icons.Merge />
          Merge Profiles
        </Button>
      </Modal.Footer>
      {MergePersonsModal}
    </Modal.Dialog>
  );
}
