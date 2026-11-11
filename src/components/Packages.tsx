import { MdCheck, MdArrowOutward } from "react-icons/md";
import { useLanguage } from "../i18n/useLanguage";
import "./styles/Packages.css";

const featuredIndex = 1;

const Packages = () => {
  const { t } = useLanguage();
  const packages = t.packages.items;
  const selectPackage = (packageIndex: number | null) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:package-select", {
        detail: { packageIndex },
      })
    );
  };

  return (
    <section className="packages-section section-container" id="packages">
      <div className="packages-head">
        <div>
          <p className="section-kicker">{t.packages.kicker}</p>
          <h2>
            {t.packages.titleFirst} <span>{t.packages.titleAccent}</span>
          </h2>
        </div>
        <p>{t.packages.intro}</p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <article
            className={`package-card${index === featuredIndex ? " package-card--featured" : ""}`}
            key={pkg.name}
          >
            {index === featuredIndex && (
              <span className="package-flag">{t.packages.popular}</span>
            )}
            <div className="package-card-heading">
              <h3>{pkg.name}</h3>
              <p className="package-for">{pkg.audience}</p>
            </div>
            <div className="package-price-block">
              <span className="package-price-label">{t.packages.startingAt}</span>
              <p className="package-price">
                <span>{pkg.price}</span>
                <small>{t.packages.currency}</small>
              </p>
              <span className="package-price-note">{pkg.priceNote}</span>
            </div>
            <ul className="package-list">
              {pkg.features.map((item) => (
                <li key={item}>
                  <MdCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              className="package-btn"
              href="#contact"
              onClick={() => selectPackage(index)}
              aria-label={`${t.packages.discuss} — ${pkg.name}`}
            >
              {t.packages.discuss} <MdArrowOutward aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <div className="packages-custom-cta">
        <div className="packages-custom-copy">
          <p className="section-kicker">{t.packages.customLabel}</p>
          <h3>{t.packages.customTitle}</h3>
          <p>{t.packages.note}</p>
        </div>
        <a
          className="packages-custom-btn"
          href="#contact"
          onClick={() => selectPackage(null)}
        >
          {t.packages.customCta} <MdArrowOutward aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Packages;
