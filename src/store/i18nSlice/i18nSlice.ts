import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";
import { i18n, Locale } from "i18n.config";
import dictionaries from "@/dictionaries";

export type DictionaryEN = typeof dictionaries.en;
export type DictionaryHE = typeof dictionaries.he;
export type Dictionary = DictionaryEN | DictionaryHE;

export type I18nState = {
  locale: Locale;
  dictionary: Dictionary;
};

const initialState: I18nState = {
  locale: i18n.defaultLocale,
  dictionary: dictionaries.en,
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    setDictionary: (state, action: PayloadAction<Dictionary>) => {
      state.dictionary = action.payload;
    },
  },
});

export const { setLang, setDictionary } = i18nSlice.actions;
export const selectDictionary = (state: AppState) => state.i18n.dictionary;
export default i18nSlice.reducer;
