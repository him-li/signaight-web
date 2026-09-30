import Display from "@/components/atoms/Display";
import { Avatar } from "@heroui/react";
import ImageZoom from "@/components/atoms/ImageZoom";
import { Icons } from "@/components/atoms/Icons";
import type { Education } from "@/types/person/biographic_details/education.interface";
const style = "flex items-center justify-between w-full";

export default function Education({ education }: { education?: Education }) {
  const renderEducation = () => {
    if (education?.linkedin_schools?.length) {
      return education.linkedin_schools.map((school, index) => (
        <div className={style} key={index}>
          <div className="w-full">
            {school.degree_name && (
              <p className="font-semibold">{school.degree_name}</p>
            )}
            {school.education_field && (
              <p className="font-semibold">{school.education_field}</p>
            )}
            {school.school_name && <p>{school.school_name}</p>}
            <p>
              {school.period?.date_from} - {school.period?.date_to}
            </p>
          </div>
          <ImageZoom src={school.school_logo_url}>
            <Avatar size="sm" className="min-w-8 rounded-full">
              <Avatar.Image src={school.school_logo_url} />
              <Avatar.Fallback>
                <Icons.Education />
              </Avatar.Fallback>
            </Avatar>
          </ImageZoom>
        </div>
      ));
    }

    if (education?.xing_schools?.length) {
      return education.xing_schools.map((school, index) => (
        <div className={style} key={index}>
          <div className="w-full">
            {school.degree_name && (
              <p className="font-semibold">{school.degree_name}</p>
            )}
            {school.education_field && (
              <p className="font-semibold">{school.education_field}</p>
            )}
            {school.school_name && <p>{school.school_name}</p>}
            <p>
              {school.period?.date_from} - {school.period?.date_to}
            </p>
          </div>
          <ImageZoom src={school.school_logo_url}>
            <Avatar size="sm" className="min-w-8 rounded-full">
              <Avatar.Image src={school.school_logo_url} />
              <Avatar.Fallback>
                <Icons.Education />
              </Avatar.Fallback>
            </Avatar>
          </ImageZoom>
        </div>
      ));
    }

    if (education?.facebook_schools?.length) {
      return education.facebook_schools.map((school, index) => (
        <div className={style} key={index}>
          <div className="w-full">
            {school.fb_education_field && (
              <p className="font-semibold">{school.fb_education_field}</p>
            )}
            {school.fb_school_description && (
              <p className="font-semibold">{school.fb_school_description}</p>
            )}
            {school.fb_school_name && <p>{school.fb_school_name}</p>}
            <p>
              {school.period?.date_from} - {school.period?.date_to}
            </p>
          </div>
          <ImageZoom src={school.fb_school_photo}>
            <Avatar size="sm" className="min-w-8 rounded-full">
              <Avatar.Image src={school.fb_school_photo} />
              <Avatar.Fallback>
                <Icons.Education />
              </Avatar.Fallback>
            </Avatar>
          </ImageZoom>
        </div>
      ));
    }

    return null;
  };

  return (
    <Display
      when={
        (!!education?.linkedin_schools &&
          education?.linkedin_schools?.length > 0) ||
        (!!education?.facebook_schools &&
          education?.facebook_schools?.length > 0) ||
        (!!education?.xing_schools && education?.xing_schools?.length > 0)
      }
      fallback={<></>}
    >
      {renderEducation()}
    </Display>
  );
}
