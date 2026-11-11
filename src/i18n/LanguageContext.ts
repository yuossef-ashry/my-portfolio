import { createContext } from "react";
import type { Dictionary, Lang } from "./translations";

export type LanguageValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (next: Lang) => void;
};

export const LanguageContext = createContext<LanguageValue | null>(null);
