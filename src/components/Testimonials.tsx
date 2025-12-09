"use client";

import { motion } from "framer-motion";
import testimonialsData from "@/content/testimonials.json";
import styles from "./Testimonials.module.css";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

const testimonials: Testimonial[] = testimonialsData;

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={styles.linkedinIcon}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.header}>
          <span className={styles.badge}>Testimonials</span>
          <h2 className={styles.title}>What others say</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <p className={styles.quote}>"{testimonial.quote}"</p>

              <footer className={styles.footer}>
                <div className={styles.avatar}>
                  {testimonial.author.charAt(0)}
                </div>
                <div className={styles.info}>
                  <cite className={styles.author}>{testimonial.author}</cite>
                  <span className={styles.role}>
                    {testimonial.role}
                    {testimonial.company && ` · ${testimonial.company}`}
                  </span>
                </div>
                <LinkedInIcon />
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
