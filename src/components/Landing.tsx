import { PropsWithChildren } from "react";
import { useLanguage } from "../i18n/useLanguage";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { dir, t } = useLanguage();

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-circle1" aria-hidden="true"></div>
        <div className="landing-circle2" aria-hidden="true"></div>
        <div className="landing-container">
          <div className="landing-intro">
            <p className="landing-availability">
              <span className="landing-availability-dot" aria-hidden="true" />
              {t.landing.availability}
            </p>
            <p className="landing-kicker">{t.landing.kicker}</p>
            <h1>
              <span className="landing-name-word">{t.landing.firstName}</span>
              <br />
              <span className="landing-name-word landing-name-accent">
                {t.landing.lastName}
              </span>
            </h1>
            <p className="landing-supporting-copy">{t.landing.description}</p>
            <div className="landing-actions">
              <a className="landing-project-cta" href="#work">
                <span>{t.landing.cta}</span>
                <span aria-hidden="true">{dir === "rtl" ? "↙" : "↘"}</span>
              </a>
              <a className="landing-contact-cta" href="#contact">
                {t.landing.contactCta}
              </a>
            </div>
            <div
              className="landing-highlights"
              role="list"
              aria-label={t.landing.highlightsLabel}
            >
              {t.landing.highlights.map((highlight) => (
                <span role="listitem" key={highlight}>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          <div className="landing-info">
            <h3>{t.landing.creative}</h3>
            <h2 className="landing-info-h2">
              {t.landing.role.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </h2>
          </div>
          <a className="landing-scroll-cue" href="#about">
            <span>{t.landing.scroll}</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
