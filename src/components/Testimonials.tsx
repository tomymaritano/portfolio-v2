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
        <span className={styles.label}>What others say</span>

        <div className={styles.testimonials}>
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              className={styles.testimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.span
                className={styles.quoteOpen}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                "
              </motion.span>

              <p className={styles.quote}>{testimonial.quote}</p>

              <motion.span
                className={styles.quoteClose}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                "
              </motion.span>

              <footer className={styles.footer}>
                <cite className={styles.author}>{testimonial.author}</cite>
                <span className={styles.role}>
                  {testimonial.role}
                  {testimonial.company && ` · ${testimonial.company}`}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
