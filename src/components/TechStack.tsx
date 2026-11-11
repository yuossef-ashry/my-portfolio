import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { technologies } from "./techStackData";
import { useLanguage } from "../i18n/useLanguage";
import "./styles/TechStack.css";

const TechStackCanvas = lazy(() => import("./TechStackCanvas"));

const TechStack = ({ interactive }: { interactive: boolean }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  // The physics canvas is a multi-megabyte chunk (three + rapier WASM), so it
  // is only fetched once the section is close to being seen. getBoundingClientRect
  // is used instead of IntersectionObserver because ScrollSmoother moves the
  // content with a transform.
  useEffect(() => {
    if (!interactive || nearViewport) return;

    let frame = 0;
    const check = () => {
      frame = 0;
      const top = sectionRef.current?.getBoundingClientRect().top;
      if (top === undefined) return;
      if (top < window.innerHeight * 1.5) setNearViewport(true);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    check();
    // Safety net for scroll positions restored on reload or deep links, which
    // do not always emit a scroll event the listeners above would catch.
    const safety = window.setInterval(check, 750);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearInterval(safety);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [interactive, nearViewport]);

  return (
    <section className="techstack" id="toolkit" ref={sectionRef}>
      <div className="section-container">
        <div className="techstack-head">
          <p className="section-kicker">{t.toolkit.kicker}</p>
          <h2 className="section-title">
            {t.toolkit.titleFirst} <span>{t.toolkit.titleAccent}</span>
          </h2>
          <p>{t.toolkit.intro}</p>
        </div>

        {interactive &&
          (nearViewport ? (
            <Suspense fallback={<div className="tech-canvas-wrap" aria-hidden="true" />}>
              <TechStackCanvas />
            </Suspense>
          ) : (
            // Reserves the same height as the canvas so nothing shifts when it mounts.
            <div className="tech-canvas-wrap" aria-hidden="true" />
          ))}

        <ul className="techstack-list">
          {technologies.map((technology) => (
            <li key={technology.name}>
              <img src={technology.icon} alt="" aria-hidden="true" />
              <span>{technology.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStack;

