"use client";
import PersonProfile from "./PersonProfile";
import { useInitialPersonState } from "@/contexts/personalDataContext/InitialPersonDataContext";
import Background from "./Background";
import BackButton from "./BackButton";

export default function SubjectProfile() {
  const { initialPersonalData: initialPersonalDetails } =
    useInitialPersonState();

  return (
    <section className="flex flex-col w-full sm:sticky sm:top-2 sm:w-1/3 md:w-1/4 h-full sm:min-h-full justify-start shadow-none backdrop-blur-xl">
      <Background />
      <div className="flex flex-col px-16 sm:px-0 sticky top-16 h-fit justify-start items-center overflow-y-auto gap-8 min-h-[94vh]">
        <BackButton />
        <PersonProfile initialPersonalDetails={initialPersonalDetails!} />
      </div>
    </section>
  );
}
