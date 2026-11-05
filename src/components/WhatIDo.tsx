import {
  FiBox,
  FiCalendar,
  FiGlobe,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { MdArrowOutward } from "react-icons/md";
import { useLanguage } from "../i18n/LanguageContext";
import ServiceArt from "./ServiceArt";
import "./styles/WhatIDoLayout.css";

const serviceIcons: Record<string, IconType> = {
  "01": FiGlobe,
  "02": FiBox,
  "03": FiShoppingCart,
  "04": FiCalendar,
  "05": FiSettings,
};

const WhatIDo = () => {
  const { t } = useLanguage();
  const services = t.whatIDo.services;

  return (
    <section className="whatIDO" id="services">
      <div className="what-section-inner section-container">
        <div className="what-head">
          <div>
            <p className="section-kicker">{t.whatIDo.kicker}</p>
            <h2 className="section-title">
              {t.whatIDo.titleFirst} <span>{t.whatIDo.titleAccent}</span>
            </h2>
          </div>
          <p className="what-intro">{t.whatIDo.intro}</p>
        </div>

        <div className="what-list">
          {services.map((service) => {
            const Icon = serviceIcons[service.number] ?? FiGlobe;

            return (
              <article className="what-service" key={service.number}>
                <div className="what-service-marker" aria-hidden="true">
                  <span>{service.number}</span>
                  <Icon />
                </div>

                <div className="what-service-heading">
                  <p className="what-service-badge">{service.badge}</p>
                  <h3>{service.title}</h3>
                </div>

                <div className="what-service-content">
                  <p className="what-description">{service.description}</p>
                  <div className="what-features">
                    <p className="what-features-title">
                      {t.whatIDo.includesLabel}
                    </p>
                    <ul>
                      {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    className="what-cta"
                    href="#contact-project-form"
                    onClick={() => {
                      document
                        .getElementById("contact-name")
                        ?.focus({ preventScroll: true });
                    }}
                    aria-label={`${t.whatIDo.cta}: ${service.title}`}
                  >
                    <span>{t.whatIDo.cta}</span>
                    <MdArrowOutward aria-hidden="true" />
                  </a>
                </div>

                <div className="what-service-art">
                  <ServiceArt number={service.number} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
