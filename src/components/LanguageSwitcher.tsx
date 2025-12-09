"use client";

import { useI18n } from "@/lib/i18n/context";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${locale === "en" ? styles.active : ""}`}
        onClick={() => setLocale("en")}
        aria-label="English"
      >
        EN
      </button>
      <span className={styles.divider}>/</span>
      <button
        className={`${styles.button} ${locale === "es" ? styles.active : ""}`}
        onClick={() => setLocale("es")}
        aria-label="Español"
      >
        ES
      </button>
    </div>
  );
}
