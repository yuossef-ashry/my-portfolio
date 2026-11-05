import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headingSelector =
  ".section-title, .about-title, .career-head h2, .packages-head h2, .contact-heading h2";

const revealSelector = [
  ".section-kicker",
  headingSelector,
  ".about-copy",
  ".what-intro",
  ".what-card",
  ".career-head h2",
  ".career-info-box",
  ".work-head > p",
  ".work-filter",
  ".work-card",
  ".work-preview",
  ".packages-head h2",
  ".packages-head > p",
  ".package-card",
  ".packages-custom-copy > h3",
  ".packages-custom-copy > p:last-child",
  ".packages-custom-btn",
  ".techstack-head > *",
  ".techstack-list > li",
  ".process-head > p",
  ".process-card",
  ".process-footer",
  ".contact-heading h2",
  ".contact-heading > p:last-child",
  ".contact-availability",
  ".contact-direct-links > a",
  ".contact-socials > a",
  ".contact-form-card",
  ".contact-form-header > *",
  ".contact-form-row > label",
  ".contact-form > label",
  ".contact-selected-package",
  ".contact-form button",
  ".contact-form-note",
  ".footer-bottom > *",
].join(",");

export const initScrollMotion = (root: HTMLElement) => {
  const media = gsap.matchMedia(root);

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      mobile: "(max-width: 767px)",
      tablet: "(min-width: 768px) and (max-width: 1279px)",
      desktop: "(min-width: 1280px)",
    },
    ({ conditions }) => {
      if (conditions?.reduceMotion) return;

      const revealContexts = new Map<HTMLElement, gsap.Context>();
      const sectionContexts: gsap.Context[] = [];
      const mobile = Boolean(conditions?.mobile);
      const compact = Boolean(conditions?.mobile || conditions?.tablet);
      let refreshFrame = 0;

      const scheduleRefresh = () => {
        if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
        refreshFrame = window.requestAnimationFrame(() => {
          refreshFrame = 0;
          ScrollTrigger.refresh();
        });
      };

      if (compact) {
        const landing = root.querySelector<HTMLElement>(".landing-section");
        const landingContent = landing?.querySelectorAll<HTMLElement>(
          ".landing-intro, .landing-info, .landing-scroll-cue"
        );
        if (landing && landingContent?.length) {
          sectionContexts.push(
            gsap.context(() => {
              gsap.to(landingContent, {
                autoAlpha: 0,
                y: -20,
                ease: "none",
                stagger: 0.04,
                scrollTrigger: {
                  trigger: landing,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });
            }, landing)
          );
        }
      }

      const animateElement = (element: HTMLElement) => {
        if (
          revealContexts.has(element) ||
          element.closest(".landing-section")
        ) {
          return;
        }

        const siblingIndex = element.parentElement
          ? Array.from(element.parentElement.children).indexOf(element)
          : 0;
        const direction = document.documentElement.dir === "rtl" ? 1 : -1;
        const distance = mobile ? 20 : 36;
        let from: gsap.TweenVars = { autoAlpha: 0, y: distance };
        let to: gsap.TweenVars = { autoAlpha: 1, y: 0 };

        if (element.matches(headingSelector)) {
          from = {
            autoAlpha: 0,
            y: mobile ? 16 : 24,
            filter: "blur(7px)",
          };
          to = { autoAlpha: 1, y: 0, filter: "blur(0px)" };
        } else if (element.matches(".career-info-box")) {
          const side = siblingIndex % 2 === 0 ? -1 : 1;
          from = {
            autoAlpha: 0,
            x: side * direction * (mobile ? 16 : 34),
          };
          to = { autoAlpha: 1, x: 0 };
        } else if (
          element.matches(".what-card, .package-card, .process-card")
        ) {
          from = {
            autoAlpha: 0,
            y: mobile ? 16 : 24,
            scale: mobile ? 0.96 : 0.93,
          };
          to = { autoAlpha: 1, y: 0, scale: 1 };
        } else if (element.matches(".work-card")) {
          from = { autoAlpha: 0, y: mobile ? 18 : 30, scale: 0.96 };
          to = { autoAlpha: 1, y: 0, scale: 1 };
        } else if (element.matches(".work-preview")) {
          from = { clipPath: "inset(0 0 100% 0 round 13px)" };
          to = { clipPath: "inset(0 0 0 0 round 13px)" };
        } else if (element.matches(".techstack-list > li")) {
          from = {
            autoAlpha: 0,
            y: mobile ? 10 : 14,
            scale: 0.84,
            rotate: -3,
          };
          to = { autoAlpha: 1, y: 0, scale: 1, rotate: 0 };
        } else if (
          element.matches(
            ".contact-direct-links > a, .contact-socials > a, .packages-custom-btn, .process-footer"
          )
        ) {
          from = {
            autoAlpha: 0,
            x: direction * (mobile ? 16 : 28),
          };
          to = { autoAlpha: 1, x: 0 };
        } else if (element.matches(".contact-form-card")) {
          from = {
            autoAlpha: 0,
            x: -direction * (mobile ? 18 : 36),
            scale: mobile ? 0.99 : 0.975,
          };
          to = { autoAlpha: 1, x: 0, scale: 1 };
        } else if (
          element.matches(
            ".contact-form-header > *, .contact-form-row > label, .contact-form > label, .contact-selected-package, .contact-form button, .contact-form-note"
          )
        ) {
          from = {
            autoAlpha: 0,
            y: mobile ? 10 : 14,
            x: element.matches(".contact-form-row > label")
              ? direction * (siblingIndex % 2 === 0 ? -10 : 10)
              : 0,
          };
          to = { autoAlpha: 1, y: 0, x: 0 };
        } else if (element.matches(".techstack-head > p:last-child")) {
          from = { autoAlpha: 0, y: mobile ? 14 : 22, filter: "blur(5px)" };
          to = { autoAlpha: 1, y: 0, filter: "blur(0px)" };
        }

        const context = gsap.context(() => {
          gsap.fromTo(
            element,
            from,
            {
              ...to,
              duration: mobile ? 0.62 : 0.78,
              delay: Math.min(siblingIndex * 0.055, 0.22),
              ease: "power3.out",
              clearProps: element.matches(".work-preview")
                ? "filter,clipPath"
                : "transform,filter,clipPath",
              immediateRender: false,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                end: "bottom 12%",
                toggleActions: "play reverse play reverse",
                invalidateOnRefresh: true,
              },
            }
          );

          if (element.matches(".work-preview")) {
            const card = element.closest(".work-card") ?? element;
            gsap.to(element, {
              yPercent: -7,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            });
          }
        }, element);

        revealContexts.set(element, context);
      };

      const visitNode = (node: Node, visit: (element: HTMLElement) => void) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(revealSelector)) visit(node);
        node.querySelectorAll<HTMLElement>(revealSelector).forEach(visit);
      };

      root.querySelectorAll<HTMLElement>(revealSelector).forEach(animateElement);

      const observer = new MutationObserver((records) => {
        records.forEach((record) => {
          record.removedNodes.forEach((node) =>
            visitNode(node, (element) => {
              revealContexts.get(element)?.revert();
              revealContexts.delete(element);
            })
          );
          record.addedNodes.forEach((node) =>
            visitNode(node, animateElement)
          );
        });
        scheduleRefresh();
      });
      observer.observe(root, { childList: true, subtree: true });
      scheduleRefresh();

      return () => {
        observer.disconnect();
        if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
        revealContexts.forEach((context) => context.revert());
        sectionContexts.forEach((context) => context.revert());
      };
    }
  );

  return () => media.revert();
};

export const initMagneticInteractions = () => {
  const media = gsap.matchMedia();

  media.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const root = document;
      const selector = [
        ".top-bar-cta",
        ".menu-toggle",
        ".lang-toggle",
        ".landing-project-cta",
        ".landing-contact-cta",
        ".work-link",
        ".package-btn",
        ".packages-custom-btn",
        ".process-footer a",
        ".contact-form button",
        ".contact-direct-links > a",
        ".contact-socials a",
      ].join(",");
      type QuickValues = {
        x: ReturnType<typeof gsap.quickTo>;
        y: ReturnType<typeof gsap.quickTo>;
      };
      const quickValues = new WeakMap<HTMLElement, QuickValues>();
      const touchedTargets = new Set<HTMLElement>();
      let activeTarget: HTMLElement | null = null;

      const getElement = (target: EventTarget | null) => {
        if (!(target instanceof Element)) return null;
        return target.closest<HTMLElement>(selector);
      };

      const getQuickValues = (element: HTMLElement) => {
        let values = quickValues.get(element);
        if (!values) {
          touchedTargets.add(element);
          values = {
            x: gsap.quickTo(element, "x", {
              duration: 0.42,
              ease: "power3.out",
            }),
            y: gsap.quickTo(element, "y", {
              duration: 0.42,
              ease: "power3.out",
            }),
          };
          quickValues.set(element, values);
        }
        return values;
      };

      const resetTarget = (element: HTMLElement) => {
        const values = getQuickValues(element);
        values.x(0);
        values.y(0);
        gsap.to(element, {
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onPointerMove = (event: PointerEvent) => {
        const element = getElement(event.target);
        if (!element) {
          if (activeTarget) resetTarget(activeTarget);
          activeTarget = null;
          return;
        }

        if (activeTarget && activeTarget !== element) {
          resetTarget(activeTarget);
        }
        activeTarget = element;

        const bounds = element.getBoundingClientRect();
        const strength = Math.min(bounds.width, bounds.height) > 90 ? 0.045 : 0.09;
        const x = gsap.utils.clamp(
          -7,
          7,
          (event.clientX - bounds.left - bounds.width / 2) * strength
        );
        const y = gsap.utils.clamp(
          -6,
          6,
          (event.clientY - bounds.top - bounds.height / 2) * strength
        );
        const values = getQuickValues(element);
        values.x(x);
        values.y(y);
      };

      const onPointerDown = (event: PointerEvent) => {
        const element = getElement(event.target);
        if (!element) return;
        gsap.to(element, {
          scale: 0.97,
          duration: 0.12,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onPointerUp = (event: PointerEvent) => {
        const element = getElement(event.target);
        if (element) resetTarget(element);
      };

      const onPointerOut = (event: PointerEvent) => {
        const element = getElement(event.target);
        const nextElement = getElement(event.relatedTarget);
        if (element && element !== nextElement) resetTarget(element);
        if (activeTarget === element && element !== nextElement) {
          activeTarget = nextElement;
        }
      };

      root.addEventListener("pointermove", onPointerMove);
      root.addEventListener("pointerdown", onPointerDown);
      root.addEventListener("pointerup", onPointerUp);
      root.addEventListener("pointercancel", onPointerUp);
      root.addEventListener("pointerout", onPointerOut);

      return () => {
        root.removeEventListener("pointermove", onPointerMove);
        root.removeEventListener("pointerdown", onPointerDown);
        root.removeEventListener("pointerup", onPointerUp);
        root.removeEventListener("pointercancel", onPointerUp);
        root.removeEventListener("pointerout", onPointerOut);
        touchedTargets.forEach((element) => {
          gsap.killTweensOf(element);
          gsap.set(element, { clearProps: "transform" });
        });
      };
    }
  );

  return () => media.revert();
};
