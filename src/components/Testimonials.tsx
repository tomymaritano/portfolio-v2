"use client";

import { motion, type Variants } from "framer-motion";
import testimonialsData from "@/content/testimonials.json";
import styles from "./Testimonials.module.css";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

const testimonials: Testimonial[] = testimonialsData;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const testimonialVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -60,
    y: 30,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  },
};

export function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerVariants}
        >
          What others say
        </motion.span>

        <div className={styles.testimonials}>
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              className={styles.testimonial}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={testimonialVariants}
              transition={{ delay: index * 0.08 }}
            >
              <span className={styles.quoteIcon}>"</span>
              <p className={styles.quote}>{testimonial.quote}</p>
              <footer className={styles.footer}>
                <cite className={styles.author}>{testimonial.author}</cite>
                <span className={styles.meta}>
                  {testimonial.role}
                  {testimonial.company && ` · ${testimonial.company}`}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
