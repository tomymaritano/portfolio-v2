import { allProjects, allPosts } from "content-collections";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { BlogSection } from "@/components/BlogSection";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import styles from "./page.module.css";

export default function Home() {
  const projects = allProjects;
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className={styles.main}>
      <Hero />
      <div className={styles.divider} />
      <Projects projects={projects} />
      <div className={styles.divider} />
      <BlogSection posts={posts} />
      <div className={styles.divider} />
      <Experience variant="compact" />
      <div className={styles.divider} />
      <Contact />
    </main>
  );
}
