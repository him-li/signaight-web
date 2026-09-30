import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setPageLoading } from "@/store/pageLoadingSlice";
import {
  Accordion,
  Avatar,
  Chip,
  Label,
  Separator,
  ProgressBar,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import Image from "next/image";
import Display from "@/components/atoms/Display";
import SubjectProfiles from "./SubjectProfiles";
import SearchStatus from "@/components/atoms/CommonFields/person/status";
import { hasAnyNonEmptyStringOrArray } from "@/utils/hasData";
import { getPersonName } from "@/utils/getPersonName";
import { ROUTES } from "@/constants/routes";
import type { Person } from "@/types/person/index.interface";
import type { PersonalDetails } from "@/types/person/personal_details/index.interface";
type PersonProfileProps = {
  initialPersonalDetails: PersonalDetails;
};
const Email = dynamic(
  () => import("@/components/atoms/CommonFields/person/email"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const Phone = dynamic(
  () => import("@/components/atoms/CommonFields/person/phone"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
import SocialConnectionsFiveListSkeleton from "../../skeletons/SocialConnectionsFiveListSkeleton";
import { useClientPersonsAutoPolling } from "@/utils/hooks/useClientPersonAutoPolling";
import {
  selectCurrentSelectedSubjectsData,
  selectCurrentSubjectData,
} from "@/store/subjectsSlice/subjects.selectors";
const PersonAvatars = dynamic(() => import("./PersonAvatars"), {
  loading: () => null,
  ssr: false,
});
const SocialConnections = dynamic(
  () => import("@/components/atoms/SocialConnections"),
  {
    loading: () => <SocialConnectionsFiveListSkeleton />,
    ssr: false,
  },
);
const SocialLinks = dynamic(() => import("@/components/atoms/SocialLinks"), {
  loading: () => <SocialConnectionsFiveListSkeleton />,
  ssr: false,
});

export default function PersonProfile({
  initialPersonalDetails,
}: PersonProfileProps) {
  const dispatch = useAppDispatch();
  const person = useAppSelector(selectCurrentSubjectData);
  const params = useParams();
  useClientPersonsAutoPolling();
  const birthyear =
    person?.personal_details?.birth_year_birthday?.year_of_birth?.birthyear ??
    person?.personal_details?.birth_year_birthday?.birthday?.fb_birth_year;
  const age = birthyear ? new Date().getFullYear() - birthyear : "N/A";
  const countryCode = person?.nationality?.toUpperCase();
  const subjectIdStr = params?.subjectId?.toString();
  const selectedSubjects = useAppSelector(selectCurrentSelectedSubjectsData);
  const currentSubjectIndex = selectedSubjects.findIndex(
    (subject: Person) => subject.id === subjectIdStr,
  );
  const rankPosition = currentSubjectIndex + 1;
  const rankSize = selectedSubjects?.length;

  const previousSubject = selectedSubjects[currentSubjectIndex - 1];
  const nextSubject = selectedSubjects[currentSubjectIndex + 1];

  const nextSubjectLink = selectedSubjects?.length
    ? currentSubjectIndex === selectedSubjects?.length - 1
      ? `${ROUTES.ANALYSIS}/${selectedSubjects[0]?.id}`
      : nextSubject
        ? `${ROUTES.ANALYSIS}/${nextSubject.id}`
        : `${ROUTES.ANALYSIS}/${subjectIdStr}`
    : `${ROUTES.ANALYSIS}/${subjectIdStr}`;

  const prevSubjectLink =
    currentSubjectIndex === 0
      ? `${ROUTES.ANALYSIS}/${selectedSubjects[selectedSubjects?.length - 1].id}`
      : previousSubject
        ? `${ROUTES.ANALYSIS}/${previousSubject.id}`
        : `${ROUTES.ANALYSIS}/${subjectIdStr}`;

  const handlePageChange = () => {
    dispatch(setPageLoading());
  };

  return (
    <div className="flex flex-col w-full gap-4 justify-self-center self-center-safe items-center-safe">
      <PersonAvatars />
      <div className="flex w-full justify-between items-center">
        <Link
          aria-label="Previous subject"
          href={prevSubjectLink}
          onClick={handlePageChange}
          className="inline-flex size-8 items-center justify-center rounded-full hover:bg-default-hover"
        >
          <Icons.ChevronLeft />
        </Link>
        <p className="text-xl font-bold">
          {getPersonName(person?.personal_details?.name, "full_name")}
        </p>
        <Link
          aria-label="Next subject"
          href={nextSubjectLink}
          onClick={handlePageChange}
          className="inline-flex size-8 items-center justify-center rounded-full hover:bg-default-hover"
        >
          <Icons.ChevronRight />
        </Link>
      </div>
      <Display when={person !== undefined} fallback={<SubjectProfiles />}>
        <Display
          when={person?.search_state?.is_done === false}
          fallback={<></>}
        >
          <SearchStatus searchState={person?.search_state} />
        </Display>
        <SocialConnections person={person!}>
          <SocialLinks person={person!} />
        </SocialConnections>
      </Display>
      <Accordion
        hideSeparator
        defaultExpandedKeys={["1"]}
        allowsMultipleExpanded
      >
        <Accordion.Item id="1" key="1" aria-label="Personal Details">
          <Accordion.Heading>
            <Accordion.Trigger className="gap-2">
              <Icons.Person />
              Personal Details
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="grid grid-cols-2 gap-1 text-sm w-full overflow-x-auto text-foreground">
              <ProgressBar
                aria-label="Risk Score"
                color={
                  !person?.risk_score
                    ? "default"
                    : person?.risk_score > 80
                      ? "danger"
                      : person?.risk_score > 60
                        ? "warning"
                        : "accent"
                }
                value={person?.risk_score}
                formatOptions={{ style: "decimal" }}
                className="col-span-2"
              >
                <Label className="text-sm font-normal">Risk Score</Label>
                <ProgressBar.Output className="text-sm" />
                <ProgressBar.Track className="stroke-white/10">
                  <ProgressBar.Fill />
                </ProgressBar.Track>
              </ProgressBar>

              <p>Risk Rank</p>
              <p>
                {rankPosition}/{rankSize}
              </p>

              <Display when={!!countryCode} fallback={<></>}>
                <Separator className="col-span-2" />
                <p>Nationalities</p>
                <Chip variant="soft">
                  <Avatar className="w-4 h-4">
                    <Avatar.Image
                      alt={countryCode}
                      src={`https://flagcdn.com/${countryCode?.toLowerCase()}.svg`}
                    />
                    <Avatar.Fallback>{countryCode}</Avatar.Fallback>
                  </Avatar>
                  {countryCode}
                </Chip>
              </Display>

              <Display
                when={!!person?.personal_details?.ethnicity}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Ethnicities</p>
                <p>{person?.personal_details?.ethnicity}</p>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.personal_details?.gender,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Gender</p>
                <p>
                  {person?.personal_details?.gender?.gender ??
                    person?.personal_details?.gender?.fb_gender}
                </p>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.personal_details?.birth_year_birthday,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Age</p>
                <p>{age}</p>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.biographic_details?.marital_status_relatives
                    ?.marital_status,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Marital Status</p>
                <p>
                  {
                    person?.biographic_details?.marital_status_relatives
                      ?.marital_status
                  }
                </p>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.personal_details?.phone,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <div className="col-span-2 flex items-center justify-between">
                  <p className="my-auto text-wrap">Phone</p>
                  <div className="flex flex-col justify-start overflow-x-auto scrollbar-hide">
                    <Phone
                      phone={person?.personal_details?.phone}
                      hideSymbol={false}
                      isEntryPoint={
                        !!initialPersonalDetails?.phone?.phones?.[0]
                      }
                    />
                  </div>
                </div>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.personal_details?.email,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <div className="col-span-2 flex items-center justify-between">
                  <p>Email</p>
                  <div className="flex flex-col justify-start overflow-x-auto scrollbar-hide">
                    <Email
                      email={person?.personal_details?.email}
                      hideSymbol={false}
                      isEntryPoint={
                        !!initialPersonalDetails?.email?.email_address?.[0]
                      }
                    />
                  </div>
                </div>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.personal_details?.languages,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Languages</p>
                <p>
                  {person?.personal_details?.languages?.languages
                    ?.map((lang) => lang.language)
                    .join(", ")}
                </p>
              </Display>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          id="2"
          key="2"
          aria-label="PNR Data"
          className={
            hasAnyNonEmptyStringOrArray(person?.pnr_data) ? "" : "hidden"
          }
        >
          <Accordion.Heading>
            <Accordion.Trigger className="gap-2">
              <Icons.Plane />
              PNR Data
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="grid grid-cols-2 gap-1 text-sm w-full overflow-x-auto">
              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.pnr_data?.emergency_contact,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Emergency Contact</p>
                <div className="flex flex-col items-start">
                  <p>{person?.pnr_data?.emergency_contact?.name}</p>
                  <p>{person?.pnr_data?.emergency_contact?.phone}</p>
                </div>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.pnr_data?.passport_number,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p className="text-wrap">Passport Details</p>
                <div className="flex flex-col items-start">
                  <p>{person?.pnr_data?.passport_number}</p>
                  <Image
                    alt={countryCode + "passport"}
                    src={`/api/passportindex/${countryCode?.toUpperCase()}`}
                    width={50}
                    height={100}
                    className="rounded-md"
                  />
                </div>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.pnr_data?.travel_frequency,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Travel Frequency</p>
                <p>{person?.pnr_data?.travel_frequency}</p>
              </Display>

              <Display
                when={hasAnyNonEmptyStringOrArray(
                  person?.pnr_data?.itinerary_profile,
                )}
                fallback={<></>}
              >
                <Separator className="col-span-2" />
                <p>Itinerary Profile</p>
                <p>{person?.pnr_data?.itinerary_profile}</p>
              </Display>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
