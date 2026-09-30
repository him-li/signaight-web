"use client";
import { Tooltip } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { ControlProps } from "@jsonforms/core";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import {
  selectCurrentSubjectEmail,
  selectCurrentSubjectEmailList,
  selectCurrentSubjectLocation,
  selectCurrentSubjectMaritalStatus,
  selectCurrentSubjectBirthdate,
} from "@/store/subjectsSlice";
import type { Location } from "@/types/person/personal_details/location.interface";
import { Icons } from "@/components/atoms/Icons";
import BlockLayout from "@/components/atoms/BlockLayout";
import { usePersonalDataState } from "@/contexts/personalDataContext/PersonalDataContext";
import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";

function PersonalDetails(props: ControlProps) {
  const { currentSubjectData: personData, loading } = usePersonalDataState();
  const personEmail: string = useAppSelector(selectCurrentSubjectEmail);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const personEmailList: any[] = useAppSelector(selectCurrentSubjectEmailList);
  const personLocation: Location = useAppSelector(
    selectCurrentSubjectLocation,
  ) as Location;
  const personCurrentLocation =
    personLocation?.current_city_region_country?.linkedin_location ??
    personLocation?.current_city?.fb_current_city;
  const personBirthdate = useAppSelector(selectCurrentSubjectBirthdate);
  const personMaritalStatus = useAppSelector(selectCurrentSubjectMaritalStatus);

  if (loading || !personData?.personal_details) return null;

  return (
    <SettingsWrapper {...props}>
      <BlockLayout
        id="#/properties/personalDetails"
        isVisible={
          (personData?.personal_details?.phone?.linkedin_phone_numbers &&
            personData?.personal_details?.phone?.linkedin_phone_numbers
              ?.length > 0) ||
          personEmail !== undefined
        }
        title={props?.label || "Personal Details"}
      >
        {personData?.personal_details?.phone?.linkedin_phone_numbers &&
          personData?.personal_details?.phone?.linkedin_phone_numbers.length >
            0 && (
            <div className="flex w-full justify-between">
              <p className="font-semibold">Phone</p>
              <p>
                {
                  personData?.personal_details?.phone
                    ?.linkedin_phone_numbers?.[0]
                }
              </p>
            </div>
          )}
        {personEmail && (
          <div className="flex w-full justify-between items-center">
            <p className="font-semibold">Email</p>
            {personEmailList.map((email, index) => (
              <Snippet
                key={index}
                symbol={
                  <Icons.EntryPoint
                    className={email.type == "primary" ? "visible" : "hidden"}
                  />
                }
                className="font-sans flex items-center gap-1 bg-transparent  p-0"
              >
                <Tooltip key={email}>
                  <Tooltip.Trigger>
                    <Link href={`mailto:${email.value}`}>{email.value}</Link>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Initial input</Tooltip.Content>
                </Tooltip>
              </Snippet>
            ))}
          </div>
        )}
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
              {personData?.personal_details?.location?.current_city
                ?.fb_current_city ??
                personData?.personal_details?.location
                  ?.current_city_region_country?.linkedin_location}
            </p>
          </div>
        )}
        {personMaritalStatus && (
          <div className="flex w-full justify-between">
            <p className="font-semibold">Relationship</p>
            <p>{personMaritalStatus ?? "---"}</p>
          </div>
        )}
      </BlockLayout>
    </SettingsWrapper>
  );
}

const PersonalDetailsWithJsonForms = withJsonFormsControlProps(PersonalDetails);
export default PersonalDetailsWithJsonForms;
