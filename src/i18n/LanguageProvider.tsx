import {
  useLayoutEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { LanguageContext } from "./LanguageContext";
import { dictionaries, type Lang } from "./translations";

const STORAGE_KEY = "lang";

const readInitialLang = (): Lang => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
};

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLangState] = useState<Lang>(readInitialLang);
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;

    const metadata =
      lang === "ar"
        ? {
            title: "يوسف العشري — مطوّر واجهات أمامية",
            description:
              "يوسف العشري مطوّر واجهات أمامية يركز على تحويل الأفكار إلى تجارب React حديثة وقابلة للتوسع ومتجاوبة، باستخدام JavaScript نظيف وتصميم مدروس.",
            locale: "ar_EG",
          }
        : {
            title: "Youssef Al-Ashry — Frontend Developer",
            description:
              "Youssef Al-Ashry builds responsive websites and web applications with React, JavaScript, and thoughtful user experiences. Explore selected projects and services.",
            locale: "en_US",
          };

    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", metadata.locale);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", metadata.description);
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    if (next === lang) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The language still switches for this visit if storage is unavailable.
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, t: dictionaries[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
