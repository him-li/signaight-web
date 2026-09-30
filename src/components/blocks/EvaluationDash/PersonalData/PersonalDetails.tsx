"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/store/store";
import {
  selectCurrentSubjectEmail,
  selectCurrentSubjectLocation,
  selectCurrentSubjectMaritalStatus,
  selectCurrentSubjectBirthdate,
} from "@/store/subjectsSlice";
import BlockLayout from "@/components/atoms/BlockLayout";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { useInitialPersonState } from "@/contexts/personalDataContext/InitialPersonDataContext";
import { getPersonPhones } from "@/utils/getPersonPhone";
import Display from "@/components/atoms/Display";
import { Icons } from "@/components/atoms/Icons";
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
import type { Location } from "@/types/person/personal_details/location.interface";

export default function PersonalDetails() {
  const person = useAppSelector(selectCurrentSubjectData);
  const personEmail: string = useAppSelector(selectCurrentSubjectEmail);
  const personLocation: Location = useAppSelector(
    selectCurrentSubjectLocation,
  ) as Location;
  const personCurrentLocation =
    personLocation?.current_city_region_country?.linkedin_location ??
    personLocation?.current_city?.fb_current_city;
  const personBirthdate = useAppSelector(selectCurrentSubjectBirthdate);
  const personMaritalStatus = useAppSelector(selectCurrentSubjectMaritalStatus);
  const { initialPersonalData: initialPersonalDetails } =
    useInitialPersonState();
  const personPhone = getPersonPhones(person?.personal_details?.phone);

  return (
    <BlockLayout title="Personal Details" icon={<Icons.Person />}>
      <Display when={personPhone.length > 0} fallback={<></>}>
        <div className="flex w-full justify-between">
          <p className="font-semibold">Phone</p>
          <Phone
            phone={person?.personal_details?.phone}
            hideSymbol={false}
            isEntryPoint={!!initialPersonalDetails?.phone?.phones?.[0]}
          />
        </div>
      </Display>
      <Display when={personEmail} fallback={<></>}>
        <div className="flex w-full justify-between items-center">
          <p className="font-semibold">Email</p>
          <Email
            email={person?.personal_details?.email}
            hideSymbol={false}
            isEntryPoint={!!initialPersonalDetails?.email?.email_address?.[0]}
          />
        </div>
      </Display>
      {personBirthdate && (
        <div className="flex w-full justify-between">
          <p className="font-semibold">Birthdate</p>
          <p>
            {new Date(personBirthdate).toLocaleDateString("en-GB") ?? "---"}
          </p>
        </div>
      )}
      {personCurrentLocation && (
        <div className="flex w-full justify-between">
          <p className="font-semibold">Address</p>
          <p>
            {person?.personal_details?.location?.current_city
              ?.fb_current_city ??
              person?.personal_details?.location?.current_city_region_country
                ?.linkedin_location}
          </p>
        </div>
      )}
      {personMaritalStatus && (
        <div className="flex w-full justify-between">
          <p className="font-semibold">Relationship</p>
          <p>{personMaritalStatus ?? "---"}</p>
        </div>
      )}
      {person?.personal_details?.ethnicity && (
        <div className="flex w-full justify-between">
          <p className="font-semibold">Ethnicity</p>
          <p>{person?.personal_details?.ethnicity}</p>
        </div>
      )}
    </BlockLayout>
  );
}
