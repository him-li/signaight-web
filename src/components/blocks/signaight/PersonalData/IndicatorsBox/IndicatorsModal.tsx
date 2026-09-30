"use client";
import { useAppSelector } from "@/store/store";
import { Accordion, Drawer, Button } from "@heroui/react";
import { selectCurrentSubject } from "@/store/subjectsSlice";
import Display from "@/components/atoms/Display";
import WatchlistCountries from "./WatchlistCountries";
import InterestsAndGroups from "@/components/atoms/CommonFields/person/interests";
import CheckIns from "./CheckIns";
import Factors from "./Factors";
import CoverPictures from "./CoverPictures";
import Locations from "./Locations";
import getPersonIntro from "@/utils/getPersonIntro";
import { personRedFlagsConstants } from "@/constants";
import PersonAvatars from "../../SubjectProfile/PersonAvatars";
import { modal, button } from "styles/styles";
import type { SubCategory } from "@/types/person/red_flag/index.interface";

enum DetailBlocks {
  photos = "PROFILE PHOTOS",
  covers = "COVER PHOTOS",
  intro = "INTRO",
  locations = "LOCATIONS",
  checkins = "CHECK-INS",
  interests = "INTERESTS",
  posts = "POSTS",
  pages = "PAGES",
}

const getVisibleKeys = (flag?: string) => {
  switch (flag) {
    case personRedFlagsConstants.watchlist_countries:
      return [DetailBlocks.locations, DetailBlocks.checkins];
    case personRedFlagsConstants.weapons:
      return [
        DetailBlocks.photos,
        DetailBlocks.covers,
        DetailBlocks.posts,
        DetailBlocks.pages,
      ];
    default:
      return [
        DetailBlocks.photos,
        DetailBlocks.intro,
        DetailBlocks.locations,
        DetailBlocks.posts,
        DetailBlocks.pages,
      ];
  }
};

export default function IndicatorsModal({ redFlag }: { redFlag: SubCategory }) {
  const person = useAppSelector(selectCurrentSubject);
  const visibleKeys = getVisibleKeys(redFlag.category);

  return (
    <Drawer>
      <Button variant="ghost" className={button.ghost_accent} size="sm">
        Details
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right" className="text-foreground">
          <Drawer.Dialog className={modal.base}>
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Body className="overflow-y-auto">
              <Accordion
                hideSeparator
                allowsMultipleExpanded
                defaultExpandedKeys={visibleKeys}
                className="text-foreground"
              >
                {visibleKeys.includes(DetailBlocks.photos) ? (
                  <Accordion.Item
                    id={DetailBlocks.photos}
                    key={DetailBlocks.photos}
                    aria-label={DetailBlocks.photos}
                    className={
                      visibleKeys.includes(DetailBlocks.photos) ? "" : "hidden"
                    }
                  >
                    <Accordion.Heading className="text-sm font-semibold">
                      <Accordion.Trigger>
                        {DetailBlocks.photos}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-foreground">
                        <PersonAvatars />
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : null}
                {visibleKeys.includes(DetailBlocks.covers) ? (
                  <Accordion.Item
                    id={DetailBlocks.covers}
                    key={DetailBlocks.covers}
                    aria-label={DetailBlocks.covers}
                    className={
                      visibleKeys.includes(DetailBlocks.covers) ? "" : "hidden"
                    }
                  >
                    <Accordion.Heading className="text-sm font-semibold">
                      <Accordion.Trigger>
                        {DetailBlocks.covers}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-foreground">
                        <CoverPictures factors={redFlag.factors} />
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : null}
                {visibleKeys.includes(DetailBlocks.intro) &&
                !!person?.biographic_details?.description_bio_intro ? (
                  <Accordion.Item
                    id={DetailBlocks.intro}
                    key={DetailBlocks.intro}
                    aria-label={DetailBlocks.intro}
                    className={
                      visibleKeys.includes(DetailBlocks.intro) &&
                      !!person?.biographic_details?.description_bio_intro
                        ? ""
                        : "hidden"
                    }
                  >
                    <Accordion.Heading className="text-sm font-semibold">
                      <Accordion.Trigger>
                        {DetailBlocks.intro}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-xs text-foreground">
                        {getPersonIntro(
                          person?.biographic_details?.description_bio_intro,
                          true,
                        )}
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : null}
                {redFlag.sub_category === "Locations in Watchlist Countries" ? (
                  <Accordion.Item
                    id={DetailBlocks.locations}
                    key={DetailBlocks.locations}
                    aria-label={DetailBlocks.locations}
                    className={
                      visibleKeys.includes(DetailBlocks.locations)
                        ? ""
                        : "hidden"
                    }
                  >
                    <Accordion.Heading className="text-sm font-semibold">
                      <Accordion.Trigger>
                        {DetailBlocks.locations}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-foreground flex flex-wrap justify-around gap-2">
                        <Display
                          when={
                            redFlag.sub_category ===
                            "Locations in Watchlist Countries"
                          }
                          fallback={<></>}
                        >
                          <WatchlistCountries
                            countriesList={redFlag.description!}
                          />
                        </Display>
                        <Locations locations={redFlag?.factors ?? []} />
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : null}
                <Accordion.Item
                  id={DetailBlocks.checkins}
                  key={DetailBlocks.checkins}
                  aria-label={DetailBlocks.checkins}
                  className={
                    visibleKeys.includes(DetailBlocks.checkins) &&
                    redFlag.sub_category ===
                      "Check Ins in Watchlist Countries" &&
                    redFlag.factors
                      ? ""
                      : "hidden"
                  }
                >
                  <Accordion.Heading className="text-sm font-semibold">
                    <Accordion.Trigger>
                      {DetailBlocks.checkins}
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="text-foreground">
                      <CheckIns
                        checkins={
                          redFlag.sub_category ===
                          "Check Ins in Watchlist Countries"
                            ? redFlag.factors
                            : []
                        }
                      />
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item
                  id={DetailBlocks.interests}
                  key={DetailBlocks.interests}
                  aria-label={DetailBlocks.interests}
                  className={
                    visibleKeys.includes(DetailBlocks.interests) &&
                    person?.interests !== undefined &&
                    (!(
                      !person?.interests?.pages ||
                      person?.interests?.pages?.length < 1
                    ) ||
                      !(
                        !person?.interests?.groups?.telegram_groups ||
                        person?.interests?.groups?.telegram_groups?.length < 1
                      ))
                      ? ""
                      : "hidden"
                  }
                >
                  <Accordion.Heading className="text-sm font-semibold">
                    <Accordion.Trigger>
                      {DetailBlocks.interests}
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="text-foreground">
                      <InterestsAndGroups interests={person?.interests} />
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
                {visibleKeys.includes(DetailBlocks.pages) &&
                !!redFlag.factors ? (
                  <Accordion.Item
                    id={DetailBlocks.pages}
                    key={DetailBlocks.pages}
                    aria-label={DetailBlocks.pages}
                    className={
                      visibleKeys.includes(DetailBlocks.pages) &&
                      !!redFlag.factors
                        ? ""
                        : "hidden"
                    }
                  >
                    <Accordion.Heading className="text-sm font-semibold">
                      <Accordion.Trigger>
                        {DetailBlocks.pages}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-foreground">
                        <Factors
                          field={["page", "friend"]}
                          factors={redFlag.factors}
                        />
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : null}
                {visibleKeys.includes(DetailBlocks.posts) ? (
                  <Accordion.Item
                    id={DetailBlocks.posts}
                    key={DetailBlocks.posts}
                    aria-label={DetailBlocks.posts}
                    className={
                      visibleKeys.includes(DetailBlocks.posts) &&
                      !!redFlag.factors
                        ? ""
                        : "hidden"
                    }
                  >
                    <Accordion.Heading className="text-sm font-semibold">
                      <Accordion.Trigger>
                        {DetailBlocks.posts}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-foreground">
                        <Factors field="post" factors={redFlag.factors} />
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : null}
              </Accordion>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
