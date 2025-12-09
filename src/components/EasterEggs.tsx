"use client";

import { useEffect, useRef, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

export function EasterEggs() {
  const inputRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activatePartyMode = useCallback(() => {
    document.body.classList.add("party-mode");

    // Play a celebration sound if available
    try {
      const audio = new Audio("/sounds/success.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch {}

    // Remove after 5 seconds
    setTimeout(() => {
      document.body.classList.remove("party-mode");
    }, 5000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Reset sequence after 2 seconds of inactivity
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        inputRef.current = [];
      }, 2000);

      // Add key to sequence
      inputRef.current = [...inputRef.current, e.code].slice(-10);

      // Check for Konami code
      if (inputRef.current.join(",") === KONAMI_CODE.join(",")) {
        activatePartyMode();
        inputRef.current = [];
      }
    };

    // Secret click pattern: triple click on logo
    const handleTripleClick = (e: MouseEvent) => {
      if (e.detail === 3) {
        const target = e.target as HTMLElement;
        if (target.closest("[data-logo]") || target.closest(".logo")) {
          activatePartyMode();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleTripleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleTripleClick);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activatePartyMode]);

  return null;
}
