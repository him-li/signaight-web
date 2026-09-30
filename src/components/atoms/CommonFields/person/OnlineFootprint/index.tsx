import { Accordion } from "@heroui/react";
import { SocialPlatforms, Icons } from "@/components/atoms/Icons";
import Platforms from "./Platforms";
import Leaks from "./Leaks";
import Web from "./Web";
import RelatedLinks from "./RelatedLinks";
import type { Person } from "@/types/person/index.interface";
import type { WebSearches } from "@/types/search.interface";
type OnlineFootprintProps = {
  person?: Person;
  webSearches?: WebSearches[];
};

export default function OnlineFootprint({
  person,
  webSearches,
}: OnlineFootprintProps) {
  return (
    <Accordion
      hideSeparator
      allowsMultipleExpanded
      defaultExpandedKeys={["1", "2"]}
    >
      <Accordion.Item id="1" key="1" aria-label="Platforms">
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <SocialPlatforms.Platforms strokeWidth={8} />
            Platforms
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <Platforms person={person} />
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item id="2" key="2" aria-label="Related Links">
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <Icons.Link />
            Related Links
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <RelatedLinks person={person} />
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        key="3"
        aria-label="Web Searches"
        className={
          webSearches === undefined || webSearches?.length < 1
            ? "hidden"
            : "visible"
        }
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <Icons.Web />
            Web Searches
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <Web searches={webSearches} />
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item
        key="4"
        aria-label="Leaks"
        className={
          !person?.network_signature?.misc?.leaks ||
          person?.network_signature?.misc?.leaks?.length === 0
            ? "hidden"
            : "visible"
        }
      >
        <Accordion.Heading>
          <Accordion.Trigger className="gap-2">
            <SocialPlatforms.Leaks strokeWidth={8} />
            Leaks
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <Leaks person={person} />
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
