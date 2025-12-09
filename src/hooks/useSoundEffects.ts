"use client";

import { useCallback, useRef, useEffect, useState } from "react";

interface SoundOptions {
  volume?: number;
  enabled?: boolean;
}

export function useSoundEffects(options: SoundOptions = {}) {
  const { volume = 0.1, enabled = true } = options;
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [soundEnabled, setSoundEnabled] = useState(enabled);

  // Preload sounds
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sounds = ["/sounds/click.mp3", "/sounds/hover.mp3", "/sounds/success.mp3"];

    sounds.forEach((src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = volume;
      audioCache.current.set(src, audio);
    });

    return () => {
      audioCache.current.clear();
    };
  }, [volume]);

  const playSound = useCallback((src: string, customVolume?: number) => {
    if (!soundEnabled) return;

    try {
      let audio = audioCache.current.get(src);

      if (!audio) {
        audio = new Audio(src);
        audioCache.current.set(src, audio);
      }

      audio.volume = customVolume ?? volume;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Silently fail - user may not have interacted with page yet
      });
    } catch {
      // Audio not supported or file not found
    }
  }, [soundEnabled, volume]);

  const playClick = useCallback(() => {
    playSound("/sounds/click.mp3", 0.1);
  }, [playSound]);

  const playHover = useCallback(() => {
    playSound("/sounds/hover.mp3", 0.05);
  }, [playSound]);

  const playSuccess = useCallback(() => {
    playSound("/sounds/success.mp3", 0.15);
  }, [playSound]);

  const playError = useCallback(() => {
    playSound("/sounds/error.mp3", 0.1);
  }, [playSound]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    playSound,
    soundEnabled,
    toggleSound,
  };
}
