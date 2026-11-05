import gsap from "gsap";
import { getSmoother } from "./smoothScroll";

const heroTextSelector = [
  ".landing-availability",
  ".landing-intro .landing-kicker",
  ".landing-name-word",
  ".landing-supporting-copy",
  ".landing-info h3",
  ".landing-info-h2 > span",
  ".landing-actions",
  ".landing-highlights > span",
  ".landing-scroll-cue",
].join(",");

let activeIntroTween: gsap.core.Timeline | null = null;
let introFrame = 0;

const animateLandingIntro = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  activeIntroTween?.kill();
  gsap.set(heroTextSelector, {
    clearProps: "transform,filter,opacity,visibility",
  });

  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const wordOffset = mobile ? 48 : 82;
  const timeline = gsap.timeline();

  timeline
    .fromTo(
      ".landing-availability",
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.62,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      },
      0
    )
    .fromTo(
      ".landing-intro .landing-kicker",
      { autoAlpha: 0, y: 16, filter: "blur(4px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.68,
        ease: "power3.out",
        clearProps: "transform,filter,opacity,visibility",
      },
      0.06
    )
    .fromTo(
      ".landing-name-word",
      { autoAlpha: 0, y: wordOffset, filter: "blur(7px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.92,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,filter,opacity,visibility",
      },
      0.12
    )
    .fromTo(
      ".landing-info h3, .landing-info-h2 > span",
      { autoAlpha: 0, y: 26, filter: "blur(5px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.78,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,filter,opacity,visibility",
      },
      0.2
    )
    .fromTo(
      ".landing-supporting-copy",
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      },
      0.45
    )
    .fromTo(
      [".landing-actions", ".landing-highlights > span", ".landing-scroll-cue"],
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.66,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
      },
      0.58
    );

  activeIntroTween = timeline;
};

if (typeof window !== "undefined") {
  window.addEventListener("portfolio:language-change", () => {
    activeIntroTween?.kill();
    activeIntroTween = null;
    if (introFrame) window.cancelAnimationFrame(introFrame);
    gsap.set(heroTextSelector, {
      clearProps: "transform,filter,opacity,visibility",
    });
    introFrame = window.requestAnimationFrame(() => {
      introFrame = 0;
      animateLandingIntro();
    });
  });
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  getSmoother()?.paused(false);
  document.querySelector("main")?.classList.add("main-active");
  const pageBg = getComputedStyle(document.documentElement)
    .getPropertyValue("--backgroundColor")
    .trim();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.style.backgroundColor = pageBg || "#faf7f2";
    return;
  }

  gsap.to("body", {
    backgroundColor: pageBg || "#faf7f2",
    duration: 0.5,
    delay: 1,
  });

  animateLandingIntro();

  gsap.fromTo(
    [".header", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
