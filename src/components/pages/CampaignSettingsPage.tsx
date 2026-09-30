import { Button, Popover } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import CampaignSettingsSidebar from "@/components/blocks/CampaignSettingsSidebar";
import CampaignSettings from "@/components/blocks/CampaignSettingsDash";
import BlurredBackground from "@/components/atoms/BlurredBackground";
import { BG_IMAGE_URL } from "@/constants/image";
import { modal } from "styles/styles";

/** Retained from the former recruiting workflow for future unified project configuration. */
export default function SettingsPage() {
  return (
    <div className="flex h-auto w-full" id="#/properties/campaigns-settings">
      <Popover>
        <Button className="sm:flex md:hidden fixed top-1/2 h-32" isIconOnly>
          <Icons.ChevronRight />
        </Button>
        <Popover.Content
          className={modal.base + " flex items-center justify-center"}
          placement="left"
        >
          <Popover.Dialog>
            <BlurredBackground
              src={BG_IMAGE_URL}
              alt="background"
              radius="lg"
            />
            <CampaignSettingsSidebar />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <div
        className={`hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex min-h-svh w-80 relative`}
        onMouseDown={(event) => event.preventDefault()}
      >
        <BlurredBackground src={BG_IMAGE_URL} alt="background" />
        <CampaignSettingsSidebar />
      </div>
      <div className="flex flex-col w-full items-center z-1">
        <CampaignSettings />
      </div>
    </div>
  );
}
