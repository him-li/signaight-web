"use client";
import { useAppSelector } from "@/store/store";
import { selectSubjectsState } from "@/store/subjectsSlice";
import { Avatar } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";

export default function Curiosity() {
  const personData = useAppSelector(selectSubjectsState).currentSubjectData;
  const instagramBio =
    personData?.biographic_details?.description_bio_intro?.instagram_bio;
  const insterestPages = personData?.interests?.pages;

  return (
    <div
      className={`${
        instagramBio || (insterestPages && insterestPages?.length > 0)
          ? "block"
          : "hidden"
      } w-full`}
    >
      <h2 className="mb-4 text-medium">Details</h2>
      <div className="flex flex-col rounded-2xl gap-4 p-8 bg-default-100 text-xs">
        {instagramBio && <div>{instagramBio}</div>}
        {insterestPages &&
          insterestPages?.map((page) => {
            return (
              <div className="inline-flex items-center gap-2">
                <Avatar key={page.fb_page_url} size="sm">
                  <Avatar.Image src={page.fb_page_profile_photo} />
                  <Avatar.Fallback>
                    <Icons.Person />
                  </Avatar.Fallback>
                </Avatar>
                <span className="flex flex-col items-start text-sm">
                  {page.fb_page_name}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
