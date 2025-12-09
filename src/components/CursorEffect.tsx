"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./CursorEffect.module.css";

const HOVERABLE_SELECTORS = "a, button, [role='button'], input, textarea, select, [data-hoverable]";

export function CursorEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Use RAF for smoother cursor movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Event delegation for hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(HOVERABLE_SELECTORS)) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement | null;

    // Only set hovering to false if we're leaving a hoverable and not entering another
    if (target.closest(HOVERABLE_SELECTORS)) {
      if (!relatedTarget?.closest(HOVERABLE_SELECTORS)) {
        setIsHovering(false);
      }
    }
  }, []);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event delegation - single listeners on document
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    document.body.classList.add("custom-cursor-active");

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseOver, handleMouseOut]);

  // Don't render on touch devices (SSR safe)
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
