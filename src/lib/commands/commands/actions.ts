import type { Command } from "../types";

export const actionCommands: Command[] = [
  {
    id: "theme-toggle",
    name: "Toggle Theme",
    description: "Switch dark/light mode",
    category: "action",
    keywords: ["theme", "dark", "light", "mode", "toggle", "tema"],
    icon: "🌓",
    action: (args) => {
      if (typeof window === "undefined") {
        return { type: "action", done: false, message: "Not available on server" };
      }
      const html = document.documentElement;
      const current = html.getAttribute("data-theme");
      const target = args?.[0] || (current === "light" ? "dark" : "light");
      html.setAttribute("data-theme", target);
      localStorage.setItem("theme", target);
      return { type: "action", done: true, message: `Theme set to ${target}` };
    },
  },
  {
    id: "spotify",
    name: "Now Playing",
    description: "Current Spotify track",
    category: "info",
    keywords: ["spotify", "music", "now", "playing", "musica"],
    icon: "🎵",
    action: async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        if (data.isPlaying) {
          return {
            type: "text",
            content: `🎵 Now playing: ${data.title} — ${data.artist}\n   Album: ${data.album}`,
          };
        }
        return { type: "text", content: "🎵 Not playing anything right now." };
      } catch {
        return { type: "text", content: "🎵 Could not fetch Spotify data." };
      }
    },
  },
];
