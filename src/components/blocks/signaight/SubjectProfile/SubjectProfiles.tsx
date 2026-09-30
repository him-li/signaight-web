"use client";
import { Button, ButtonGroup } from "@heroui/react";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
const Linkedin = getSocialMediaIcon("linkedin");
const Facebook = getSocialMediaIcon("facebook");

export default function SubjectProfiles() {
  const subjectData = useAppSelector(selectCurrentSubjectData);

  return (
    <ButtonGroup fullWidth variant="tertiary" className="w-full rounded-full">
      <Link
        href={`${subjectData?.network_signature?.url?.linkedin_profile_url}`}
      >
        <Button className="grow">
          <Linkedin />
        </Button>
      </Link>
      <Link
        href={`${subjectData?.network_signature?.url?.facebook_profile_url}`}
      >
        <Button className="grow">
          <Facebook />
        </Button>
      </Link>
    </ButtonGroup>
  );
}
