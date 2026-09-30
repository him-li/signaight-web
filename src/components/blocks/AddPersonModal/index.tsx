/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback } from "react";
import { Accordion, Modal, UseOverlayStateReturn } from "@heroui/react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/store/store";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import type { AddPersonFormData } from "./AddPersonForm";
import { ALL_PROJECTS } from "@/constants/projects";
import CSVUploader from "./CSVUploader";
import { modal } from "styles/styles";
import { layouts } from "@/constants/layouts";
import { useLayoutState } from "@/contexts/layoutContext/LayoutContext";
import Capitalize from "@/utils/capitalize";
import PersonsSearchProvider from "@/contexts/personsSearchContext/PersonsSearchContext";
const LimitsProvider = dynamic(
  () => import("@/contexts/limitsContext/LimitsContext"),
  {
    loading: () => null,
    ssr: false,
  },
);
const AddPersonForm = dynamic(() => import("./AddPersonForm"), {
  loading: () => null,
  ssr: false,
});
const CheckDatabase = dynamic(
  () => import("@/components/atoms/CheckDatabase"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function AddPersonModal({
  state,
}: {
  state: UseOverlayStateReturn;
}) {
  const { layoutName } = useLayoutState();
  const projectId = useAppSelector(selectCurrentProjectId);
  const personTerm = Capitalize(
    layouts.find((layout) => layout.key === layoutName)?.person!,
  );

  const formMethods = useForm<AddPersonFormData>({
    defaultValues: {
      f_name: "",
      l_name: "",
      email_address: "",
      linkedin: "",
      phone: "",
    },
  });

  const handleClose = useCallback(() => {
    formMethods.reset();
    state.close();
  }, []);

  return (
    <LimitsProvider>
      <PersonsSearchProvider>
        <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className={modal.base}>
                <Modal.CloseTrigger onPress={handleClose} />
                <Modal.Header className="flex flex-row w-full justify-between items-center-safe">
                  <Modal.Heading>
                    {projectId !== ALL_PROJECTS
                      ? `New ${personTerm}`
                      : "Please Select a Project"}
                  </Modal.Heading>
                  <CheckDatabase />
                </Modal.Header>
                <Modal.Body
                  className={!projectId ? "hidden" : "p-1 overflow-x-hidden"}
                >
                  <Accordion defaultExpandedKeys={["1"]} allowsMultipleExpanded>
                    <Accordion.Item id="1" key="1">
                      <Accordion.Heading>
                        <Accordion.Trigger>
                          Add Single {personTerm}
                          <Accordion.Indicator />
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body>
                          <AddPersonForm
                            personTerm={personTerm}
                            methods={formMethods}
                            projectId={projectId}
                            onClose={handleClose}
                          />
                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item id="2" key="2">
                      <Accordion.Heading>
                        <Accordion.Trigger>
                          Upload {personTerm} List
                          <Accordion.Indicator />
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body>
                          <CSVUploader
                            onClose={handleClose}
                            personTerm={personTerm}
                          />
                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </PersonsSearchProvider>
    </LimitsProvider>
  );
}
