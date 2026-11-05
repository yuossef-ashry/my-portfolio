import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { useLanguage } from "../i18n/LanguageContext";
import "./styles/ContactLayout.css";

const WHATSAPP_NUMBER = "201214858840";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/yuossef-ashry" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/youssef-mohammed-al-ashry",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/youssef_alashry_51?psln=c2l5d2h1MDVoaXMx",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/19tf9NdNb6/",
  },
];

const Contact = () => {
  const { t } = useLanguage();
  const { form: formText } = t.contact;
  const [form, setForm] = useState({
    name: "",
    contact: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(
    null
  );
  const selectedPackage =
    selectedPackageIndex === null
      ? undefined
      : t.packages.items[selectedPackageIndex];

  useEffect(() => {
    const handlePackageSelect = (event: Event) => {
      const packageIndex = (
        event as CustomEvent<{ packageIndex: number | null }>
      ).detail?.packageIndex;
      if (packageIndex === null) {
        setSelectedPackageIndex(null);
        return;
      }
      if (
        typeof packageIndex === "number" &&
        Number.isInteger(packageIndex) &&
        packageIndex >= 0 &&
        packageIndex < t.packages.items.length
      ) {
        setSelectedPackageIndex(packageIndex);
      }
    };

    window.addEventListener("portfolio:package-select", handlePackageSelect);
    return () =>
      window.removeEventListener("portfolio:package-select", handlePackageSelect);
  }, [t.packages.items.length]);

  const update = (field: keyof typeof form, value: string) =>
    setForm((previous) => ({ ...previous, [field]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = [
      t.contact.greeting(form.name),
      t.contact.contactLine(form.contact),
      form.projectType
        ? t.contact.typeLine(
            formText.projectTypes[Number(form.projectType)] ?? form.projectType
          )
        : "",
      selectedPackage ? t.contact.packageLine(selectedPackage.name) : "",
      form.budget
        ? t.contact.budgetLine(
            formText.budgets[Number(form.budget)] ?? form.budget
          )
        : "",
      t.contact.detailsLine(form.message),
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-layout">
        <div className="contact-aside">
          <div className="contact-heading">
            <p className="section-kicker">{t.contact.kicker}</p>
            <h2>
              {t.contact.titleFirst} <span>{t.contact.titleAccent}</span>
            </h2>
            <p>{t.contact.copy}</p>
          </div>

          <div className="contact-availability">
            <span aria-hidden="true" />
            {t.contact.availability}
          </div>

          <div
            className="contact-direct-links"
            role="group"
            aria-label={t.contact.contactMethodsLabel}
          >
            <a href="mailto:yaasef0100@gmail.com" data-cursor="disable">
              <span className="contact-direct-label">{t.contact.emailLabel}</span>
              <strong>yaasef0100@gmail.com</strong>
              <MdArrowOutward aria-hidden="true" />
            </a>
            <a href="tel:+201214858840" data-cursor="disable">
              <span className="contact-direct-label">{t.contact.callLabel}</span>
              <strong>+20 121 485 8840</strong>
              <MdArrowOutward aria-hidden="true" />
            </a>
          </div>

          <div
            className="contact-socials"
            role="group"
            aria-label={t.contact.socialProfilesLabel}
          >
            {socialLinks.map((social) => (
              <a
                href={social.href}
                key={social.label}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                {social.label}
                <MdArrowOutward aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form-card" id="contact-project-form">
          <div className="contact-form-header">
            <p>
              {formText.tag} <span>{formText.counter}</span>
            </p>
            <h3>{formText.title}</h3>
            <span className="contact-form-intro">{formText.intro}</span>
            {selectedPackage && (
              <div className="contact-selected-package">
                <span>{formText.selectedPackage}</span>
                <strong>{selectedPackage.name}</strong>
                <button
                  type="button"
                  aria-label={formText.clearSelectedPackage}
                  onClick={() => setSelectedPackageIndex(null)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
          </div>

          <form
            className="contact-form"
            id="contact-brief-form"
            onSubmit={handleSubmit}
            data-cursor="disable"
          >
            <div className="contact-form-row">
              <label htmlFor="contact-name">
                <span>{formText.name}</span>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={formText.namePlaceholder}
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                />
              </label>
              <label>
                <span>{formText.contact}</span>
                <input
                  type="text"
                  autoComplete="email"
                  required
                  placeholder={formText.contactPlaceholder}
                  value={form.contact}
                  onChange={(event) => update("contact", event.target.value)}
                />
              </label>
            </div>

            <div className="contact-form-row">
              <label>
                <span>{formText.projectType}</span>
                <select
                  required
                  value={form.projectType}
                  onChange={(event) => update("projectType", event.target.value)}
                >
                  <option value="" disabled>
                    {formText.projectTypePlaceholder}
                  </option>
                  {formText.projectTypes.map((option, index) => (
                    <option value={index} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>
                  {formText.budget} <small>{formText.optional}</small>
                </span>
                <select
                  value={form.budget}
                  onChange={(event) => update("budget", event.target.value)}
                >
                  <option value="">{formText.budgetPlaceholder}</option>
                  {formText.budgets.map((option, index) => (
                    <option value={index} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span>{formText.details}</span>
              <textarea
                rows={4}
                required
                placeholder={formText.detailsPlaceholder}
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
              />
            </label>

            <button type="submit">
              {formText.submit} <FaWhatsapp aria-hidden="true" />
            </button>
            <p className="contact-form-note">{formText.note}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
