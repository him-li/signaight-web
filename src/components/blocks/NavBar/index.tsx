import dynamic from "next/dynamic";
const Links = dynamic(() => import("./Links"), {
  ssr: false,
  loading: () => <div />,
});
import NavAvatar from "./Avatar";
import NavBrand from "@/components/atoms/NavBrand";
import { ThemeSwitch } from "@/components/atoms/ThemeSwitch";

export default function NavBar() {
  return (
    <nav
      id="#/properties/campaigns-navbar"
      className="sticky top-0 z-40 h-15 px-4 w-full border-b border-separator bg-background/70 backdrop-blur-lg flex justify-between items-center-safe"
    >
      <div className="flex gap-0">
        <NavBrand />
        <Links />
      </div>
      <div className="flex items-center-safe">
        <ThemeSwitch />
        <NavAvatar />
      </div>
    </nav>
  );
}
