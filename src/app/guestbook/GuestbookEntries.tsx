import styles from "./page.module.css";

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

async function getEntries(): Promise<Entry[]> {
  try {
    // In production, this would fetch from Vercel KV or your database
    // For now, returning mock data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/guestbook`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

export async function GuestbookEntries() {
  const entries = await getEntries();

  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No messages yet. Be the first to sign!</p>
      </div>
    );
  }

  return (
    <div className={styles.entries}>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.entry}>
          <div className={styles.entryHeader}>
            <span className={styles.entryName}>{entry.name}</span>
            <span className={styles.entryDate}>
              {new Date(entry.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <p className={styles.entryMessage}>{entry.message}</p>
        </div>
      ))}
    </div>
  );
}
