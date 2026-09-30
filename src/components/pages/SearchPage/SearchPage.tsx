"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/store/store";
import {
  selectActiveSearch,
  selectActiveSearches,
} from "@/store/activeSearchSlice/activeSearch.selectors";
import SearchBar from "@/components/blocks/SearchApplicant/SearchBar";
import SearchResults from "@/components/blocks/SearchApplicant/SearchResults";
import type { Candidate } from "@/types/candidate.interface";
import SearchPageWrapper from "./SearchPageWrapper/SearchPageWrapper";

const SearchBarPortal = ({ el }: { el: HTMLElement | null }) => {
  const searches = useAppSelector(selectActiveSearches);

  if (!el) {
    return null;
  }
  return createPortal(<SearchBar searches={searches} />, el);
};

export default function SearchPage() {
  const [refEl, setRefEl] = useState<HTMLElement | null>(null);
  const personsList = useAppSelector(selectActiveSearch)
    ?.search_results as Candidate[];

  return (
    <AnimatePresence>
      <div
        className={`relative flex flex-col w-full py-10 gap-10 ${
          personsList?.length != 0 && personsList !== undefined
            ? "justify-start"
            : "justify-center"
        }`}
        id="#/properties/campaigns-search"
      >
        <SearchPageWrapper>
          <div className="px-16">
            <span ref={setRefEl} />
            <SearchBarPortal el={refEl} />
          </div>
          {(personsList?.length === 0 || personsList === undefined) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full fixed top-0 -z-10 bg-[url('https://signaight.ai/wp-content/uploads/2023/04/ai_for_integrity.webp')] bg-no-repeat bg-cover blur-lg"
            />
          )}
          {personsList?.length !== 0 && personsList !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="px-16 w-full"
            >
              <SearchResults personsList={personsList} />
            </motion.div>
          )}
        </SearchPageWrapper>
      </div>
    </AnimatePresence>
  );
}
