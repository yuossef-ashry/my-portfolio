import { useLanguage } from "../i18n/LanguageContext";
import "./styles/AboutLayout.css";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="about-section" id="about">
      <div className="about-me section-container">
        <p className="section-kicker">{t.about.kicker}</p>
        <h2 className="about-title">{t.about.title}</h2>
        <div className="about-copy">
          {t.about.copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
