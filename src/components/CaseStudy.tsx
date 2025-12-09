"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./CaseStudy.module.css";

interface Metric {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface CaseStudySection {
  id: string;
  badge: string;
  title: string;
  content: string;
  metrics?: Metric[];
  visual?: "chart" | "architecture" | "timeline" | "code";
}

const sections: CaseStudySection[] = [
  {
    id: "problem",
    badge: "The Problem",
    title: "Unreliable data in a volatile market",
    content:
      "Argentina has multiple dollar exchange rates. Official sources are unreliable. APIs fail constantly. Users need real-time data they can trust — but every source has issues: delayed updates, incorrect values during volatility, downtime during market hours.",
    metrics: [
      { value: "5+", label: "Unreliable APIs", suffix: "sources" },
      { value: "2h", label: "Average delay" },
      { value: "40%", label: "Error rate during peaks" },
    ],
    visual: "chart",
  },
  {
    id: "approach",
    badge: "The Approach",
    title: "Aggregate, validate, communicate uncertainty",
    content:
      "Instead of trusting any single source, I built a system that cross-references multiple APIs, detects anomalies, falls back gracefully, and shows confidence levels instead of false precision.",
    visual: "architecture",
  },
  {
    id: "solution",
    badge: "The Solution",
    title: "A trust layer for financial data",
    content:
      "The final architecture aggregates 5+ sources, weights them by historical reliability, flags outliers, and displays freshness indicators. Users see not just the rate, but how confident we are in it.",
    metrics: [
      { value: "30s", label: "Update frequency" },
      { value: "99.2%", label: "Uptime" },
      { value: "15K", label: "Daily users", suffix: "+" },
    ],
    visual: "timeline",
  },
  {
    id: "learnings",
    badge: "Key Learnings",
    title: "What failed & what I'd change",
    content:
      "More sources ≠ better accuracy. Users want trust, not precision. I learned to weight sources by reliability and build confidence displays from day one. Today I'd start with fewer, higher-quality sources.",
    visual: "code",
  },
];

function ChartVisual() {
  return (
    <svg viewBox="0 0 300 150" className={styles.visual}>
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="40"
          y1={20 + i * 25}
          x2="290"
          y2={20 + i * 25}
          stroke="var(--border)"
          strokeDasharray="4,4"
        />
      ))}
      {/* Area */}
      <motion.path
        d="M40 100 L80 85 L120 90 L160 60 L200 70 L240 45 L280 55 L280 120 L40 120 Z"
        fill="url(#chartGradient)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* Line */}
      <motion.path
        d="M40 100 L80 85 L120 90 L160 60 L200 70 L240 45 L280 55"
        stroke="var(--accent)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Dots */}
      {[[40, 100], [80, 85], [120, 90], [160, 60], [200, 70], [240, 45], [280, 55]].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}
      {/* Labels */}
      <text x="40" y="140" className={styles.chartLabel}>Jan</text>
      <text x="160" y="140" className={styles.chartLabel}>Jun</text>
      <text x="280" y="140" className={styles.chartLabel}>Dec</text>
    </svg>
  );
}

function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 300 180" className={styles.visual}>
      {/* Sources */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <motion.rect
            x={20}
            y={20 + i * 30}
            width="60"
            height="22"
            rx="4"
            fill="var(--surface)"
            stroke="var(--border)"
            initial={{ x: -80 }}
            whileInView={{ x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
          <motion.text
            x={50}
            y={35 + i * 30}
            className={styles.archLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            API {i + 1}
          </motion.text>
        </g>
      ))}
      {/* Aggregator */}
      <motion.rect
        x="120"
        y="50"
        width="70"
        height="80"
        rx="8"
        fill="var(--accent-muted)"
        stroke="var(--accent)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      <motion.text
        x="155"
        y="85"
        className={styles.archLabelAccent}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Aggregator
      </motion.text>
      <motion.text
        x="155"
        y="102"
        className={styles.archSublabel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        + Validator
      </motion.text>
      {/* Arrows to aggregator */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1="80"
          y1={31 + i * 30}
          x2="120"
          y2="90"
          stroke="var(--border)"
          strokeDasharray="4,4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ delay: 0.3 + i * 0.05 }}
        />
      ))}
      {/* Output */}
      <motion.rect
        x="220"
        y="65"
        width="60"
        height="50"
        rx="8"
        fill="var(--surface)"
        stroke="var(--cyan)"
        initial={{ x: 80 }}
        whileInView={{ x: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      />
      <motion.text
        x="250"
        y="88"
        className={styles.archLabel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Trusted
      </motion.text>
      <motion.text
        x="250"
        y="103"
        className={styles.archLabel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Output
      </motion.text>
      {/* Arrow to output */}
      <motion.line
        x1="190"
        y1="90"
        x2="220"
        y2="90"
        stroke="var(--accent)"
        strokeWidth="2"
        markerEnd="url(#arrow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ delay: 0.9 }}
      />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}

function TimelineVisual() {
  const items = [
    { label: "Research", weeks: "2" },
    { label: "MVP", weeks: "3" },
    { label: "Beta", weeks: "4" },
    { label: "Launch", weeks: "" },
  ];
  return (
    <div className={styles.timeline}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={styles.timelineItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <div className={styles.timelineDot} data-active={i === items.length - 1} />
          <div className={styles.timelineContent}>
            <span className={styles.timelineLabel}>{item.label}</span>
            {item.weeks && <span className={styles.timelineWeeks}>{item.weeks}w</span>}
          </div>
          {i < items.length - 1 && <div className={styles.timelineLine} />}
        </motion.div>
      ))}
    </div>
  );
}

function CodeVisual() {
  const lines = [
    { indent: 0, text: "const validateRate = (sources) => {", color: "keyword" },
    { indent: 1, text: "const weighted = sources", color: "default" },
    { indent: 2, text: ".filter(s => s.reliability > 0.8)", color: "method" },
    { indent: 2, text: ".map(s => s.rate * s.weight);", color: "method" },
    { indent: 1, text: "", color: "default" },
    { indent: 1, text: "return {", color: "default" },
    { indent: 2, text: "rate: average(weighted),", color: "property" },
    { indent: 2, text: "confidence: calcConfidence(sources),", color: "property" },
    { indent: 2, text: "updatedAt: Date.now()", color: "property" },
    { indent: 1, text: "};", color: "default" },
    { indent: 0, text: "};", color: "keyword" },
  ];

  return (
    <div className={styles.codeBlock}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className={styles.codeLine}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <span className={styles.lineNumber}>{i + 1}</span>
          <span style={{ paddingLeft: line.indent * 16 }} data-color={line.color}>
            {line.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function Section({ section, index }: { section: CaseStudySection; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <motion.section ref={ref} className={styles.section} style={{ opacity, y }}>
      <div className={styles.sectionNumber}>0{index + 1}</div>
      <div className={styles.badge}>{section.badge}</div>
      <h2 className={styles.sectionTitle}>{section.title}</h2>
      <p className={styles.sectionContent}>{section.content}</p>

      {section.metrics && (
        <div className={styles.metrics}>
          {section.metrics.map((metric, i) => (
            <motion.div
              key={i}
              className={styles.metric}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className={styles.metricValue}>
                {metric.prefix}
                {metric.value}
                {metric.suffix}
              </span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </motion.div>
          ))}
        </div>
      )}

      {section.visual && (
        <div className={styles.visualContainer}>
          {section.visual === "chart" && <ChartVisual />}
          {section.visual === "architecture" && <ArchitectureVisual />}
          {section.visual === "timeline" && <TimelineVisual />}
          {section.visual === "code" && <CodeVisual />}
        </div>
      )}
    </motion.section>
  );
}

export function CaseStudy() {
  return (
    <div className={styles.caseStudy}>
      <div className={styles.header}>
        <motion.span
          className={styles.headerBadge}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Case Study
        </motion.span>
        <motion.h1
          className={styles.headerTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          DólarGaucho
        </motion.h1>
        <motion.p
          className={styles.headerSubtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Building trust in unreliable data
        </motion.p>
      </div>

      {sections.map((section, i) => (
        <Section key={section.id} section={section} index={i} />
      ))}
    </div>
  );
}
