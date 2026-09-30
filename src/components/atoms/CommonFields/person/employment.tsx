import Display from "@/components/atoms/Display";
import { Avatar } from "@heroui/react";
import ImageZoom from "@/components/atoms/ImageZoom";
import { Icons } from "@/components/atoms/Icons";
import type { Work } from "@/types/person/biographic_details/work/index.interface";
const style = "flex items-center justify-between bg-transparent w-full";

export default function Employment({ employment }: { employment?: Work }) {
  const renderPositions = () => {
    if (employment?.linkedin_work?.positions) {
      return employment.linkedin_work.positions?.map((position, index) => (
        <div className={style} key={index}>
          <div>
            <p className="font-semibold">{position.title}</p>
            <p className="font-semibold">{position.company_name}</p>
            <p>
              {position?.period?.date_from} - {position?.period?.date_to} (
              {position.duration?.years ?? 0} years{" "}
              {position.duration?.months ?? 0} months)
            </p>
            <p>{position.location}</p>
          </div>
          <ImageZoom src={position.company_logo_url}>
            <Avatar size="sm" className="min-w-8 rounded-full">
              <Avatar.Image src={position.company_logo_url} />
              <Avatar.Fallback>
                <Icons.Work />
              </Avatar.Fallback>
            </Avatar>
          </ImageZoom>
        </div>
      ));
    }

    if (employment?.xing_work?.positions) {
      return employment.xing_work.positions.map((position, index) => (
        <div className={style} key={index}>
          <div>
            <p className="font-semibold">{position.title}</p>
            <p className="font-semibold">{position.company_name}</p>
            <p>
              {position?.period?.date_from} - {position?.period?.date_to} (
              {position.duration?.years ?? 0} years{" "}
              {position.duration?.months ?? 0} months)
            </p>
            <p>{position.location}</p>
          </div>
          <ImageZoom src={position.company_logo_url}>
            <Avatar size="sm" className="min-w-8 rounded-full">
              <Avatar.Image src={position.company_logo_url} />
              <Avatar.Fallback>
                <Icons.Work />
              </Avatar.Fallback>
            </Avatar>
          </ImageZoom>
        </div>
      ));
    }

    if (employment?.facebook_work) {
      return employment.facebook_work.map((position, index) => (
        <div className={style} key={index}>
          <div>
            <p className="font-semibold">{position.fb_work_title}</p>
            <p className="font-semibold">{position.fb_workplace_name}</p>
            <p>
              {position.fb_work_period?.date_from} -{" "}
              {position.fb_work_period?.date_to}
            </p>
            <p>{position.fb_workplace_location}</p>
          </div>
          <ImageZoom src={position.fb_workplace_photo_url}>
            <Avatar size="sm" className="min-w-8 rounded-full">
              <Avatar.Image src={position.fb_workplace_photo_url} />
              <Avatar.Fallback>
                <Icons.Work />
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
        (!!employment?.facebook_work && employment.facebook_work.length > 0) ||
        (!!employment?.linkedin_work &&
          employment.linkedin_work?.positions?.length) ||
        (!!employment?.xing_work?.positions &&
          employment.xing_work?.positions?.length > 0)
      }
      fallback={<></>}
    >
      {renderPositions()}
    </Display>
  );
}
