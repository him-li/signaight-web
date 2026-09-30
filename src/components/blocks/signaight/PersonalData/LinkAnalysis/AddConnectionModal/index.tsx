"use client";
import { useCallback, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextField,
  UseOverlayStateReturn,
} from "@heroui/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { useAppSelector } from "@/store/store";
import CandidatesServices from "@/services/candidatesService";
import PersonsService from "@/services/personsService";
import { buildConnectionPatches } from "./connectionUpdateHelpers";
import type { Person } from "@/types/person/index.interface";
import { modal } from "styles/styles";
import EvidenceUrlField from "./EvidenceUrlField";
import {
  AddConnectionFormData,
  Direction,
  ALL_RELATIONSHIP_TYPES,
  EMPTY_ENTRY,
  Platform,
  PLATFORM_RELATIONSHIP_TYPES,
  PLATFORMS,
  PlatformEntry,
  RelationshipType,
  SocialPlatformKey,
  deriveDirection,
  getBestCandidateId,
  getPersonPlatformCandidates,
  getPersonPlatformUrls,
  getPersonPlatforms,
  toKey,
} from "./types";
import PersonCard from "./PersonCard";
import ProfileBSearch from "./ProfileBSearch";

export default function AddConnectionModal({
  state,
}: {
  state: UseOverlayStateReturn;
}) {
  const token = useAppSelector(getTokenSelector);
  const personA = useAppSelector(selectCurrentSubjectData);

  const [selectedPersonB, setSelectedPersonB] = useState<Person | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Platforms available on each person (from matched_profiles)
  const personAPlatforms = new Set(getPersonPlatforms(personA as Person));
  console.log("Person A platforms:", personAPlatforms);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddConnectionFormData>({
    defaultValues: {
      profile_b_id: "",
      platforms: [{ ...EMPTY_ENTRY }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "platforms",
  });

  const watchedPlatforms = watch("platforms");

  // When Profile B is selected, pre-fill one row per supported platform that
  // B has in matched_profiles. All of B's platforms are shown; the relationship
  // select is disabled for platforms Person A doesn't have.
  const handlePersonBSelect = useCallback(
    (person: Person | null) => {
      console.log("Selected Person B:", person);
      setSelectedPersonB(person);
      if (!person) {
        replace([{ ...EMPTY_ENTRY }]);
        return;
      }

      const candidates = getPersonPlatformCandidates(person);
      const first = candidates[0];

      replace([
        first
          ? {
              ...EMPTY_ENTRY,
              platform: first.platform,
              candidate_id: "",
              evidence_url: "",
            }
          : { ...EMPTY_ENTRY },
      ]);
    },
    [personAPlatforms, replace],
  );

  const handleClose = useCallback(() => {
    reset();
    setSelectedPersonB(null);
    setSubmitError(null);
    state.close();
  }, [reset, state]);

  const onSubmit = useCallback(
    async (data: AddConnectionFormData) => {
      if (!personA?.id) return;
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const direction: Direction = deriveDirection(data.platforms);

        // For platform entries without a candidate_id, create a primary
        // candidate for Person B on that platform first, then use the returned id.
        const resolvedPlatforms = await Promise.all(
          data.platforms.map(async (p: PlatformEntry) => {
            let candidateId = p.candidate_id;

            if (!candidateId && p.platform) {
              const existingUrls = getPersonPlatformUrls(
                selectedPersonB,
                p.platform as SocialPlatformKey,
              );
              const isCustomUrl =
                p.evidence_url && !existingUrls.includes(p.evidence_url);

              if (!isCustomUrl) {
                // 1. URL matches an existing candidate — reuse it
                candidateId = getBestCandidateId(
                  selectedPersonB,
                  p.platform as SocialPlatformKey,
                );
              }
            }

            if (!candidateId && p.platform) {
              // 2. Custom URL or no existing candidate — create a new one
              const created = await CandidatesServices.addCandidate(
                data.profile_b_id,
                {
                  source: p.platform,
                  primary: true,
                  network_signature: {
                    url: {
                      [`${p.platform}_profile_url`]: [p.evidence_url],
                    },
                  },
                  resource: "vetric",
                },
                token,
              );
              candidateId = created?.id ?? "";
              if (candidateId) {
                await CandidatesServices.updateCandidatePrimary(
                  data.profile_b_id,
                  candidateId,
                  "",
                  token,
                );
              }
            }
            return {
              platform: p.platform as Platform,
              relationship_type: p.relationship_type as RelationshipType,
              ...(candidateId ? { candidate_id: candidateId } : {}),
              ...(p.evidence_url ? { evidence_url: p.evidence_url } : {}),
              ...(p.note ? { note: p.note } : {}),
            };
          }),
        );

        // Update structured connections on both persons based on relationship types
        const { personAData, personBData } = buildConnectionPatches(
          personA as Person,
          selectedPersonB,
          resolvedPlatforms,
        );

        if (Object.keys(personAData).length > 0) {
          await PersonsService.patchPerson(
            personA.id,
            { connections: personAData },
            token,
            "add",
          );
        }
        if (Object.keys(personBData).length > 0) {
          await PersonsService.patchPerson(
            data.profile_b_id,
            { connections: personBData },
            token,
            "add",
          );
        }

        handleClose();
      } catch (err: unknown) {
        setSubmitError(
          err instanceof Error ? err.message : "Failed to add connection.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [personA?.id, token, handleClose, selectedPersonB],
  );

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className={modal.base}>
            <Modal.CloseTrigger onPress={handleClose} />
            <Modal.Header>
              <Modal.Heading>Add Connection</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-4 overflow-y-auto max-h-[70vh]">
              <form
                id="add-connection-form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* ── Profile A → B header ──────────────────────────── */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-default-100/60">
                  {personA && (
                    <PersonCard person={personA as Person} label="Profile A" />
                  )}

                  <FaArrowRight
                    size={16}
                    className="shrink-0 text-default-400"
                  />

                  {selectedPersonB ? (
                    <PersonCard person={selectedPersonB} label="Profile B" />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <p className="text-xs text-default-400 font-medium uppercase tracking-wide">
                        Profile B
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm" className="shrink-0 opacity-30">
                          <Avatar.Fallback />
                        </Avatar>
                        <p className="text-sm text-default-400 italic">
                          Not selected
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Profile B search ──────────────────────────────── */}
                <Controller
                  control={control}
                  name="profile_b_id"
                  rules={{ required: "Please select a profile" }}
                  render={({ field }) => (
                    <ProfileBSearch
                      value={field.value}
                      onChange={field.onChange}
                      onPersonSelect={handlePersonBSelect}
                      projectId={personA?.project?.id}
                      token={token}
                      personAId={personA?.id}
                      disabled={!personA}
                      error={errors.profile_b_id?.message}
                    />
                  )}
                />

                {/* ── Platform entries ──────────────────────────────── */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">Platform Connections</p>

                  {fields
                    .filter((it) => personAPlatforms.has(it.platform as any))
                    .map((field, index) => (
                      <div
                        key={field.id}
                        className="flex flex-col gap-2 p-3 rounded-xl border border-default-200 bg-default-50/30"
                      >
                        <div className="flex items-end gap-2">
                          {/* Platform */}
                          <Controller
                            control={control}
                            name={`platforms.${index}.platform`}
                            rules={{ required: true }}
                            render={({ field: f }) => (
                              <div className="flex-1 flex flex-col gap-1">
                                <Select
                                  selectionMode="single"
                                  value={f.value || null}
                                  onChange={(key) => {
                                    f.onChange(toKey(key));
                                    setValue(
                                      `platforms.${index}.evidence_url`,
                                      "",
                                    );
                                  }}
                                  aria-label="Platform"
                                  placeholder="Select platform"
                                >
                                  <Label>
                                    Platform{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Select.Trigger
                                    className={
                                      errors.platforms?.[index]?.platform
                                        ? "border border-danger"
                                        : ""
                                    }
                                  >
                                    <Select.Value />
                                    <Select.Indicator />
                                  </Select.Trigger>
                                  <Select.Popover className={modal.base}>
                                    <ListBox>
                                      {PLATFORMS.filter((p) =>
                                        personAPlatforms.has(p.key),
                                      ).map((p) => (
                                        <ListBox.Item
                                          id={p.key}
                                          key={p.key}
                                          textValue={p.label}
                                        >
                                          {p.label}
                                          <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                      ))}
                                    </ListBox>
                                  </Select.Popover>
                                </Select>
                              </div>
                            )}
                          />

                          {/* Relationship type */}
                          <Controller
                            control={control}
                            name={`platforms.${index}.relationship_type`}
                            rules={{ required: true }}
                            render={({ field: f }) => {
                              const currentPlatform = (watchedPlatforms[index]
                                ?.platform ?? field.platform) as Platform;
                              const availableTypes =
                                PLATFORM_RELATIONSHIP_TYPES[currentPlatform] ??
                                [];
                              const relationshipDisabled =
                                !currentPlatform ||
                                !personAPlatforms.has(currentPlatform);
                              return (
                                <div className="flex-1 flex flex-col gap-1">
                                  <Select
                                    selectionMode="single"
                                    value={f.value || null}
                                    onChange={(key) => f.onChange(toKey(key))}
                                    aria-label="Relationship"
                                    placeholder={
                                      relationshipDisabled
                                        ? "Not available"
                                        : "Select type"
                                    }
                                    isDisabled={relationshipDisabled}
                                  >
                                    <Label>
                                      Relationship{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Select.Trigger
                                      className={
                                        errors.platforms?.[index]
                                          ?.relationship_type
                                          ? "border border-danger"
                                          : ""
                                      }
                                    >
                                      <Select.Value />
                                      <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className={modal.base}>
                                      <ListBox>
                                        {ALL_RELATIONSHIP_TYPES.filter((r) =>
                                          availableTypes.includes(r.key),
                                        ).map((r) => (
                                          <ListBox.Item
                                            id={r.key}
                                            key={r.key}
                                            textValue={r.label}
                                          >
                                            {r.label}
                                            <ListBox.ItemIndicator />
                                          </ListBox.Item>
                                        ))}
                                      </ListBox>
                                    </Select.Popover>
                                  </Select>
                                </div>
                              );
                            }}
                          />

                          {fields.length > 1 && (
                            <Button
                              isIconOnly
                              variant="ghost"
                              onPress={() => remove(index)}
                              aria-label="Remove platform"
                              className="shrink-0 self-end mb-0.5"
                            >
                              <FaMinus size={12} />
                            </Button>
                          )}
                        </div>

                        {/* Evidence URL */}
                        <Controller
                          control={control}
                          name={`platforms.${index}.evidence_url`}
                          rules={{
                            required: "Evidence URL is required",
                            validate: (v) => {
                              try {
                                const url = new URL(v);
                                return url.protocol === "http:" ||
                                  url.protocol === "https:"
                                  ? true
                                  : "URL must start with http:// or https://";
                              } catch {
                                return "Please enter a valid URL";
                              }
                            },
                          }}
                          render={({ field: f }) => {
                            console.log(
                              "Rendering EvidenceUrlField for platform",
                              selectedPersonB,
                              field,
                              {
                                value: f.value,
                                suggestions: getPersonPlatformUrls(
                                  selectedPersonB,
                                  field.platform as SocialPlatformKey,
                                ),
                                error:
                                  errors.platforms?.[index]?.evidence_url
                                    ?.message ?? null,
                              },
                            );
                            return (
                              <EvidenceUrlField
                                value={f.value}
                                onChange={f.onChange}
                                suggestions={getPersonPlatformUrls(
                                  selectedPersonB,
                                  (watchedPlatforms[index]?.platform ??
                                    field.platform) as SocialPlatformKey,
                                )}
                                error={
                                  errors.platforms?.[index]?.evidence_url
                                    ?.message
                                }
                              />
                            );
                          }}
                        />

                        {/* Note */}
                        <Controller
                          control={control}
                          name={`platforms.${index}.note`}
                          render={({ field: f }) => (
                            <TextField {...f} className="w-full">
                              <Label>Note (optional)</Label>
                              <Input placeholder="Add a note…" />
                            </TextField>
                          )}
                        />
                      </div>
                    ))}

                  <Button
                    variant="ghost"
                    onPress={() => append({ ...EMPTY_ENTRY })}
                    className="self-start text-sm"
                  >
                    <FaPlus size={12} />
                    Add Platform
                  </Button>
                </div>

                {submitError && (
                  <p className="text-danger text-sm">{submitError}</p>
                )}

                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="ghost" onPress={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isPending={isSubmitting}
                  >
                    Add Connection
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
