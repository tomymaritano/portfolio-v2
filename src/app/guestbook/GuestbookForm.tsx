"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export function GuestbookForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setMessage("");
        router.refresh();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={styles.input}
          maxLength={50}
          required
        />
      </div>
      <div className={styles.formRow}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
          className={styles.textarea}
          maxLength={500}
          rows={3}
          required
        />
      </div>
      <div className={styles.formFooter}>
        <span className={styles.charCount}>{message.length}/500</span>
        <button
          type="submit"
          className={styles.button}
          disabled={status === "loading" || !name.trim() || !message.trim()}
        >
          {status === "loading" ? "Signing..." : "Sign Guestbook"}
        </button>
      </div>
      {status === "success" && (
        <p className={styles.success}>Thanks for signing!</p>
      )}
      {status === "error" && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
