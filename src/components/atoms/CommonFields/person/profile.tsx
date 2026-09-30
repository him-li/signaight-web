import dynamic from "next/dynamic";
import { Skeleton, Avatar } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import { getPersonName } from "@/utils/getPersonName";
import ImageZoom from "@/components/atoms/ImageZoom";
import Location from "./location";
import Phone from "./phone";
import SearchStatus from "./status";
import Display from "@/components/atoms/Display";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import type { Person } from "@/types/person/index.interface";
const Email = dynamic(
  () => import("@/components/atoms/CommonFields/person/email"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
import PersonImage from "./PersonImage";

type ProfileProps = {
  person: Person;
  isLoading?: boolean;
  hideEmail?: boolean;
  hideLocation?: boolean;
  hidePhone?: boolean;
  hideStatus?: boolean;
  textSize?: "sm" | "md" | "lg";
};

export default function Profile({
  person,
  isLoading,
  hideEmail = false,
  hideLocation = false,
  hidePhone = true,
  hideStatus = true,
  textSize,
}: ProfileProps) {
  const avatar = getPersonAvatar(
    person?.personal_details?.visuals?.profile_photo,
  );
  const name = getPersonName(person?.personal_details?.name, "full_name");

  return (
    <Display
      when={!isLoading}
      fallback={
        <div className="max-w-75 w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      }
    >
      <ImageZoom src={avatar}>
        <div className="inline-flex items-center gap-2">
          <PersonImage src={avatar!} alt={name!} />
          <div className="flex flex-col items-start">
            <Snippet
              hideSymbol
              className={`font-semibold flex items-center text-${textSize}`}
            >
              {name}
            </Snippet>
            <div className="flex flex-col">
              {hideEmail ? null : (
                <Email
                  email={person?.personal_details?.email}
                  hideSymbol={false}
                />
              )}
              {hideLocation ? null : (
                <Location location={person?.personal_details?.location} />
              )}
              {hidePhone ? null : (
                <Phone phone={person?.personal_details?.phone} />
              )}
              {hideStatus ? null : (
                <SearchStatus searchState={person?.search_state} />
              )}
            </div>
          </div>
        </div>
      </ImageZoom>
    </Display>
  );
}
