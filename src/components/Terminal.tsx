"use client";

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import styles from "./Terminal.module.css";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

// Project data
const PROJECTS = {
  dolargaucho: {
    name: "DólarGaucho",
    tagline: "Real-time currency tracking when APIs fail",
    status: "live",
    problem: "Argentina has multiple dollar rates. APIs are unreliable. Users need data they can trust.",
    decision: "Instead of trusting one source, I built a system that aggregates 5+ sources, detects anomalies, and shows confidence levels.",
    mistakes: [
      {
        assumption: '"More sources = better accuracy"',
        reality: "More sources = more edge cases. Some APIs update at different times.",
        learned: "Quality > Quantity. I ended up weighting sources by historical reliability.",
      },
      {
        assumption: '"Users want the most accurate number"',
        reality: "Users want to TRUST the number.",
        learned: 'Show confidence, not false precision. "Updated 2min ago, high confidence" beats a precise but stale number.',
      },
    ],
    tech: "Next.js, Supabase, Edge Functions. Update frequency: 30s during market hours.",
  },
  trackify: {
    name: "Trackify",
    tagline: "Habit tracking with insights",
    status: "live",
    problem: "Most habit apps are either too simple or too complex. Users abandon them.",
    decision: "Built with progressive complexity. Start simple, unlock features as you build streaks.",
    mistakes: [
      {
        assumption: '"Gamification drives engagement"',
        reality: "Points and badges felt hollow. Users wanted meaning.",
        learned: "Show impact, not scores. 'You meditated 30 hours this month' beats '500 points'.",
      },
    ],
    tech: "React Native, Firebase, Charts.js",
  },
  invoicehub: {
    name: "InvoiceHub",
    tagline: "B2B invoicing for LATAM",
    status: "archived",
    problem: "LATAM businesses need to comply with complex tax regulations when invoicing.",
    decision: "Built a system that auto-generates compliant invoices for Argentina, Chile, and Mexico.",
    mistakes: [
      {
        assumption: '"One solution fits all LATAM"',
        reality: "Each country has wildly different requirements.",
        learned: "Start with one market, nail it, then expand.",
      },
    ],
    tech: "Node.js, PostgreSQL, PDF generation, Tax APIs",
  },
};

export function Terminal() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "",
      output: `Welcome. Type 'help' to see what you can explore.`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "`" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const renderHelp = () => (
    <div className={styles.helpOutput}>
      <div className={styles.helpSection}>
        <span className={styles.helpCategory}>Navigation</span>
        <div><span className={styles.cmd}>projects</span> List all projects</div>
        <div><span className={styles.cmd}>project &lt;name&gt;</span> Deep dive into a project</div>
        <div><span className={styles.cmd}>decisions</span> How I make decisions</div>
        <div><span className={styles.cmd}>mistakes</span> Things I got wrong</div>
        <div><span className={styles.cmd}>hire</span> Why work with me</div>
      </div>
      <div className={styles.helpSection}>
        <span className={styles.helpCategory}>Discovery</span>
        <div><span className={styles.cmd}>thinking</span> How I approach problems</div>
        <div><span className={styles.cmd}>stack</span> Tech I use and why</div>
        <div><span className={styles.cmd}>now</span> What I&apos;m working on</div>
        <div><span className={styles.cmd}>contact</span> Get in touch</div>
      </div>
      <div className={styles.helpSection}>
        <span className={styles.helpCategory}>Utility</span>
        <div><span className={styles.cmd}>theme</span> Toggle dark/light mode</div>
        <div><span className={styles.cmd}>clear</span> Clear terminal</div>
        <div><span className={styles.cmd}>help</span> Show this message</div>
      </div>
      <div className={styles.helpSection}>
        <span className={styles.helpCategory}>Fun</span>
        <div><span className={styles.cmd}>secret</span> Try it...</div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className={styles.projectsOutput}>
      {Object.entries(PROJECTS).map(([slug, project]) => (
        <div key={slug} className={styles.projectRow}>
          <span className={styles.projectStatus} data-status={project.status}>
            {project.status === "live" ? "●" : "○"}
          </span>
          <span className={styles.projectName}>{project.name}</span>
          <span className={styles.projectTagline}>{project.tagline}</span>
        </div>
      ))}
      <p className={styles.hint}>Type &apos;project &lt;name&gt;&apos; for details (e.g., &apos;project dolargaucho&apos;)</p>
    </div>
  );

  const renderProject = (slug: string, flag?: string) => {
    const project = PROJECTS[slug as keyof typeof PROJECTS];
    if (!project) {
      return `Project "${slug}" not found. Type 'projects' to see available projects.`;
    }

    if (flag === "--mistakes") {
      return (
        <div className={styles.projectDetail}>
          <div className={styles.projectHeader}>
            <span className={styles.projectTitle}>WHAT FAILED — {project.name}</span>
          </div>
          {project.mistakes.map((mistake, i) => (
            <div key={i} className={styles.mistake}>
              <div className={styles.mistakeAssumption}>✗ {mistake.assumption}</div>
              <div className={styles.mistakeReality}>Reality: {mistake.reality}</div>
              <div className={styles.mistakeLearned}>Learned: {mistake.learned}</div>
            </div>
          ))}
        </div>
      );
    }

    if (flag === "--tech") {
      return (
        <div className={styles.projectDetail}>
          <div className={styles.projectHeader}>
            <span className={styles.projectTitle}>TECH STACK — {project.name}</span>
          </div>
          <p>{project.tech}</p>
        </div>
      );
    }

    return (
      <div className={styles.projectDetail}>
        <div className={styles.projectHeader}>
          <span className={styles.projectTitle}>{project.name}</span>
          <span className={styles.projectTaglineDetail}>{project.tagline}</span>
        </div>
        <div className={styles.projectSection}>
          <span className={styles.sectionLabel}>THE PROBLEM</span>
          <p>{project.problem}</p>
        </div>
        <div className={styles.projectSection}>
          <span className={styles.sectionLabel}>THE DECISION</span>
          <p>{project.decision}</p>
        </div>
        <p className={styles.hint}>
          Type &apos;project {slug} --mistakes&apos; to see what failed
          {"\n"}Type &apos;project {slug} --tech&apos; for technical details
        </p>
      </div>
    );
  };

  const renderDecisions = () => (
    <div className={styles.decisionsOutput}>
      <div className={styles.decisionsHeader}>HOW I MAKE DECISIONS</div>
      <div className={styles.decisionsPrinciples}>
        <p>I optimize for:</p>
        <div className={styles.principle}>1. Speed to value — ship fast, learn fast</div>
        <div className={styles.principle}>2. Reversibility — prefer decisions you can undo</div>
        <div className={styles.principle}>3. User trust — never mislead, even by omission</div>
      </div>
      <div className={styles.constraintsSection}>
        <p>Constraints I&apos;ve navigated:</p>
        <div>• Bad data → see &apos;project dolargaucho&apos;</div>
        <div>• Time pressure → shipped MVP in 2 weeks</div>
        <div>• Legacy systems → migrated without downtime</div>
      </div>
    </div>
  );

  const renderMistakes = () => (
    <div className={styles.mistakesOutput}>
      <div className={styles.mistakesHeader}>THINGS I GOT WRONG</div>
      <p className={styles.mistakesIntro}>I believe showing failures is more honest than hiding them.</p>
      <div className={styles.mistakesList}>
        <div className={styles.mistakeItem}>• Over-engineered DólarGaucho v1 — rebuilt in 2 weeks</div>
        <div className={styles.mistakeItem}>• Ignored user feedback for 3 months — paid the price</div>
        <div className={styles.mistakeItem}>• Built features nobody asked for — classic</div>
        <div className={styles.mistakeItem}>• Premature optimization — wasted a week on caching nobody needed</div>
      </div>
      <p className={styles.hint}>Type &apos;project &lt;name&gt; --mistakes&apos; for project-specific failures</p>
    </div>
  );

  const renderHire = () => (
    <div className={styles.hireOutput}>
      <div className={styles.hireHeader}>WHY WORK WITH ME</div>
      <div className={styles.hirePoints}>
        <div className={styles.hirePoint}>
          <span className={styles.hireLabel}>I ship.</span>
          <span>Not just code — products that users actually use.</span>
        </div>
        <div className={styles.hirePoint}>
          <span className={styles.hireLabel}>I think in systems.</span>
          <span>Architecture, UX flows, business logic — all connected.</span>
        </div>
        <div className={styles.hirePoint}>
          <span className={styles.hireLabel}>I communicate.</span>
          <span>Clear docs, async-first, no surprises.</span>
        </div>
        <div className={styles.hirePoint}>
          <span className={styles.hireLabel}>I own problems.</span>
          <span>Not just tasks. I&apos;ll tell you if something is wrong.</span>
        </div>
      </div>
      <p className={styles.hireContact}>Ready? → tomas@maritano.dev</p>
    </div>
  );

  const renderThinking = () => (
    <div className={styles.thinkingOutput}>
      <div className={styles.thinkingHeader}>HOW I APPROACH PROBLEMS</div>
      <div className={styles.thinkingSteps}>
        <div className={styles.thinkingStep}>
          <span className={styles.stepNumber}>01</span>
          <span className={styles.stepText}>Understand the constraint, not just the request</span>
        </div>
        <div className={styles.thinkingStep}>
          <span className={styles.stepNumber}>02</span>
          <span className={styles.stepText}>Find the smallest thing that could work</span>
        </div>
        <div className={styles.thinkingStep}>
          <span className={styles.stepNumber}>03</span>
          <span className={styles.stepText}>Ship it. Get feedback. Iterate.</span>
        </div>
        <div className={styles.thinkingStep}>
          <span className={styles.stepNumber}>04</span>
          <span className={styles.stepText}>Document what failed and why</span>
        </div>
      </div>
    </div>
  );

  const renderStack = () => (
    <div className={styles.stackOutput}>
      <div className={styles.stackHeader}>TECH I USE AND WHY</div>
      <div className={styles.stackItemRow}>
        <span className={styles.stackName}>TypeScript</span>
        <span className={styles.stackReason}>Types prevent bugs. Period.</span>
      </div>
      <div className={styles.stackItemRow}>
        <span className={styles.stackName}>Next.js</span>
        <span className={styles.stackReason}>Best DX for React. Server components are game-changing.</span>
      </div>
      <div className={styles.stackItemRow}>
        <span className={styles.stackName}>PostgreSQL</span>
        <span className={styles.stackReason}>Battle-tested. JSONB when I need flexibility.</span>
      </div>
      <div className={styles.stackItemRow}>
        <span className={styles.stackName}>Vercel</span>
        <span className={styles.stackReason}>Deploy in seconds. Focus on product, not infra.</span>
      </div>
      <div className={styles.stackItemRow}>
        <span className={styles.stackName}>Figma</span>
        <span className={styles.stackReason}>I design before I code. Always.</span>
      </div>
    </div>
  );

  const renderNow = () => (
    <div className={styles.nowOutput}>
      <div className={styles.nowHeader}>WHAT I&apos;M WORKING ON</div>
      <div className={styles.nowItem}>
        <span className={styles.nowStatus}>●</span>
        <span>Building this portfolio (yes, recursively)</span>
      </div>
      <div className={styles.nowItem}>
        <span className={styles.nowStatus}>●</span>
        <span>DólarGaucho v2 — adding historical charts</span>
      </div>
      <div className={styles.nowItem}>
        <span className={styles.nowStatus}>○</span>
        <span>Learning Rust (side project)</span>
      </div>
      <p className={styles.nowUpdate}>Last updated: December 2025</p>
    </div>
  );

  const renderContact = () => (
    <div className={styles.contactOutput}>
      <div className={styles.contactItem}>
        <span className={styles.contactLabel}>email</span>
        <span>tomas@maritano.dev</span>
      </div>
      <div className={styles.contactItem}>
        <span className={styles.contactLabel}>github</span>
        <span>github.com/tomasmaritano</span>
      </div>
      <div className={styles.contactItem}>
        <span className={styles.contactLabel}>linkedin</span>
        <span>linkedin.com/in/tomasmaritano</span>
      </div>
      <div className={styles.contactItem}>
        <span className={styles.contactLabel}>x</span>
        <span>@tomasmaritano</span>
      </div>
    </div>
  );

  // Easter eggs
  const EASTER_EGGS: Record<string, string> = {
    "sudo hire tomas": "Nice try. Email me instead → tomas@maritano.dev",
    "rm -rf /": "I appreciate the chaos energy. But no.",
    "rm -rf": "Nice try. Production is safe... this time.",
    "vim": "I use VSCode. Fight me.",
    "emacs": "I use VSCode. Fight me.",
    "neovim": "Respect. But I still use VSCode.",
    "nano": "Finally, a person of culture.",
    "exit": "You can't escape. Press ESC or click outside.",
    "quit": "You can't escape. Press ESC or click outside.",
    ":q": "This isn't vim. You're free now.",
    ":q!": "This isn't vim. You're safe here.",
    ":wq": "Nothing to save. But I appreciate the instinct.",
    "sudo": "Permission denied. I don't know you that well yet.",
    "su": "Who do you think you are?",
    "ping": "PONG!",
    "ping google.com": "64 bytes from opportunity: time=0ms",
    "hello": "Hey! Type 'help' to explore.",
    "hi": "Hey! Type 'help' to explore.",
    "hola": "¡Hola! Escribí 'help' para explorar.",
    "hey": "What's up? Type 'help' to get started.",
    "ls": "about/  projects/  decisions/  mistakes/  contact.txt",
    "ls -la": ".secret  .config  .env  about/  projects/  decisions/",
    "ls -l": "drwxr-xr-x  about/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  decisions/",
    "cat .secret": "You found it. I once mass-deleted a production database. We had backups. Barely.",
    "cat .env": "API_KEY=nice_try_buddy\nSECRET=email_me_for_the_real_ones",
    "cat .config": "theme=whatever_you_prefer\neditor=vscode\ncoffee=always",
    "pwd": "/home/visitor/tomas-portfolio",
    "cd": "You're already home.",
    "cd ..": "There's nothing above this. Only stars.",
    "cd ~": "You're already home.",
    "whoami": "visitor — but you could be a collaborator. Type 'hire' to learn more.",
    "id": "uid=1000(visitor) gid=1000(curious) groups=1000(curious),100(potential-collaborator)",
    "date": new Date().toLocaleString(),
    "uptime": `Portfolio running for ${Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))} days. No downtime. Unlike my Kubernetes cluster.`,
    "echo": "echo echo echo...",
    "echo hello": "hello (that's what you wanted, right?)",
    "matrix": "Wake up, Neo... Just kidding. Type 'help' for real commands.",
    "42": "The answer to life, the universe, and everything. You get it.",
    "coffee": "Brewing... ☕ I run on coffee and deadlines.",
    "beer": "It's 5pm somewhere. But let's be professional. 🍺",
    "secret": "🎉 You found it! Here are some more: try 'sudo hire tomas', 'vim', 'cat .secret', or '42'",
    "secrets": "There are many. Keep exploring... try 'ls -la'",
    "man": "No manual. Just vibes and Stack Overflow.",
    "woman": "Also no manual. But same energy.",
    "help me": "I'm trying! Type 'help' for commands or 'contact' to reach out.",
    "please": "Such manners! Type 'help' to see what I can do.",
    "thanks": "You're welcome! Now go build something cool.",
    "thank you": "No problem! Type 'contact' if you want to chat.",
    "fuck": "Whoa! Maybe type 'hire' instead?",
    "shit": "Happens. That's why we have git.",
    "git": "status: everything is fine. (probably)",
    "git status": "nothing to commit, working tree clean (finally)",
    "git push --force": "I see you like to live dangerously.",
    "npm install": "Installing 847 packages... Just kidding. This isn't that kind of terminal.",
    "yarn": "npm gang. Sorry.",
    "pnpm": "A person of culture, I see.",
    "bun": "Fast. Like my coffee. ☕",
    "node": "v∞.∞.∞ (latest always)",
    "python": "import this → but in TypeScript please",
    "rust": "🦀 Learning it. Slowly. Very slowly.",
    "go": "func main() { fmt.Println('Hello!') }",
    "java": "public static void main... just kidding, I don't do Java.",
    "php": "We don't talk about PHP here.",
    "wordpress": "No.",
    "jquery": "What year is it?",
    "react": "❤️ My main squeeze.",
    "vue": "Respect. But React is home.",
    "angular": "We can still be friends.",
    "svelte": "Secretly jealous of its simplicity.",
    "htmx": "The return of the king?",
    "ai": "You're talking to a portfolio, not ChatGPT. But I built this with Claude!",
    "chatgpt": "Close! This was built with Claude Code. Type 'stack' to see the tech.",
    "claude": "That's what built this terminal! Type 'stack' for more details.",
    "github copilot": "Great tool. But sometimes I like to think for myself.",
    "cursor": "AI-first. I respect it.",
    "clear all": "Terminal cleared. Your secrets are safe.",
    "reset": "Life doesn't have a reset button. But 'clear' works here.",
    "reboot": "Have you tried turning it off and on again?",
    "shutdown": "This terminal never sleeps.",
    "hack": "What would you like to hack? (just kidding, please don't)",
    "bitcoin": "To the moon? 🚀 I'm more of a 'stable income' person.",
    "crypto": "HODL? More like HOLD my coffee while I ship features.",
  };

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const baseCommand = parts[0];
    const args = parts.slice(1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    // Check easter eggs first
    if (EASTER_EGGS[trimmedCmd]) {
      setHistory((prev) => [...prev, { command: cmd, output: EASTER_EGGS[trimmedCmd] }]);
      return;
    }

    // Handle commands
    let output: string | React.ReactNode;

    switch (baseCommand) {
      case "help":
        output = renderHelp();
        break;
      case "projects":
        output = renderProjects();
        break;
      case "project":
        if (args.length === 0) {
          output = "Usage: project <name> [--mistakes|--tech]\nExample: project dolargaucho";
        } else {
          const projectSlug = args[0];
          const flag = args[1];
          output = renderProject(projectSlug, flag);
        }
        break;
      case "decisions":
        output = renderDecisions();
        break;
      case "mistakes":
        output = renderMistakes();
        break;
      case "hire":
        output = renderHire();
        break;
      case "thinking":
        output = renderThinking();
        break;
      case "stack":
        output = renderStack();
        break;
      case "now":
        output = renderNow();
        break;
      case "contact":
        output = renderContact();
        break;
      case "theme":
        toggleTheme();
        output = `Theme switched to ${theme === "dark" ? "light" : "dark"} mode ✨`;
        break;
      case "dark":
        if (theme !== "dark") toggleTheme();
        output = "Dark mode activated. 🌙";
        break;
      case "light":
        if (theme !== "light") toggleTheme();
        output = "Light mode activated. ☀️";
        break;
      case "":
        setHistory((prev) => [...prev, { command: "", output: "" }]);
        return;
      default:
        output = `Command not found: ${baseCommand}. Type 'help' for available commands.`;
        setHistory((prev) => [...prev, { command: cmd, output, isError: true }]);
        return;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["help", "projects", "project", "decisions", "mistakes", "hire", "thinking", "stack", "now", "contact", "theme", "dark", "light", "clear", "secret"];
      const matches = commands.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle terminal"
      >
        <span className={styles.toggleIcon}>{isOpen ? "×" : ">"}_</span>
      </button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.dots}>
                <span className={styles.dot} data-color="red" onClick={() => setIsOpen(false)} />
                <span className={styles.dot} data-color="yellow" />
                <span className={styles.dot} data-color="green" />
              </div>
              <span className={styles.title}>visitor@tomas ~ terminal</span>
              <div className={styles.headerSpacer} />
            </div>

            {/* Output */}
            <div className={styles.output} ref={outputRef} onClick={() => inputRef.current?.focus()}>
              {history.map((item, i) => (
                <div key={i} className={styles.outputItem}>
                  {item.command && (
                    <div className={styles.commandLine}>
                      <span className={styles.prompt}>visitor</span>
                      <span className={styles.promptSeparator}>@</span>
                      <span className={styles.promptPath}>tomas</span>
                      <span className={styles.promptSymbol}>:~$</span>
                      <span className={styles.commandText}>{item.command}</span>
                    </div>
                  )}
                  <div className={`${styles.outputText} ${item.isError ? styles.error : ""}`}>
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Input Line */}
              <div className={styles.inputLine}>
                <span className={styles.prompt}>visitor</span>
                <span className={styles.promptSeparator}>@</span>
                <span className={styles.promptPath}>tomas</span>
                <span className={styles.promptSymbol}>:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
