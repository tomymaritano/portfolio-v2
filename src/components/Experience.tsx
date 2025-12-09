"use client";

import { motion } from "framer-motion";
import styles from "./Experience.module.css";
import experienceData from "../content/experience.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.span className={styles.label} variants={itemVariants}>
          Experience
        </motion.span>

        <div className={styles.timeline}>
          {experienceData.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.period}`}
              className={styles.job}
              variants={itemVariants}
            >
              <div className={styles.timelineMarker}>
                <div className={styles.dot} />
                {index < experienceData.length - 1 && (
                  <div className={styles.line} />
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

                <ul className={styles.highlights}>
                  {job.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className={styles.highlight}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
