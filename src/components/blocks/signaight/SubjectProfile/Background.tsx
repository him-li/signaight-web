import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectProfilePhotoData } from "@/store/subjectsSlice/subjects.selectors";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { useMemo } from "react";
import { getPersonAvatar } from "@/utils/getPersonAvatar";

export default function Background() {
  const profilePhoto = useAppSelector(selectCurrentSubjectProfilePhotoData);
  const avatar = useMemo(() => getPersonAvatar(profilePhoto), [profilePhoto]);

  return (
    <BlurredBackground
      alt="bg"
      src={avatar}
      height={90}
      overflow="visible"
      radius="none"
    />
  );
}
