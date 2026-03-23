"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { executeCommand, getCommands, searchCommands } from "@/lib/commands";
import type { CommandResult } from "@/lib/commands";
import styles from "./terminal.module.css";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "system";
  content: string;
}

const WELCOME = `
  ╔══════════════════════════════════════╗
  ║   tomás maritano — product engineer  ║
  ║   portfolio terminal v1.0            ║
  ╚══════════════════════════════════════╝

  Type \`help\` to see available commands.
`;

function formatHelp(): string {
  const commands = getCommands();
  const categories = new Map<string, typeof commands>();
  for (const cmd of commands) {
    const list = categories.get(cmd.category) || [];
    list.push(cmd);
    categories.set(cmd.category, list);
  }

  let output = "Available commands:\n\n";
  for (const [cat, cmds] of categories) {
    output += `  ${cat.toUpperCase()}\n`;
    for (const cmd of cmds) {
      const name = cmd.name.toLowerCase().padEnd(16);
      output += `    ${name}${cmd.description}\n`;
    }
    output += "\n";
  }
  output += "  Type any command name to execute it.";
  return output;
}

export function TerminalClient() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: "system", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const router = useRouter();

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { id: nextId.current++, type, content }]);
  }, []);

  const handleCommand = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      addLine("input", trimmed);
      setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistoryIndex(-1);

      // Special: help
      if (trimmed.toLowerCase() === "help") {
        addLine("output", formatHelp());
        return;
      }

      // Special: clear
      if (trimmed.toLowerCase() === "clear") {
        setLines([]);
        return;
      }

      // Parse command + args
      const parts = trimmed.split(/\s+/);
      const cmdName = parts[0];
      const args = parts.slice(1);

      const result = await executeCommand(cmdName, args);

      if (!result) {
        // Try fuzzy search
        const matches = searchCommands(cmdName);
        if (matches.length > 0) {
          const suggestion = matches[0];
          const res = await executeCommand(suggestion.id, args);
          if (res) {
            handleResult(res, suggestion.name);
            return;
          }
        }
        addLine("error", `Command not found: ${cmdName}. Type \`help\` for available commands.`);
        return;
      }

      handleResult(result, cmdName);
    },
    [addLine, router]
  );

  const handleResult = useCallback(
    (result: CommandResult, _cmdName: string) => {
      switch (result.type) {
        case "text":
          addLine("output", result.content);
          break;
        case "navigate":
          if (result.url.startsWith("http") || result.url.startsWith("mailto:")) {
            addLine("output", `Opening ${result.url} ...`);
            window.open(result.url, "_blank");
          } else {
            addLine("output", `Navigating to ${result.url} ...`);
            setTimeout(() => router.push(result.url), 500);
          }
          break;
        case "action":
          addLine("output", result.message || "Done.");
          break;
        case "data":
          addLine("output", JSON.stringify(result.payload, null, 2));
          break;
      }
    },
    [addLine, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCommand(input);
        setInput("");
        setSuggestions([]);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0) {
          const newIndex = Math.min(historyIndex + 1, history.length - 1);
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const matches = searchCommands(input)
          .map((c) => c.name.toLowerCase())
          .slice(0, 5);
        if (matches.length === 1) {
          setInput(matches[0]);
          setSuggestions([]);
        } else if (matches.length > 1) {
          setSuggestions(matches);
        }
      }
    },
    [input, history, historyIndex, handleCommand]
  );

  // Auto-scroll on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on click anywhere
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      {/* Title bar */}
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.titleText}>tomás@portfolio ~ %</span>
        <div className={styles.titleSpacer} />
      </div>

      {/* Terminal body */}
      <div ref={scrollRef} className={styles.body}>
        {lines.map((line) => (
          <div key={line.id} className={`${styles.line} ${styles[line.type]}`}>
            {line.type === "input" && (
              <span className={styles.prompt}>❯ </span>
            )}
            <pre className={styles.lineContent}>{line.content}</pre>
          </div>
        ))}

        {/* Suggestions */}
        {suggestions.length > 1 && (
          <div className={styles.suggestions}>
            {suggestions.map((s) => (
              <span key={s} className={styles.suggestion}>{s}</span>
            ))}
          </div>
        )}

        {/* Active input line */}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>❯ </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSuggestions([]);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
