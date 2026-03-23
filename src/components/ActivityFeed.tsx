"use client";

import { useEffect, useState } from "react";
import styles from "./ActivityFeed.module.css";

interface ActivityItem {
  type: string;
  label: string;
  time: string;
  icon: string;
}

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchActivity() {
      try {
        const res = await fetch("/api/activity");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setActivities(data);
        }
      } catch {
        // Silently fail — not critical
      }
    }

    fetchActivity();
    return () => {
      cancelled = true;
    };
  }, []);

  if (activities.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.strip}>
        {activities.map((item, index) => (
          <div key={`${item.type}-${index}`} className={styles.item}>
            {index === 0 && <span className={styles.pulseDot} />}
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.separator}>&middot;</span>
            <span className={styles.time}>{getRelativeTime(item.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
