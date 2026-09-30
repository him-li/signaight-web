"use client";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectImg } from "@/store/subjectsSlice";
import BlurredBackground from "@/components/atoms/BlurredBackground";

export default function SidabarClientImage() {
  const personImage = useAppSelector(selectCurrentSubjectImg);
  return <BlurredBackground alt="personImage" src={personImage} />;
}
