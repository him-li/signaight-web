"use client";
import { useCallback, useMemo, useState, type ChangeEventHandler } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import type { Candidate } from "@/types/candidate.interface";
import { PersonCreate } from "@/types/person/index.interface";
import { RecruitingSource } from "@/types/person/recruitingsource.interface";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import { addSubject } from "@/store/subjectsSlice";
import ItemDetails from "./ItemDetails";
import { toast } from "@heroui/react";
import { selectActiveSearch } from "@/store/activeSearchSlice/activeSearch.selectors";
import { fetchActiveSearchById } from "@/store/activeSearchSlice";
import { getPersonName } from "@/utils/getPersonName";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import getLinkedinURL from "@/utils/getLinkedinURL";

type CandidateItemProps = {
  person: Candidate;
  index: number;
  handleCheckboxChange?: ChangeEventHandler;
  findSelectedSubject?: (personid: string | undefined) => boolean | undefined;
  handleRefreshData?: (person: Candidate) => void;
};
const Linkedin = getSocialMediaIcon("linkedin");

export default function SearchResultItem({ person }: CandidateItemProps) {
  const dispatch = useAppDispatch();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const projectId = useAppSelector(selectCurrentProjectId);
  const personInProject = person?.projects_list?.some(
    (project) => project == projectId!,
  );
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(
    personInProject ?? false,
  );
  const activeSearchId = useAppSelector(selectActiveSearch)?.id;
  const candidateImage = useMemo(
    () => getPersonAvatar(person?.personal_details?.visuals?.profile_photo),
    [person],
  );
  const candidateEmail = useMemo(
    () =>
      person.personal_details?.email?.email_address?.[0] ??
      person.personal_details?.email?.linkedin_email_address,
    [person],
  );
  const candidateEducation = useMemo(
    () =>
      person?.biographic_details?.education?.linkedin_schools?.[0]?.degree_name,
    [person],
  );
  const candidateJob = useMemo(
    () =>
      person?.biographic_details?.work?.linkedin_work?.positions?.[0]?.title,
    [person],
  );
  const candidateLocation = useMemo(
    () =>
      person?.personal_details?.location?.current_city_region_country
        ?.linkedin_location,
    [person],
  );
  const candidateName = useMemo(
    () => getPersonName(person?.personal_details?.name, "full_name"),
    [person],
  );

  const handleAddApplicant = useCallback(() => {
    const applicant: PersonCreate = {
      personal_details: {
        email: {
          email_address: [candidateEmail!],
        },
      },
      network_signature: {
        user_id: {
          linkedin_user_id:
            person?.network_signature?.user_id?.linkedin_user_id?.[0] === "" ||
            person?.network_signature?.user_id?.linkedin_user_id?.[0] ===
              undefined
              ? undefined
              : person?.network_signature?.user_id?.linkedin_user_id,
        },
        url: {
          linkedin_profile_url:
            person?.network_signature?.url?.linkedin_profile_url?.[0] === "" ||
            person?.network_signature?.url?.linkedin_profile_url?.[0] ===
              undefined
              ? undefined
              : person?.network_signature?.url?.linkedin_profile_url,
        },
      },
      recruiting_source: "internet" as RecruitingSource,
      search_id: activeSearchId,
    };
    dispatch(addSubject({ projectId, person: applicant }));
    toast.success("Success", { description: "Applicant added successfully" });
    dispatch(fetchActiveSearchById(activeSearchId));
  }, [dispatch, person, projectId, candidateEmail, activeSearchId]);

  return (
    <Card
      key={person.id}
      aria-label={person.id}
      className="lg:grid lg:grid-cols-6 lg:rounded-none lg:shadow-none lg:bg-transparent lg:hover:bg-default-50 lg:hover:duration-300"
    >
      <BlurredBackground
        alt="Card background"
        className="lg:hidden"
        src={candidateImage ? candidateImage : ""}
      />
      <Card.Header className="relative h-52 ps-5 gap-1 lg:ps-6 lg:h-full lg:w-fit">
        <div className="hidden items-center self-start lg:self-center text-default-200 gap-5 z-10">
          <Checkbox
            onChange={() => toast.info("Development in Progress")}
            name={JSON.stringify(person)}
          >
            <Checkbox.Control>
              <Checkbox.Indicator className="rounded-full" />
            </Checkbox.Control>
          </Checkbox>
        </div>
        <Avatar className="absolute top-0 start-0 w-full h-full rounded-none lg:static lg:w-14 lg:h-14 lg:rounded-full">
          <Avatar.Image src={candidateImage} />
          <Avatar.Fallback className="absolute top-0 start-0 translate-x-0 translate-y-0 lg:static lg:w-14 lg:h-14 lg:rounded-full" />
        </Avatar>
      </Card.Header>
      <Card.Content className="items-start justify-start w-fit mx-auto text-sm lg:w-auto lg:mx-0 lg:items-center lg:col-span-4 lg:grid lg:grid-cols-4">
        <div className="flex text-center text-xl font-semibold lg:text-medium lg:font-normal">
          {candidateName ? (
            <span>{candidateName}</span>
          ) : (
            <Skeleton className="h-4 w-8" />
          )}
        </div>
        <div className="justify-center items-center gap-1 lg:min-w-56 2xl:min-w-64 hidden">
          {candidateEmail ? (
            <Snippet symbol={<Icons.Email />} className="p-0 text-medium">
              <Link href={`mailto:${candidateEmail}`}>{candidateEmail}</Link>
            </Snippet>
          ) : (
            <Skeleton className="h-4 w-24 lg:w-32" animationType="none" />
          )}
        </div>
        <div className="flex justify-center items-center gap-1">
          {candidateEducation ? (
            <Chip variant="tertiary">
              <Icons.Education className="lg:hidden" />
              <Chip.Label className="text-pretty">
                {candidateEducation}
              </Chip.Label>
            </Chip>
          ) : (
            <Skeleton className="h-4 w-4" animationType="none" />
          )}
        </div>
        <div className="flex h-fit justify-center items-center gap-1">
          {candidateJob ? (
            <Chip variant="tertiary">
              <Icons.File className="lg:hidden" />
              <Chip.Label className="text-pretty">{candidateJob}</Chip.Label>
            </Chip>
          ) : (
            <Skeleton className="h-4 w-4" animationType="none" />
          )}
        </div>
        <div className="flex justify-center items-center gap-1">
          {candidateLocation ? (
            <Chip variant="tertiary">
              <Icons.Location className="lg:hidden" />
              <Chip.Label className="text-pretty">
                {candidateLocation}
              </Chip.Label>
            </Chip>
          ) : (
            <Skeleton className="h-4 w-4" animationType="none" />
          )}
        </div>
      </Card.Content>
      <Card.Footer className="justify-center gap-1 pe-5 z-10">
        <Tooltip>
          <Tooltip.Trigger>
            <Link href={getLinkedinURL(person)} target="_blank">
              <Button isIconOnly variant="ghost" className="rounded-full">
                <Linkedin />
              </Button>
            </Link>
          </Tooltip.Trigger>
          <Tooltip.Content>View LinkedIn Profile</Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => setIsDetailsOpen(true)}
              className="hidden lg:flex rounded-full"
            >
              <Icons.Eye />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>View Details</Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              variant="ghost"
              isDisabled={buttonDisabled}
              onPress={() => {
                handleAddApplicant();
                setButtonDisabled(!buttonDisabled);
              }}
              className="rounded-full"
            >
              <Icons.Plus />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Add to Applicants</Tooltip.Content>
        </Tooltip>
        {isDetailsOpen && person && (
          <ItemDetails
            isOpen={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            person={person}
            handleAddApplicant={handleAddApplicant}
            buttonDisabled={buttonDisabled}
            setButtonDisabled={setButtonDisabled}
          />
        )}
      </Card.Footer>
    </Card>
  );
}
