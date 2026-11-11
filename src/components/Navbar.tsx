import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import LanguageToggle from "./LanguageToggle";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { BsList, BsMoonStars, BsSunFill, BsX } from "react-icons/bs";
import { useLanguage } from "../i18n/useLanguage";
import { getSmoother, setSmoother } from "./utils/smoothScroll";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// [translation key, section id] — labels live in the dictionaries
const navigation = [
  ["home", "#landingDiv"],
  ["about", "#about"],
  ["career", "#career"],
  ["work", "#work"],
  ["toolkit", "#toolkit"],
  ["services", "#services"],
  ["serviceDetails", "#service-details"],
  ["process", "#process"],
  ["pricing", "#packages"],
  ["contact", "#contact"],
] as const;

const Navbar = () => {
  const { lang, t } = useLanguage();
  const [theme, setTheme] = useState<string>(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );
  const [activeSection, setActiveSection] = useState(
    () => window.location.hash || "#landingDiv"
  );
  const activeSectionIndex = Math.max(
    0,
    navigation.findIndex(([, href]) => href === activeSection)
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;

    menuCloseRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Keep the theme toggle usable when browser storage is disabled.
    }
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--backgroundColor")
      .trim();
    if (bg) document.body.style.backgroundColor = bg;
    setTheme(next);
  };

  useEffect(() => {
    getSmoother()?.kill();
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(smoother);

    const alreadyLoaded = !!document.querySelector("main.main-active");
    if (alreadyLoaded) {
      document.body.style.overflowY = "auto";
      smoother.paused(false);
    } else {
      smoother.scrollTop(0);
      smoother.paused(true);
    }

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );
    const sectionTriggers = navigation.flatMap(([, href]) => {
      const trigger = document.getElementById(href.slice(1));
      if (!trigger) return [];

      return [
        ScrollTrigger.create({
          trigger,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(href);
          },
        }),
      ];
    });
    const scrollToSection = (target: HTMLElement | null) => {
      if (!target) {
        smoother.scrollTo(0, true);
        return;
      }

      const heading = target.querySelector<HTMLElement>("h1, h2, h3");
      const headerBottom =
        document.querySelector<HTMLElement>(".header")?.getBoundingClientRect()
          .bottom ?? 0;
      const sectionTop = target.getBoundingClientRect().top;
      const headingTop = heading?.getBoundingClientRect().top ?? sectionTop;
      const headingOffset = headingTop - sectionTop;
      const offset = Math.max(0, Math.ceil(headerBottom + 16 - headingOffset));
      smoother.scrollTo(
        target,
        true,
        offset > 0 ? `top top+=${offset}` : "top top"
      );
    };
    const initialHash = window.location.hash;
    const initialTarget = initialHash
      ? document.getElementById(initialHash.slice(1))
      : null;
    let initialHashTimeout: ReturnType<typeof window.setTimeout> | undefined;
    const restoreInitialHash = () => {
      if (!initialTarget || !document.querySelector("main.main-active")) return;
      setActiveSection(initialHash);
      if (initialHashTimeout) window.clearTimeout(initialHashTimeout);
      initialHashTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(() => scrollToSection(initialTarget));
        initialHashObserver?.disconnect();
      }, 240);
    };
    const initialHashObserver = initialTarget
      ? new MutationObserver(restoreInitialHash)
      : null;
    if (initialHashObserver) {
      const main = document.querySelector("main");
      if (main && !main.classList.contains("main-active")) {
        initialHashObserver.observe(main, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }
      restoreInitialHash();
    }
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.currentTarget as HTMLAnchorElement;
      const section = link.getAttribute("data-href") || link.getAttribute("href");
      if (!section || !section.startsWith("#") || section.length < 2) return;
      const target = document.getElementById(section.slice(1));
      if (!target) return;

      event.preventDefault();
      if (window.location.hash !== section) {
        window.history.pushState(null, "", section);
      }
      setActiveSection(section);
      setMenuOpen(false);
      scrollToSection(target);
    };
    const handleHistoryNavigation = () => {
      const section = window.location.hash || "#landingDiv";
      setActiveSection(section);
      const target = document.getElementById(section.slice(1));
      scrollToSection(target);
    };
    links.forEach((link) => link.addEventListener("click", handleAnchorClick));
    window.addEventListener("popstate", handleHistoryNavigation);

    const resizeHandler = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleAnchorClick)
      );
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("resize", resizeHandler);
      if (initialHashTimeout) window.clearTimeout(initialHashTimeout);
      initialHashObserver?.disconnect();
      sectionTriggers.forEach((trigger) => trigger.kill());
      if (getSmoother() === smoother) setSmoother(null);
      smoother.kill();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      ScrollSmoother.refresh(true);
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lang]);

  return (
    <>
      <div className="top-bar">
        <span className="top-bar-status">
          <span className="top-bar-dot" aria-hidden="true" />
          <span className="top-bar-text top-bar-text--long">
            {t.nav.topBarLong}
          </span>
          <span className="top-bar-text top-bar-text--short">
            {t.nav.topBarShort}
          </span>
        </span>
        <a
          href="#contact"
          className="top-bar-cta"
          data-href="#contact"
          data-cursor="disable"
        >
          {t.nav.topBarCta} <span aria-hidden="true">{lang === "ar" ? "↖" : "↗"}</span>
        </a>
      </div>

      <header className={`header${menuOpen ? " header--menu-open" : ""}`}>
        <a
          href="#landingDiv"
          className="navbar-title logo-link"
          data-href="#landingDiv"
          data-cursor="disable"
          aria-label={t.nav.logoLabel}
        >
          <svg
            className="animated-logo"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <circle
              className="logo-orbit"
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="2"
              strokeDasharray="12 7"
            />
            <path
              d="M25 34 L50 53 L75 34 M50 53 V68"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="76" cy="24" r="4" fill="#f59e0b" />
          </svg>
          <span className="logo-text">
            {lang === "ar" ? "يوسف" : "Youssef"}<span>.</span>
          </span>
          <span className="logo-surname">
            {lang === "ar" ? "العشري" : "Al-Ashry"}
          </span>
        </a>

        <nav
          className="site-nav"
          id="site-navigation"
          aria-label={t.nav.navigationLabel}
        >
          <div className="site-nav-heading">
            <div className="site-nav-heading-copy">
              <span className="site-nav-eyebrow">
                {t.nav.menuLabel}{" "}
                <span className="site-nav-count">
                  {String(activeSectionIndex + 1).padStart(2, "0")} / {String(navigation.length).padStart(2, "0")}
                </span>
              </span>
              <span className="site-nav-title">{t.nav.navigationLabel}</span>
            </div>
            <button
              ref={menuCloseRef}
              className="site-nav-close"
              type="button"
              aria-label={t.nav.closeMenu}
              onClick={closeMenu}
            >
              <BsX aria-hidden="true" />
            </button>
          </div>
          <ul>
            {navigation.map(([key, href], index) => (
              <li key={href}>
                <a
                  href={href}
                  data-href={href}
                  aria-current={activeSection === href ? "location" : undefined}
                >
                  <span className="site-nav-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <HoverLinks text={t.nav.links[key]} />
                  <span className="site-nav-arrow" aria-hidden="true">
                    {lang === "ar" ? "↖" : "↗"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="site-nav-footer">
            <span className="site-nav-availability">
              <span className="top-bar-dot" aria-hidden="true" />
              {t.nav.topBarShort}
            </span>
            <a
              className="site-nav-cta"
              href="#contact"
              data-href="#contact"
              data-cursor="disable"
            >
              {t.nav.topBarCta}
              <span aria-hidden="true">{lang === "ar" ? "↖" : "↗"}</span>
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <button
            ref={menuToggleRef}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-label">
              {menuOpen ? t.nav.closeLabel : t.nav.menuLabel}
            </span>
            <span className="menu-toggle-icon" aria-hidden="true">
              {menuOpen ? <BsX /> : <BsList />}
            </span>
          </button>
          <button
            type="button"
            className="theme-toggle"
            data-cursor="disable"
            aria-label={
              theme === "dark" ? t.nav.themeToLight : t.nav.themeToDark
            }
            onClick={toggleTheme}
          >
            {theme === "dark" ? <BsSunFill /> : <BsMoonStars />}
          </button>
          <LanguageToggle />
        </div>
      </header>

      <div className="nav-fade" aria-hidden="true" />
    </>
  );
};

export default Navbar;
