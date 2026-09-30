import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import PersonNotFound from "@/components/atoms/PersonNotFound";
import Display from "@/components/atoms/Display";
import { ROUTES } from "@/constants/routes";
import PersonsService from "@/services/personsService";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/auth";
import EvaluationProvider from "@/contexts/evaluationContext/EvaluationContext";

export default async function EvaluationPageWrapper({
  children,
  params: serverParams,
}: {
  children: ReactNode;
  params: Promise<{ campaignId: string; personId: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  if (!token) {
    redirect(ROUTES.LOGIN);
  }
  const params = await serverParams;
  const campaignId = params.campaignId;
  const personId = params.personId;
  let isCurrentPersonValid = true;
  let currentPerson = null;
  try {
    currentPerson = await PersonsService.getPerson(personId, token.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    isCurrentPersonValid = false;
  }

  return (
    <Display
      when={isCurrentPersonValid}
      fallback={
        <PersonNotFound
          background={children}
          isOpen={!isCurrentPersonValid}
          page="Leaderboard"
          title="Applicant"
          link={`${ROUTES.SCREENING}` + `/${campaignId}`}
        />
      }
    >
      <EvaluationProvider currentPerson={currentPerson} personId={personId}>
        {children}
      </EvaluationProvider>
    </Display>
  );
}
