import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Modal, UseOverlayStateReturn } from "@heroui/react";
import { buildMergeFields, getNestedKeysWithValuesAndArrays } from "./utils";
import { modal } from "styles/styles";
import { MergeMode, PersonMeta, Side } from "./types";
import {
  usePersonsMergeActions,
  usePersonsMergeState,
} from "@/contexts/personsMergeContext/PersonsMergeContext";
const PersonAutoMergeWrapper = dynamic(
  () => import("./PersonMergeTable/PersonAutoMergeWrapper"),
);
const ChooseMergeMode = dynamic(
  () => import("./ChooseMergeMode/ChooseMergeMode"),
);
const MergePersonsStepper = dynamic(() => import("./MergePersonsStepper"));
const MergePersonsWrapper = dynamic(
  () => import("./PersonMergeTable/PersonMergeWrapper"),
);
import type { Person } from "@/types/person/index.interface";

type MergePersonsModalProps = {
  state: UseOverlayStateReturn;
  persons: Person[];
};

export default function MergePersonsModal({
  state,
  persons,
}: MergePersonsModalProps) {
  const [mergeMode, setMergeMode] = useState<MergeMode | null>(null);
  const { getPersonsDetails } = usePersonsMergeActions();
  const { personsToMerge } = usePersonsMergeState();
  useEffect(() => {
    if (persons?.length) {
      getPersonsDetails(persons.map((p) => p.id!));
    }
  }, [persons]);

  const mapped = personsToMerge
    ?.map((o) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { project, last_edited_by, id, ...rest } = o;
      delete rest.posts;
      delete rest.geo_trace;
      delete rest.comments;
      delete rest.merge_metadata;
      delete rest.search_state;
      delete rest.connections;
      delete rest.risk_score;
      delete rest.scores;
      delete rest.scores;
      delete rest.signaight_score;
      delete rest.red_flags_count;
      delete rest.alerts_count;
      delete rest.connection_graph;
      const { matched_profiles, passwords, ...networkSignatureWithoutMatched } =
        rest.network_signature ?? {};
      return {
        ...rest,
        personal_details: o.personal_details,
        biographic_details: o.biographic_details,
        network_signature: networkSignatureWithoutMatched,
      };
    })
    .map((person) => getNestedKeysWithValuesAndArrays(person));

  const personMeta = personsToMerge?.reduce(
    (acc, p, i) => {
      return {
        ...acc,
        [i === 0 ? "first" : i === 1 ? "second" : "third"]: {
          side: i === 0 ? "first" : i === 1 ? "second" : "third",
          lastUpdated: p.last_update,
        },
      };
    },
    {} as Record<Side, PersonMeta>,
  );

  const fields = buildMergeFields(mapped);

  const handleClose = useCallback(() => {
    state.close;
    setMergeMode(null);
  }, [state.close]);

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Backdrop className="z-100001">
        <Modal.Container size={mergeMode === "manual" ? "cover" : "lg"}>
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger />
            {!mergeMode && <ChooseMergeMode onSelectMode={setMergeMode} />}
            {mergeMode === "manual" && (
              <>
                <Modal.Header>
                  <Modal.Heading>Merge Subjects</Modal.Heading>
                  {/* <MergePersonsStepper /> */}
                </Modal.Header>
                <MergePersonsWrapper
                  fields={fields}
                  personMeta={personMeta}
                  onClose={handleClose}
                />
              </>
            )}
            {mergeMode === "auto" ? (
              <PersonAutoMergeWrapper
                fields={fields}
                personMeta={personMeta}
                onClose={handleClose}
              />
            ) : null}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
