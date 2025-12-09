"use client";

import { useEffect, useRef } from "react";

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export function Giscus({ repo, repoId, category, categoryId }: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const theme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark_dimmed";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      if (ref.current) {
        const iframe = ref.current.querySelector("iframe.giscus-frame");
        if (iframe) iframe.remove();
      }
    };
  }, [repo, repoId, category, categoryId]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame"
      );
      if (!iframe) return;

      const theme =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark_dimmed";

      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="giscus" />;
}
