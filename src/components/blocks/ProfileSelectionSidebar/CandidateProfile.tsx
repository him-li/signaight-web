import { Avatar } from "@heroui/react";
import Snippet from "@/components/atoms/Snippet";
import Link from "next/link";
import ImageZoom from "@/components/atoms/ImageZoom";
import Capitalize from "@/utils/capitalize";
import { getPersonName } from "@/utils/getPersonName";
import { hasValidHttpUrl } from "@/utils/hasData";
import type { Candidate } from "@/types/candidate.interface";
import { Icons } from "@/components/atoms/Icons";
const MAX_LENGTH = 60;
const showTitle = (title: string) =>
  title.length > MAX_LENGTH ? title.slice(0, MAX_LENGTH) + "..." : title;

type CandidateProfileProps = {
  profilePicture: string;
  userName: string;
  showSource?: boolean;
  candidate: Candidate;
  sourceLinkData: any;
  primaryId: string;
};
export default function CandidateProfile({
  profilePicture,
  userName,
  showSource = false,
  candidate,
  sourceLinkData,
  primaryId,
}: CandidateProfileProps) {
  const renderSourceLink = (sourceLinkData: string) => {
    if (!sourceLinkData || sourceLinkData.length === 0) return null;
    return (
      <>
        {hasValidHttpUrl(sourceLinkData) ? (
          <div className="flex items-center-safe">
            <Link
              href={sourceLinkData}
              target="_blank"
              className="text-xs whitespace-nowrap"
            >
              {showTitle(sourceLinkData)}
            </Link>
            <Snippet symbol="" size="sm" hideContent>
              {sourceLinkData}
            </Snippet>
          </div>
        ) : (
          <span>{showTitle(sourceLinkData)}</span>
        )}
      </>
    );
  };
  return (
    <ImageZoom src={profilePicture as string}>
      <div className="inline-flex items-center gap-2">
        <Avatar>
          <Avatar.Image
            src={profilePicture}
            alt={getPersonName(candidate?.personal_details?.name, "full_name")}
            className="min-w-10"
          />
          <Avatar.Fallback>
            <Icons.Person />
          </Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span
            className={
              candidate.primary || candidate.id === primaryId
                ? "font-semibold text-sm text-default-foreground"
                : "font-normal text-sm text-default-foreground"
            }
          >
            {userName}
          </span>
          <span
            className={
              candidate.network_signature !== undefined
                ? "flex flex-col items-start text-foreground"
                : "hidden"
            }
          >
            {showSource && <span>Source: {Capitalize(candidate.source)}</span>}
            {typeof sourceLinkData === "string" ? (
              <>{renderSourceLink(sourceLinkData)}</>
            ) : (
              <>
                {sourceLinkData?.length ? (
                  <div className="flex flex-col items-start">
                    {sourceLinkData.map((source: string) => (
                      <div key={source} className="text-right my-1">
                        {renderSourceLink(source)}
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </span>
        </div>
      </div>
    </ImageZoom>
  );
}
