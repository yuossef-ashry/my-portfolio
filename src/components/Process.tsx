import { useLanguage } from "../i18n/useLanguage";
import { MdArrowOutward } from "react-icons/md";
import "./styles/ProcessLayout.css";

const Process = () => {
  const { t } = useLanguage();

  return (
    <section className="process-section section-container" id="process">
      <div className="process-head">
        <div>
          <p className="section-kicker">{t.process.kicker}</p>
          <h2 className="section-title">
            {t.process.titleFirst} <span>{t.process.titleAccent}</span>
          </h2>
        </div>
        <p>{t.process.intro}</p>
      </div>

      <div className="process-grid">
        {t.process.steps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <span className="process-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <div className="process-footer">
        <p>{t.process.ctaNote}</p>
        <a href="#contact">
          {t.process.cta} <MdArrowOutward aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Process;
