import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/useLanguage";
import { getSmoother } from "./utils/smoothScroll";
import "./styles/BackToTop.css";

gsap.registerPlugin(ScrollTrigger);

const BackToTop = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const trigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: "bottom top",
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
      onRefresh: (self) => setIsVisible(self.scroll() >= self.start),
    });

    return () => trigger.kill();
  }, []);

  const scrollToTop = () => {
    const smoother = getSmoother();
    if (smoother) {
      smoother.scrollTo(0, true);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`back-to-top${isVisible ? " back-to-top--visible" : ""}`}
      type="button"
      onClick={scrollToTop}
      aria-label={t.nav.backToTop}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <BsArrowUp aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
