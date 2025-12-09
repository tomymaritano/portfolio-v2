"use client";

import { useEffect, useState } from "react";
import styles from "./GitHubCalendar.module.css";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  username: string;
}

export function GitHubCalendar({ username }: Props) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Using GitHub's contribution calendar via a proxy service
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const data = await response.json();

        if (data.contributions) {
          const flatContributions: ContributionDay[] = [];
          let total = 0;

          data.contributions.forEach((week: { date: string; count: number; level: number }[]) => {
            week.forEach((day) => {
              flatContributions.push({
                date: day.date,
                count: day.count,
                level: day.level as 0 | 1 | 2 | 3 | 4,
              });
              total += day.count;
            });
          });

          setContributions(flatContributions.slice(-365));
          setTotalContributions(total);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  // Group contributions by week
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {totalContributions.toLocaleString()} contributions in the last year
        </h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          @{username}
        </a>
      </div>

      <div className={styles.calendar}>
        <div className={styles.months}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
            (month) => (
              <span key={month} className={styles.month}>
                {month}
              </span>
            )
          )}
        </div>

        <div className={styles.grid}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={styles.day}
                  data-level={day.level}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendLabel}>Less</span>
        <div className={styles.legendColors}>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={styles.day} data-level={level} />
          ))}
        </div>
        <span className={styles.legendLabel}>More</span>
      </div>
    </div>
  );
}
