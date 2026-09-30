import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { SESSION_COOKIE_NAME } from "@/auth";
import PersonsService from "@/services/personsService";
import type { ReactNode } from "react";
import type { PersonalDetails } from "@/types/person/personal_details/index.interface";
const InitialPersonDataProvider = dynamic(
  () => import("@/contexts/personalDataContext/InitialPersonDataContext"),
);

type Props = {
  params: Promise<{ subjectId?: string; personId?: string }>;
  children: ReactNode;
};

const InitialPersonWrapper = async ({ params, children }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  if (!token) {
    redirect(ROUTES.LOGIN);
  }
  const start = performance.now();
  const parameters = await params;
  const personId = parameters.subjectId ?? parameters.personId;
  let initialPersonData: PersonalDetails | null = null;

  if (!personId) {
    return children;
  }

  try {
    initialPersonData = await PersonsService.getPersonHistory(
      personId,
      token.value ?? "",
    );
  } catch (error) {
    console.error("Error fetching person data:", error);
    initialPersonData = null;
  }
  const end = performance.now();
  const durationMs = (end - start).toFixed(2);
  console.log("InitialPersonWrapper durationMs", durationMs);
  return (
    <InitialPersonDataProvider initialPersonData={initialPersonData}>
      {children}
    </InitialPersonDataProvider>
  );
};

export default InitialPersonWrapper;
