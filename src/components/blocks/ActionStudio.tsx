import { Dropdown, Button, Label, useOverlayState } from "@heroui/react";
import { useMemo } from "react";
import { Icons } from "@/components/atoms/Icons";
import { useTableState } from "@/contexts/tableContext/TableContext";
import { usePersonState } from "@/contexts/personContext/PersonContext";
import { SearchStatusEnum } from "@/types/person/searchstate.interface";
import useProjectLinkAnalysisModal from "@/components/blocks/modals/ProjectLinkAnalysisModal/useProjectLinkAnalysisModal";
import useMergePersonsModal from "@/components/blocks/modals/MergePersonsModal/useMergePersonsModal";
import usePersonsSearchModal from "@/components/blocks/PersonsList/usePersonsSearchModal";
import PersonsMergeProvider from "@/contexts/personsMergeContext/PersonsMergeContext";
import { ROUTES } from "@/constants/routes";
import { modal } from "styles/styles";
export const MIN_PERSONS_TO_MERGE = 2;
export const MAX_PERSONS_TO_MERGE = 3;

export default function ActionStudio() {
  const state = useOverlayState();
  const { selectedKeys } = useTableState();
  const { persons } = usePersonState();
  const { modal: ProjectLinkAnalysisModal, state: linkanalysisState } =
    useProjectLinkAnalysisModal();
  const { modal: PersonsSearchModal, state: searchState } =
    usePersonsSearchModal(ROUTES.ANALYSIS, true);
  const selectedPersons = useMemo(
    () =>
      persons.filter((person) =>
        typeof selectedKeys === "string"
          ? selectedKeys === person?.id
          : (selectedKeys as Set<string | number>).has(person?.id!),
      ),
    [persons, selectedKeys],
  );

  const isLinkAnalysisDisabled =
    typeof selectedKeys === "object" &&
    selectedKeys.size < MIN_PERSONS_TO_MERGE;

  const isMergeWithDisabled =
    selectedKeys === "all" ||
    selectedKeys.size === 0 ||
    selectedKeys.size > MAX_PERSONS_TO_MERGE ||
    selectedPersons.some(
      (p) =>
        !(
          p.search_state?.is_done &&
          p.search_state?.status === SearchStatusEnum.success
        ),
    );
  const isMergeDisabled =
    isMergeWithDisabled || selectedKeys.size < MIN_PERSONS_TO_MERGE;

  const { modal: MergePersonsModal, state: mergeState } =
    useMergePersonsModal(selectedPersons);
  return (
    <PersonsMergeProvider>
      <Dropdown isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Button
          size="sm"
          variant="tertiary"
          onPress={state.open}
          className="text-xs text-foreground font-semibold rounded-full"
        >
          <Icons.Automatic />
          ACTION STUDIO
        </Button>
        <Dropdown.Popover
          shouldCloseOnInteractOutside={() => true}
          className={modal.base}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onPress={linkanalysisState.open}
              isDisabled={isLinkAnalysisDisabled}
            >
              <Icons.LinkAnalysis />
              <Label>Link Analysis</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
            <Dropdown.Item
              onPress={mergeState.open}
              isDisabled={isMergeDisabled}
            >
              <Icons.Merge />
              <Label>Merge Profiles</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
            <Dropdown.Item
              onPress={searchState.open}
              isDisabled={isMergeWithDisabled}
            >
              <Icons.Search />
              <Label>Merge With...</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
      {ProjectLinkAnalysisModal}
      {MergePersonsModal}
      {PersonsSearchModal}
    </PersonsMergeProvider>
  );
}
