"use client";

import { motion, type Variants } from "framer-motion";
import styles from "./Experience.module.css";
import experienceData from "../content/experience.json";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const jobVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.2, ease: "easeOut" }
  },
};

const highlightsContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
};

const highlightVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <motion.h2
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerVariants}
        >
          Experience
        </motion.h2>

        <div className={styles.timeline}>
          {experienceData.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.period}`}
              className={styles.job}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={jobVariants}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.timelineMarker}>
                <motion.div className={styles.dot} variants={dotVariants} />
                {index < experienceData.length - 1 && (
                  <motion.div className={styles.line} variants={lineVariants} style={{ originY: 0 }} />
                )}
              </div>

              <div className={styles.jobContent}>
                <div className={styles.jobHeader}>
                  <h3 className={styles.company}>{job.company}</h3>
                  <span className={styles.period}>{job.period}</span>
                </div>

                <div className={styles.jobMeta}>
                  <span className={styles.role}>{job.role}</span>
                  <span className={styles.separator}>·</span>
                  <span className={styles.location}>{job.location}</span>
                  {job.type === "freelance" && (
                    <>
                      <span className={styles.separator}>·</span>
                      <span className={styles.type}>Freelance</span>
                    </>
                  )}
                </div>

                <motion.ul className={styles.highlights} variants={highlightsContainerVariants}>
                  {job.highlights.map((highlight, hIndex) => (
                    <motion.li key={hIndex} className={styles.highlight} variants={highlightVariants}>
                      {highlight}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
