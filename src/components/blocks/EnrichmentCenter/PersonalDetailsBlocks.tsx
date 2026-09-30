import { memo, type ReactNode } from "react";
import { Icons, SocialPlatforms } from "@/components/atoms/Icons";
import Name from "@/components/atoms/CommonFields/person/name";
import Email from "@/components/atoms/CommonFields/person/email";
import Phone from "@/components/atoms/CommonFields/person/phone";
import SocialMedia from "@/components/atoms/CommonFields/person/url";
import RelatedLinks from "@/components/atoms/CommonFields/person/OnlineFootprint/RelatedLinks";
import LocationsBlock from "./Locations";
import Platforms from "@/components/blocks/EnrichmentCenter/PlatformsApplications";
import Leaks from "@/components/atoms/CommonFields/person/OnlineFootprint/Leaks";
import BlockLayout from "@/components/atoms/BlockLayout";
import RecoveryData from "./RecoveryData";
import IdentityExpander from "./IdentityExpander";
import ManualNameAdditionModal from "./ManualAdditionModals/name";
import ManualEmailAdditionModal from "./ManualAdditionModals/email";
import ManualURLAdditionModal from "./ManualAdditionModals/url";
import ManualPhoneAdditionModal from "./ManualAdditionModals/phone";
import { PersonalDetailsTitle } from "./types";
import Capitalize from "@/utils/capitalize";
import type { Person } from "@/types/person/index.interface";

const ICON_MAP: Record<string, ReactNode> = {
  names: <Icons.Name />,
  emails: <Icons.Email />,
  phones: <Icons.Phone />,
  "social media": <Icons.Link />,
  "platforms and applications": <SocialPlatforms.Platforms />,
  locations: <Icons.Locations />,
  "recovery data": <Icons.Refresh />,
  "darknet and breached data": <SocialPlatforms.Leaks />,
  "identity expander": <Icons.Person />,
};

type FieldConfig = {
  icon: ReactNode;
  children: (person: Person | null) => ReactNode;
  modal?: (person: Person | null) => ReactNode;
};

function PD({
  person,
  title,
  isCustomizable = false,
}: {
  person: Person | null;
  title: PersonalDetailsTitle;
  isCustomizable?: boolean;
}) {
  const FIELD_MAP: Record<string, FieldConfig> = {
    names: {
      icon: <Icons.Name />,
      children: (person) => (
        <Name
          name={person?.personal_details?.name}
          showAllNames
          groupDuplication
          matchedProfiles={person?.network_signature?.matched_profiles!}
        />
      ),
      modal: (person) => <ManualNameAdditionModal person={person} />,
    },
    emails: {
      icon: <Icons.Email />,
      children: (person) => (
        <Email
          email={person?.personal_details?.email}
          showAllEmails
          hideNotFound={false}
        />
      ),
      modal: (person) => <ManualEmailAdditionModal person={person} />,
    },
    phones: {
      icon: <Icons.Phone />,
      children: (person) => (
        <Phone
          phone={person?.personal_details?.phone}
          showAllPhones
          hideNotFound={false}
        />
      ),
      modal: (person) => <ManualPhoneAdditionModal person={person} />,
    },
    "social media": {
      icon: <Icons.Link />,
      children: (person) => (
        <div className="flex flex-col relative w-full h-fit overflow-x-scroll">
          <SocialMedia urls={person?.network_signature?.url} />
          <RelatedLinks person={person!} />
        </div>
      ),
      modal: (person) => <ManualURLAdditionModal person={person} />,
    },
    "platforms and applications": {
      icon: <SocialPlatforms.Platforms />,
      children: (person) => <Platforms person={person!} />,
    },
    locations: {
      icon: <Icons.Locations />,
      children: (person) => <LocationsBlock person={person!} />,
    },
    "recovery data": {
      icon: <Icons.Refresh />,
      children: (person) => <RecoveryData person={person?.personal_details} />,
    },
    "darknet and breached data": {
      icon: <SocialPlatforms.Leaks />,
      children: (person) => <Leaks person={person} />,
    },
    "identity expander": {
      icon: <Icons.Person />,
      children: (person) => <IdentityExpander person={person!} />,
    },
  };

  const key = title.toLowerCase();
  const config = FIELD_MAP[key];

  const ChildrenComponent = config?.children(person) ?? null;
  const ManualAdditionModal = config?.modal ? config.modal(person) : null;
  const Icon = config?.icon ?? null;

  return (
    <BlockLayout
      isVisible={ChildrenComponent}
      isExpandable={key === "platforms and applications" || key === "locations"}
      title={Capitalize(title)}
      icon={Icon}
      flex="row"
      subtitle={ManualAdditionModal}
    >
      {ChildrenComponent}
    </BlockLayout>
  );
}

const PersonalDetails = memo(PD);
export default PersonalDetails;
