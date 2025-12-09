"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./CursorEffect.module.css";

export function CursorEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const updateHoverables = () => {
      const hoverables = document.querySelectorAll("a, button, [role='button'], input, textarea, select");

      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    updateHoverables();

    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-active");

    // Re-run on DOM changes
    const observer = new MutationObserver(updateHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles.cursor} ${isHovering ? styles.hovering : ""} ${isVisible ? styles.visible : ""}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`${styles.trail} ${isVisible ? styles.visible : ""}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
}
