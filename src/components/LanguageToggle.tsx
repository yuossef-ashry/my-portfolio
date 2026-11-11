import { MdTranslate } from "react-icons/md";
import { useLanguage } from "../i18n/useLanguage";

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage();
  const nextLanguage = lang === "en" ? "ar" : "en";

  const toggleLanguage = () => {
    window.dispatchEvent(new Event("portfolio:language-change"));
    setLang(nextLanguage);
  };

  return (
    <div className="language-picker">
      <button
        type="button"
        className="lang-toggle"
        data-cursor="disable"
        onClick={toggleLanguage}
        aria-label={
          lang === "en" ? t.nav.switchToArabic : t.nav.switchToEnglish
        }
        title={lang === "en" ? t.nav.switchToArabic : t.nav.switchToEnglish}
      >
        <MdTranslate aria-hidden="true" />
        <span className="lang-toggle-target" aria-hidden="true" lang={nextLanguage}>
          {nextLanguage.toUpperCase()}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;
