import { MdArrowOutward } from "react-icons/md";
import { useLanguage } from "../i18n/useLanguage";
import "./styles/ServiceDetails.css";

const ServiceDetails = () => {
  const { t } = useLanguage();

  return (
    <section className="service-details-section" id="service-details">
      <div className="service-details-inner section-container">
        <header className="service-details-head">
          <p className="section-kicker">{t.serviceDetails.kicker}</p>
          <h2 className="section-title">
            {t.serviceDetails.titleFirst} <span>{t.serviceDetails.titleAccent}</span>
          </h2>
          <p>{t.serviceDetails.intro}</p>
        </header>

        <div className="service-details-list">
          {t.serviceDetails.items.map((item) => (
            <article className="service-detail" key={item.number}>
              <span className="service-detail-number" aria-hidden="true">
                {item.number}
              </span>
              <div className="service-detail-copy">
                <h3>{item.title}</h3>
                <p className="service-detail-description">{item.description}</p>
                <div className="service-detail-includes">
                  <span>{t.serviceDetails.includesLabel}</span>
                  <p>{item.details}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="service-details-custom">
          <div>
            <h3>{t.serviceDetails.customTitle}</h3>
            <p>{t.serviceDetails.customDescription}</p>
          </div>
          <a
            href="#contact-project-form"
            onClick={() => {
              document
                .getElementById("contact-name")
                ?.focus({ preventScroll: true });
            }}
            aria-label={t.serviceDetails.customCta}
          >
            <span>{t.serviceDetails.customCta}</span>
            <MdArrowOutward aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
};

export default ServiceDetails;
