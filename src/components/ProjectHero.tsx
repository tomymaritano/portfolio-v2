"use client";

import { motion } from "framer-motion";
import styles from "./ProjectHero.module.css";

interface ProjectHeroProps {
  name: string;
  tagline: string;
  status: "live" | "archived" | "learning";
  topics: string[];
}

function DashboardMockup() {
  return (
    <svg viewBox="0 0 400 250" fill="none" className={styles.mockupSvg}>
      {/* Browser frame */}
      <rect x="0" y="0" width="400" height="250" rx="8" fill="#0a0a0f" />
      <rect x="0" y="0" width="400" height="30" rx="8" fill="#12121a" />
      <rect x="0" y="22" width="400" height="8" fill="#12121a" />

      {/* Browser dots */}
      <circle cx="16" cy="15" r="5" fill="#ff4444" opacity="0.7" />
      <circle cx="32" cy="15" r="5" fill="#ffaa00" opacity="0.7" />
      <circle cx="48" cy="15" r="5" fill="#00ff88" opacity="0.7" />

      {/* URL bar */}
      <rect x="70" y="8" width="260" height="14" rx="4" fill="#1e1e2e" />
      <rect x="80" y="12" width="60" height="6" rx="2" fill="#2e2e3e" />

      {/* Sidebar */}
      <rect x="0" y="30" width="70" height="220" fill="#12121a" />
      <rect x="10" y="45" width="50" height="8" rx="2" fill="#00ff88" opacity="0.4" />
      <rect x="10" y="65" width="45" height="5" rx="1" fill="#2e2e3e" />
      <rect x="10" y="78" width="40" height="5" rx="1" fill="#2e2e3e" />
      <rect x="10" y="91" width="48" height="5" rx="1" fill="#2e2e3e" />
      <rect x="10" y="104" width="35" height="5" rx="1" fill="#2e2e3e" />

      {/* Main content area */}
      <rect x="85" y="45" width="180" height="80" rx="6" fill="#1e1e2e" />

      {/* Chart */}
      <path
        d="M100 110 L130 95 L160 100 L190 75 L220 85 L250 60"
        stroke="#00ff88"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100 115 L130 108 L160 112 L190 95 L220 100 L250 85"
        stroke="#00d4ff"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Chart labels */}
      <rect x="100" y="55" width="50" height="6" rx="1" fill="#e4e4e7" opacity="0.9" />
      <rect x="100" y="66" width="80" height="4" rx="1" fill="#2e2e3e" />

      {/* Stats cards */}
      <rect x="280" y="45" width="105" height="38" rx="4" fill="#1e1e2e" />
      <rect x="290" y="55" width="30" height="4" rx="1" fill="#2e2e3e" />
      <rect x="290" y="65" width="55" height="10" rx="2" fill="#00ff88" opacity="0.3" />

      <rect x="280" y="90" width="105" height="38" rx="4" fill="#1e1e2e" />
      <rect x="290" y="100" width="25" height="4" rx="1" fill="#2e2e3e" />
      <rect x="290" y="110" width="45" height="10" rx="2" fill="#00d4ff" opacity="0.3" />

      {/* Bottom table */}
      <rect x="85" y="140" width="300" height="95" rx="6" fill="#1e1e2e" />
      <rect x="100" y="155" width="80" height="6" rx="1" fill="#e4e4e7" opacity="0.8" />

      {/* Table rows */}
      <rect x="100" y="175" width="270" height="12" rx="2" fill="#12121a" />
      <rect x="100" y="195" width="270" height="12" rx="2" fill="#12121a" />
      <rect x="100" y="215" width="270" height="12" rx="2" fill="#12121a" />

      {/* Row highlights */}
      <rect x="105" y="178" width="40" height="6" rx="1" fill="#00ff88" opacity="0.2" />
      <rect x="105" y="198" width="35" height="6" rx="1" fill="#00d4ff" opacity="0.2" />
      <rect x="105" y="218" width="45" height="6" rx="1" fill="#00ff88" opacity="0.2" />
    </svg>
  );
}

export function ProjectHero({ name, tagline, status, topics }: ProjectHeroProps) {
  return (
    <motion.div
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.mockupContainer}>
        <div className={styles.glow} />
        <motion.div
          className={styles.mockup}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DashboardMockup />
        </motion.div>
      </div>

      <motion.div
        className={styles.info}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className={styles.meta}>
          <span className={styles.status} data-status={status}>
            {status === "live" && "● "}
            {status}
          </span>
        </div>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.topics}>
          {topics.map((topic) => (
            <span key={topic} className={styles.topic}>
              {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
