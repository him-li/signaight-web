"use client";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import { ControlProps } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import BlockLayout from "@/components/atoms/BlockLayout";
import { usePersonalDataState } from "@/contexts/personalDataContext/PersonalDataContext";
import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import Pagination from "@/components/atoms/Pagination";
import { Icons } from "@/components/atoms/Icons";

function WorkExperience(props: ControlProps) {
  const [currentPage, setCurentPage] = useState(1);
  const { currentSubjectData: personData, loading } = usePersonalDataState();
  if (loading || !personData?.biographic_details) return null;

  const data = props.uischema.options?.pagination?.available
    ? personData?.biographic_details?.work?.linkedin_work?.positions?.slice(
        (currentPage - 1) * props.uischema.options?.pagination?.pageSize,
        props.uischema.options?.pagination?.pageSize,
      )
    : personData?.biographic_details?.work?.linkedin_work?.positions;

  return (
    <SettingsWrapper {...props}>
      <BlockLayout
        id="#/properties/biographicDetails"
        isVisible={
          (personData?.biographic_details?.work?.linkedin_work?.positions !==
            undefined &&
            personData?.biographic_details?.work?.linkedin_work?.positions
              ?.length > 0) ||
          (personData?.biographic_details?.work?.facebook_work !== undefined &&
            personData?.biographic_details?.work?.facebook_work?.length > 0)
        }
        title={props.label}
      >
        {personData?.biographic_details?.work?.linkedin_work?.positions
          ? data?.map((position, index) => {
              return (
                <div
                  className="flex items-center justify-between bg-transparent"
                  key={index}
                >
                  <div>
                    <p className="font-semibold">{position.title}</p>
                    <p className="font-semibold">{position.company_name}</p>
                    <p>
                      {position?.period?.date_from} -{" "}
                      {position?.period?.date_to}{" "}
                      <>
                        ({position.duration?.years ?? 0} years{" "}
                        {position.duration?.months ?? 0} months)
                      </>
                    </p>
                    <p>{position.location}</p>
                  </div>
                  <Avatar size="sm" className="min-w-8 rounded-full">
                    <Avatar.Image src={position.company_logo_url} />
                    <Avatar.Fallback>
                      <Icons.Work />
                    </Avatar.Fallback>
                  </Avatar>
                </div>
              );
            })
          : personData?.biographic_details?.work?.facebook_work &&
            personData?.biographic_details?.work?.facebook_work.map(
              (position, index) => {
                return (
                  <div
                    className="flex items-center justify-between bg-transparent"
                    key={index + position.fb_workplace_name}
                  >
                    <div>
                      <p className="font-semibold">{position.fb_work_title}</p>
                      <p className="font-semibold">
                        {position.fb_workplace_name}
                      </p>
                      <p>
                        {position.fb_work_period?.date_from} -{" "}
                        {position.fb_work_period?.date_to}
                      </p>
                      <p>{position.fb_workplace_location}</p>
                    </div>
                    <Avatar size="sm" className="min-w-8 rounded-full">
                      <Avatar.Image src={position.fb_workplace_photo_url} />
                      <Avatar.Fallback>
                        <Icons.Work />
                      </Avatar.Fallback>
                    </Avatar>
                  </div>
                );
              },
            )}
        {props.uischema.options?.pagination?.available ? (
          <Pagination
            total={
              personData?.biographic_details?.work?.linkedin_work?.positions
                ?.length ?? 0
            }
            currentPage={currentPage}
            pageSize={props.uischema.options?.pagination?.pageSize}
            onPageChange={(page) => {
              setCurentPage(page);
            }}
          />
        ) : null}
      </BlockLayout>
    </SettingsWrapper>
  );
}

const WorkExperienceWithJsonForms = withJsonFormsControlProps(WorkExperience);
export default WorkExperienceWithJsonForms;
