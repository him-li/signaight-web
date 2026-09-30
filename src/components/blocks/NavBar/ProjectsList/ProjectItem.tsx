/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Link from "next/link";
import Display from "@/components/atoms/Display";
import { Button } from "@heroui/react";
import { ProjectItemProps } from "../../signaight/ProjectsList/type";
import { setMaxStringLength } from "@/utils/setMaxStringLength";
import { PROJECT_NAME_LENGTH } from "@/constants/projects";

type Props = ProjectItemProps;

const ITEM_HEIGHT = 40;

export default function ProjectItem({
  registerChild,
  data,
  style,
  key,
}: Props) {
  return (
    <Display
      when={data}
      fallback={
        <div
          className={`flex justify-center w-full h-[${ITEM_HEIGHT}px] items-center`}
        >
          Loading...
        </div>
      }
    >
      <Link ref={registerChild} key={key} href={`/campaigns/${data?.id}`}>
        <Button style={style} variant="ghost" className="justify-start">
          {setMaxStringLength(data?.title, PROJECT_NAME_LENGTH)}
        </Button>
      </Link>
    </Display>
  );
}
