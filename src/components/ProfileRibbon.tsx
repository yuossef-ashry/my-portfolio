import { useLanguage } from "../i18n/useLanguage";
import "./styles/ProfileRibbon.css";

const ProfileRibbon = () => {
  const { dir, t } = useLanguage();
  const items = [t.landing.kicker, ...t.landing.highlights];

  return (
    <div
      className="profile-ribbon"
      role="group"
      aria-label={t.landing.highlightsLabel}
    >
      <p className="profile-ribbon-accessible">{items.join(" · ")}</p>
      <div className="profile-ribbon-band" aria-hidden="true">
        <div className="profile-ribbon-track" dir={dir}>
          {[0, 1].map((copy) => (
            <div className="profile-ribbon-group" key={copy}>
              {items.map((item, index) => (
                <span className="profile-ribbon-item" key={`${item}-${index}`}>
                  {item}
                  <span className="profile-ribbon-star">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileRibbon;
