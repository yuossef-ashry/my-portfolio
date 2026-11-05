import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Packages from "./Packages";
import ProfileRibbon from "./ProfileRibbon";
import Process from "./Process";
import ServiceDetails from "./ServiceDetails";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import {
  initMagneticInteractions,
  initScrollMotion,
} from "./utils/scrollMotion";
import setSplitText from "./utils/splitText";
import "./styles/Motion.css";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth >= 1280
  );

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const resizeHandler = () => {
      setIsDesktopView(window.innerWidth >= 1280);
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setSplitText, 120);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const content = document.getElementById("smooth-content");
    if (!content) return;
    const stopScrollMotion = initScrollMotion(content);
    const stopMagneticInteractions = initMagneticInteractions();
    return () => {
      stopScrollMotion();
      stopMagneticInteractions();
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <BackToTop />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <ProfileRibbon />
            <About />
            <Career />
            <Work />
            <Suspense fallback={null}>
              <TechStack interactive={isDesktopView} />
            </Suspense>
            <WhatIDo />
            <ServiceDetails />
            <Process />
            <Packages />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
