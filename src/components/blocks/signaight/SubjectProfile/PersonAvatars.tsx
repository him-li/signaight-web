import { useMemo, useCallback } from "react";
import PersonAvatar from "./PersonAvatar";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectProfilePhotoData } from "@/store/subjectsSlice/subjects.selectors";
import { usePersonAvatarsModal } from "../../modals/PersonAvatarsModal/usePersonAvatarsModal";

export default function PersonAvatars() {
  const profilePhoto = useAppSelector(selectCurrentSubjectProfilePhotoData);
  const avatar = useMemo(() => getPersonAvatar(profilePhoto), [profilePhoto]);
  const { modal, setOpenModal } = usePersonAvatarsModal();

  const handleOpen = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);
  return (
    <>
      <PersonAvatar src={avatar!} onOpen={handleOpen} />
      {modal}
    </>
  );
}
