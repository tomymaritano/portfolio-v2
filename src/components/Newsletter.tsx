"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks for subscribing! Check your email to confirm.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Subscribe to my newsletter</h3>
        <p className={styles.description}>
          Get updates on new posts, projects, and insights delivered to your inbox.
          No spam, unsubscribe anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={styles.input}
          disabled={status === "loading"}
          required
        />
        <button
          type="submit"
          className={styles.button}
          disabled={status === "loading" || !email}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p className={`${styles.message} ${styles[status]}`}>
          {message}
        </p>
      )}
    </div>
  );
}
