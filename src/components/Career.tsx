import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";
import "./styles/CareerLayout.css";

const Career = () => {
  const { t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const setProgress = (progress: number) => {
      timeline.style.setProperty("--career-progress", String(progress));
    };
    const progressTrigger = ScrollTrigger.create({
      trigger: timeline,
      start: "top 72%",
      end: "bottom 28%",
      onUpdate: (self) => setProgress(self.progress),
      onRefresh: (self) => setProgress(self.progress),
    });

    setProgress(progressTrigger.progress);
    ScrollTrigger.refresh();

    return () => {
      progressTrigger.kill();
    };
  }, [t.career.experiences]);

  return (
    <section className="career-section section-container" id="career">
      <div className="career-container">
        <div className="career-head">
          <p className="section-kicker">{t.career.kicker}</p>
          <h2>
            {t.career.titleFirst} <span>{t.career.titleAccent}</span>
          </h2>
        </div>
        <div className="career-info">
          <div
            className="career-timeline"
            ref={timelineRef}
            aria-hidden="true"
          />
          {t.career.experiences.map((experience) => (
            <article className="career-info-box" key={experience.role}>
              <div className="career-info-meta">
                <span className="career-category">{experience.category}</span>
                <span className="career-period">{experience.period}</span>
              </div>
              <div className="career-info-in">
                <div className="career-role">
                  <h3>{experience.role}</h3>
                  <p className="career-organization">
                    {experience.organization}
                    {experience.platform && (
                      <span className="career-platform">
                        {` · ${t.career.platformLabel} ${experience.platform}`}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <p className="career-description">{experience.description}</p>
              {experience.outcome && (
                <p className="career-outcome">
                  <span>{t.career.outcomeLabel}</span>
                  {experience.outcome}
                </p>
              )}
              {experience.verificationUrl && (
                <a
                  className="career-verification"
                  href={experience.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.career.verifyLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
