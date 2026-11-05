import { useEffect, useRef, useState } from "react";
import { MdCheck, MdExpandMore, MdTranslate } from "react-icons/md";
import { useLanguage } from "../i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const chooseLanguage = (next: "en" | "ar") => {
    if (next !== lang) {
      window.dispatchEvent(new Event("portfolio:language-change"));
    }
    setLang(next);
    setIsOpen(false);
  };

  return (
    <div className="language-picker" ref={pickerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="lang-toggle"
        data-cursor="disable"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t.nav.languageLabel}
        aria-expanded={isOpen}
        aria-controls="language-options"
      >
        <MdTranslate aria-hidden="true" />
        <span className="lang-toggle-current" aria-hidden="true">
          {lang.toUpperCase()}
        </span>
        <MdExpandMore className="lang-toggle-chevron" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          className="language-options"
          id="language-options"
          role="group"
          aria-label={t.nav.languageLabel}
        >
          <button
            type="button"
            className="language-option"
            aria-pressed={lang === "en"}
            onClick={() => chooseLanguage("en")}
          >
            <span>English</span>
            {lang === "en" && <MdCheck aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="language-option"
            lang="ar"
            aria-pressed={lang === "ar"}
            onClick={() => chooseLanguage("ar")}
          >
            <span>العربية</span>
            {lang === "ar" && <MdCheck aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
