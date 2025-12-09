"use client";

import styles from "./BentoGrid.module.css";

interface BentoItem {
  label: string;
  value: string;
  icon: string;
  size?: "normal" | "wide" | "tall";
  accent?: boolean;
}

const stats: BentoItem[] = [
  { label: "Years Experience", value: "5+", icon: "📅", size: "normal" },
  { label: "Projects Shipped", value: "20+", icon: "🚀", size: "normal", accent: true },
  { label: "Stack", value: "TS/React/Node", icon: "⚡", size: "wide" },
  { label: "Focus", value: "Fintech", icon: "💰", size: "normal" },
  { label: "Location", value: "Buenos Aires", icon: "📍", size: "normal" },
  { label: "Status", value: "Available", icon: "✅", size: "normal", accent: true },
];

export function BentoGrid() {
  return (
    <div className={styles.grid}>
      {stats.map((item) => (
        <div
          key={item.label}
          className={`${styles.card} ${styles[item.size || "normal"]} ${
            item.accent ? styles.accent : ""
          }`}
        >
          <span className={styles.icon}>{item.icon}</span>
          <div className={styles.content}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
