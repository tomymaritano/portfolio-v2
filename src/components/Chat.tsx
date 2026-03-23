"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Chat.module.css";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  typing?: boolean;
}

const quickReplies = ["About me", "Projects", "Contact", "Skills"];

export function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", content: "Hey! Ask me anything about Tomás. 👋" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = {
        id: nextId.current++,
        role: "user",
        content: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text.trim() }),
        });

        const data = await res.json();
        const botText = data.response || "Sorry, I couldn't understand that.";

        // Typing animation
        const botMsg: Message = {
          id: nextId.current++,
          role: "bot",
          content: "",
          typing: true,
        };
        setMessages((prev) => [...prev, botMsg]);

        let displayed = "";
        for (let i = 0; i < botText.length; i++) {
          displayed += botText[i];
          const current = displayed;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsg.id ? { ...m, content: current } : m
            )
          );
          await new Promise((r) => setTimeout(r, 20));
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsg.id ? { ...m, typing: false } : m
          )
        );
      } catch {
        setMessages((prev) => [
          ...prev,
          { id: nextId.current++, role: "bot", content: "Oops, something went wrong." },
        ]);
      }

      setIsTyping(false);
    },
    [isTyping]
  );

  return (
    <>
      {/* Floating button */}
      <motion.button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <span className={styles.headerTitle}>Ask me anything</span>
              <button
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${styles[msg.role]}`}
                >
                  <div className={styles.bubble}>
                    {msg.content}
                    {msg.typing && <span className={styles.cursor}>▋</span>}
                  </div>
                </div>
              ))}

              {/* Quick replies */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].role === "bot" && (
                <div className={styles.quickReplies}>
                  {quickReplies.map((text) => (
                    <button
                      key={text}
                      className={styles.chip}
                      onClick={() => sendMessage(text)}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className={styles.inputArea}>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
                disabled={isTyping}
              />
              <button
                className={styles.sendBtn}
                onClick={() => sendMessage(input)}
                disabled={isTyping || !input.trim()}
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
