import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });
    let hover = false;
    const onMouseMove = (event: MouseEvent) => {
      if (hover) return;
      moveX(event.clientX);
      moveY(event.clientY);
    };
    document.addEventListener("mousemove", onMouseMove);

    const cursorItems = Array.from(document.querySelectorAll("[data-cursor]"));
    const cleanups = cursorItems.map((item) => {
      const element = item as HTMLElement;
      const onMouseEnter = () => {
        const rect = element.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          moveX(rect.left);
          moveY(rect.top);
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onMouseLeave = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
      return () => {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf(cursor);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
