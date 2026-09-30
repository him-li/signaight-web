"use server";
import "server-only";
import { Locale } from "i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en").then((module) => module.en),
  he: () => import("@/dictionaries/he").then((module) => module.he),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
