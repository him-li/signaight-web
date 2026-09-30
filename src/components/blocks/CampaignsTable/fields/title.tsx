import Link from "next/link";
import type { Project } from "@/types/project.interface";
import { ROUTES } from "@/constants/routes";
type TitleProps = {
  project: Project;
  isTitleEnlarged?: boolean;
};
export default function Title({
  project,
  isTitleEnlarged = false,
}: TitleProps) {
  return (
    <Link
      href={`${ROUTES.SCREENING}/${project?.id}`}
      className={isTitleEnlarged ? "text-xl font-semibold" : "text-sm"}
    >
      {project.title}
    </Link>
  );
}
