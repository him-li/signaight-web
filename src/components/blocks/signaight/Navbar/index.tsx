/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import NavAvatar from "@/components/blocks/NavBar/Avatar";
import { ThemeSwitch } from "@/components/atoms/ThemeSwitch";
import NavBrand from "@/components/atoms/NavBrand";
import { Icons } from "@/components/atoms/Icons";
import { ROUTES } from "@/constants/routes";
import usePersonsSearchModal from "@/components/blocks/PersonsList/usePersonsSearchModal";
const navItemClass = `
  flex relative h-full my-auto items-center-safe
  data-[active=true]:after:subpixel-antialiased
  data-[active=true]:after:content-['']
  data-[active=true]:after:absolute
  data-[active=true]:after:bottom-0
  data-[active=true]:after:start-0
  data-[active=true]:after:end-0
  data-[active=true]:after:rounded-[2px]
  data-[active=true]:after:bg-primary
  data-[active=true]:after:border-b-2
  data-[active=true]:after:border-accent
`;

export default function Navbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams!);
  const query = params.toString();
  const person = useParams()?.subjectId?.toString();
  const isPersonPages =
    pathname?.includes(ROUTES.DETAILS) || pathname?.includes(ROUTES.ANALYSIS);
  const { modal, state } = usePersonsSearchModal(ROUTES.ANALYSIS, false);

  return (
    <nav
      id="#/properties/navbar"
      className="sticky top-0 z-40 h-15 px-4 w-full border-b border-separator bg-background/70 backdrop-blur-lg flex justify-between items-center-safe"
    >
      <NavBrand />
      <ul className="flex h-full m-auto max-w-fit gap-2">
        <li
          data-active={pathname?.includes(ROUTES.SCREENING)}
          className={navItemClass}
        >
          <Link href={`${ROUTES.SCREENING}?${query}`}>Screening</Link>
        </li>
        <li
          data-active={pathname?.includes(ROUTES.RISKMATRIX)}
          className={navItemClass}
        >
          <Link href={`${ROUTES.RISKMATRIX}?${query}`}>Risk Matrix</Link>
        </li>
        <li
          data-active={pathname?.includes(ROUTES.ANALYSIS)!}
          className={isPersonPages ? navItemClass : "hidden"}
        >
          <Link href={`${ROUTES.ANALYSIS}/${person}`}>Analysis</Link>
        </li>
        <li
          data-active={pathname?.includes(ROUTES.DETAILS)!}
          className={isPersonPages ? navItemClass : "hidden"}
        >
          <Link href={`${ROUTES.DETAILS}/${person}`}>Details</Link>
        </li>
        <li className="flex items-center-safe">
          <Button
            isIconOnly
            variant="ghost"
            className="rounded-full"
            onPress={state.open}
          >
            <Icons.Search />
          </Button>
        </li>
      </ul>
      <div className="flex justify-between items-center-safe h-15">
        <ThemeSwitch />
        <NavAvatar />
      </div>
      {modal}
    </nav>
  );
}
