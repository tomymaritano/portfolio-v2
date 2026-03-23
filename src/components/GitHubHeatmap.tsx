"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./GitHubHeatmap.module.css";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  username: string;
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubHeatmap({ username }: Props) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const data = await res.json();

        if (cancelled) return;

        if (data.contributions) {
          const flat: ContributionDay[] = [];
          let sum = 0;

          for (const week of data.contributions) {
            for (const day of week) {
              flat.push({ date: day.date, count: day.count, level: day.level as 0 | 1 | 2 | 3 | 4 });
              sum += day.count;
            }
          }

          setContributions(flat.slice(-371)); // ~53 weeks
          setTotal(sum);
        }
      } catch {
        // Silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [username]);

  // Group into weeks (columns)
  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    for (let i = 0; i < contributions.length; i += 7) {
      result.push(contributions.slice(i, i + 7));
    }
    return result;
  }, [contributions]);

  // Dynamic month labels aligned to week columns
  const monthLabels = useMemo(() => {
    const labels: { text: string; col: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < weeks.length; w++) {
      const firstDay = weeks[w][0];
      if (!firstDay) continue;
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ text: MONTH_NAMES[month], col: w });
        lastMonth = month;
      }
    }
    return labels;
  }, [weeks]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.total}>
          {total.toLocaleString()} contributions in the last year
        </span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          @{username}
        </a>
      </div>

      <div className={styles.scrollWrapper}>
        <div className={styles.calendar}>
          {/* Day labels */}
          <div className={styles.dayLabels}>
            {DAY_LABELS.map((label, i) => (
              <span key={i} className={styles.dayLabel}>{label}</span>
            ))}
          </div>

          <div className={styles.gridArea}>
            {/* Month labels */}
            <div className={styles.monthRow}>
              {monthLabels.map(({ text, col }) => (
                <span
                  key={`${text}-${col}`}
                  className={styles.monthLabel}
                  style={{ gridColumn: col + 1 }}
                >
                  {text}
                </span>
              ))}
            </div>

            {/* Contribution grid */}
            <div className={styles.grid}>
              {weeks.map((week, wi) => (
                <div key={wi} className={styles.week}>
                  {week.map((day, di) => (
                    <div
                      key={`${wi}-${di}`}
                      className={styles.cell}
                      data-level={day.level}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendText}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={styles.cell} data-level={level} />
        ))}
        <span className={styles.legendText}>More</span>
      </div>
    </div>
  );
}
