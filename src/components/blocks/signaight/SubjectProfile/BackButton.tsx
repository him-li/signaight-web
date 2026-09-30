import { useCallback } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Icons } from "@/components/atoms/Icons";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";

type Props = {};

export default function BackButton({}: Props) {
  const router = useRouter();
  const canGoBack = typeof window !== "undefined" && window.history.length > 1;

  const person = useAppSelector(selectCurrentSubjectData);
  const handleBack = useCallback(() => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(`${ROUTES.SCREENING}?it=${person?.project?.id}`);
    }
  }, [canGoBack, person?.project?.id, router]);
  return (
    <Button
      onPress={handleBack}
      variant="ghost"
      className="w-fit self-start rounded-full"
    >
      <Icons.ChevronLeft />
      Back
    </Button>
  );
}
