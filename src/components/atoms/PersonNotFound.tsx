"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import NotFound from "@/components/atoms/Icons/NotFound";
import { Icons } from "@/components/atoms/Icons";
import type { ReactNode } from "react";
import { modal, button } from "styles/styles";

type PersonNotFoundProps = {
  isOpen: boolean;
  page: string;
  title: string;
  link: string;
  background?: ReactNode;
};
export default function PersonNotFound({
  isOpen,
  page,
  title,
  link,
  background,
}: PersonNotFoundProps) {
  const router = useRouter();
  return (
    <>
      {background}
      <AlertDialog isOpen={isOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container size="lg">
            <AlertDialog.Dialog className={modal.base}>
              <AlertDialog.Header>
                <AlertDialog.Heading>
                  {title} Cannot Be Found
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="flex flex-col items-center-safe justify-center">
                <NotFound size={200} />
                <span>You are requesting a page that does not exist!</span>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  className={button.ghost_accent}
                  variant="ghost"
                  onPress={() => router.back()}
                >
                  <Icons.ChevronLeft />
                  Back to the Previous Page
                </Button>
                <Link href={link}>
                  <Button className={button.ghost_accent} variant="ghost">
                    <Icons.File />
                    Back to {page}
                  </Button>
                </Link>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}
