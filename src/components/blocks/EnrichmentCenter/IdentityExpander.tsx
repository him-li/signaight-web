"use client";
import { Accordion, Button, Card, toast } from "@heroui/react";
import { Icons, SocialPlatforms } from "@/components/atoms/Icons";
import { AxiosError } from "axios";
import NotFound from "@/components/atoms/Icons/NotFound";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  updateSubject,
  resetProjectSelectedSubjects,
} from "@/store/subjectsSlice";
import { selectProjectsState } from "@/store/projectsSlice";
import { selectIdentityExpanderCandidates } from "@/store/profileSelectSlice/profileSelect.selectors";
import EventBus, { PersonDataChangeEvent } from "@/services/EventBus/EventBus";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { usePersonsSearchState } from "@/contexts/personsSearchContext/PersonsSearchContext";
import { usePersonActions } from "@/contexts/personContext/PersonContext";
import Web from "@/components/atoms/CommonFields/person/OnlineFootprint/Web";
import CheckDatabase from "@/components/atoms/CheckDatabase";
import CandidateForm from "@/components/blocks/ProfileSelectionSidebar/CandidateForm";
import { EXCLUDED_SOURCES } from "@/components/blocks/ProfileSelectionSidebar/index";
import { button } from "styles/styles";
import type { Person, PersonCreate } from "@/types/person/index.interface";
import type { WebSearches } from "@/types/search.interface";
type IdentityExpanderProps = {
  person?: Person;
  webSearches?: WebSearches[];
};

export default function IdentityExpander({
  person,
  webSearches,
}: IdentityExpanderProps) {
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectProjectsState).selectedProject?.id;
  const { refresh } = useSearchParamsActions();
  const { createPerson } = usePersonActions();
  const { searchExisting } = usePersonsSearchState();
  const allCandidates = useAppSelector(selectIdentityExpanderCandidates);
  const candidates = allCandidates.filter(
    (candidate) => !EXCLUDED_SOURCES.includes(candidate.source),
  );

  if (
    (webSearches === undefined || webSearches?.length < 1) &&
    (!person?.personal_details?.email?.associated_email ||
      person?.personal_details?.email?.associated_email?.length < 1) &&
    (!person?.personal_details?.phone?.associated_phones ||
      person?.personal_details?.phone?.associated_phones?.length < 1) &&
    (!person?.personal_details?.phone?.discovery_phones ||
      person?.personal_details?.phone?.discovery_phones?.length < 1) &&
    (!candidates || candidates.length < 1)
  )
    return <NotFound size={100} text="No Identity Expander Found" />;

  const handleMerge = async (key: "email" | "phone", v: string) => {
    if (!person || !v) return;
    const value = v.trim();

    try {
      const updatedPerson: Person = {
        ...person,
        personal_details: {
          ...person.personal_details,

          email:
            key === "email"
              ? {
                  ...person.personal_details?.email,
                  email_address: Array.from(
                    new Set([
                      ...(person.personal_details?.email?.email_address ?? []),
                      value,
                    ]),
                  ),
                  associated_email: (
                    person.personal_details?.email?.associated_email ?? []
                  ).filter((e) => e !== value),
                }
              : person.personal_details?.email,

          phone:
            key === "phone"
              ? {
                  ...person.personal_details?.phone,
                  phones: Array.from(
                    new Set([
                      ...(person.personal_details?.phone?.phones ?? []),
                      value,
                    ]),
                  ),
                  associated_phones: (
                    person.personal_details?.phone?.associated_phones ?? []
                  ).filter((p) => p !== value),
                }
              : person.personal_details?.phone,
        },
      };

      await dispatch(
        updateSubject({
          subjectId: person.id,
          subjectDetails: updatedPerson,
        }),
      );

      EventBus.publish(
        "person-data-change",
        new PersonDataChangeEvent(updatedPerson),
      );

      dispatch(resetProjectSelectedSubjects(projectId));

      toast.success("Success", {
        description: "Merged successfully",
      });

      refresh();
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
      toast.danger(error.name, { description: error.message });
    }
  };

  const handleDiscover = async (key: "email" | "phone", v: string) => {
    if (!person || !v) return;
    const value = v.trim();
    const personCreate: PersonCreate = {
      ...person,
      personal_details: {
        phone: key === "phone" ? { phones: value ? [value] : [] } : {},
        email: key === "email" ? { email_address: value ? [value] : [] } : {},
      },
    };
    createPerson(
      { person: personCreate, searchExisting },
      () => {
        toast.success("Success", {
          description: "Discovery initiated successfully",
        });
      },
      (err: Error) => {
        toast.danger("Error", {
          description: err.message,
        });
      },
    );
  };

  return (
    <Accordion
      hideSeparator
      allowsMultipleExpanded
      defaultExpandedKeys={["1", "2", "3", "4", "5"]}
    >
      <Accordion.Item
        id="1"
        key="1"
        aria-label="Web"
        className={
          webSearches === undefined || webSearches?.length < 1
            ? "hidden"
            : "visible"
        }
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <SocialPlatforms.Leaks />
            Web Search Results
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <Web searches={webSearches} />
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        id="2"
        key="2"
        aria-label="mail"
        className={
          person?.personal_details?.email?.associated_email &&
          person?.personal_details?.email?.associated_email?.length > 0
            ? "visible"
            : "hidden"
        }
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <Icons.Email />
            Associated Emails
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="text-sm flex flex-wrap gap-1">
            <div className="w-full text-xs">
              <CheckDatabase />
            </div>
            {person?.personal_details?.email?.associated_email?.map(
              (email, index) => (
                <Card key={email + index}>
                  <Card.Header>{email}</Card.Header>
                  <Card.Footer className="gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={button.ghost_accent}
                      onPress={() => handleMerge("email", email)}
                    >
                      <Icons.Merge />
                      Merge
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={button.ghost_accent}
                      onPress={() => handleDiscover("email", email)}
                    >
                      <Icons.Search />
                      Discover
                    </Button>
                  </Card.Footer>
                </Card>
              ),
            )}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        id="3"
        key="3"
        aria-label="phone"
        className={
          person?.personal_details?.phone?.associated_phones &&
          person?.personal_details?.phone?.associated_phones?.length > 0
            ? "visible"
            : "hidden"
        }
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <Icons.Phone />
            Associated Phones
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="text-sm flex flex-wrap gap-1">
            {person?.personal_details?.phone?.associated_phones?.map(
              (phone, index) => (
                <Card key={phone + index}>
                  <Card.Header>{phone}</Card.Header>
                  <Card.Footer>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={button.ghost_accent}
                      onPress={() => handleMerge("phone", phone)}
                    >
                      <Icons.Merge />
                      Merge
                    </Button>
                  </Card.Footer>
                </Card>
              ),
            )}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        id="4"
        key="4"
        aria-label="phone"
        className={
          person?.personal_details?.phone?.discovery_phones &&
          person?.personal_details?.phone?.discovery_phones?.length > 0
            ? "visible"
            : "hidden"
        }
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <Icons.Phone />
            Discover Phones
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="text-sm flex flex-wrap gap-1">
            <div className="w-full text-xs">
              <CheckDatabase />
            </div>
            {person?.personal_details?.phone?.discovery_phones?.map(
              (phone, index) => (
                <Card key={phone + index}>
                  <Card.Header>{phone}</Card.Header>
                  <Card.Footer className="text-xs">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={button.ghost_accent}
                      onPress={() => handleDiscover("phone", phone)}
                    >
                      <Icons.Search />
                      Discover
                    </Button>
                  </Card.Footer>
                </Card>
              ),
            )}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        id="5"
        key="5"
        aria-label="candidates"
        className={candidates?.length > 0 ? "h-full" : "hidden"}
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <SocialPlatforms.Platforms />
            Social Media Accounts
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="max-h-80 overflow-y-auto">
            <CandidateForm
              candidates={candidates}
              source=""
              person={person!}
              buttonText="Merge"
              primary={false}
              showSource={true}
              showButtonSeparately={true}
            />
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
