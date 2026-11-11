import { useLanguage } from "../i18n/useLanguage";
import "./styles/FooterLayout.css";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer section-container" id="footer">
      <div className="footer-bottom">
        <span>{t.footer.rights}</span>
        <a href="#landingDiv">{t.footer.backToTop} ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
