import { useLanguage } from "../i18n/LanguageContext";
import "./styles/CareerLayout.css";

const Career = () => {
  const { t } = useLanguage();

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
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {t.career.experiences.map((experience) => (
            <article className="career-info-box" key={experience.role}>
              <div className="career-info-in">
                <div className="career-role">
                  <h3>{experience.role}</h3>
                  <p className="career-organization">
                    {experience.organization}
                  </p>
                </div>
                <span className="career-period">{experience.period}</span>
              </div>
              <p className="career-description">{experience.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
