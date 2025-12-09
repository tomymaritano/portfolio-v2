import { allProjects, allPosts } from "content-collections";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { BlogSection } from "@/components/BlogSection";
import { Testimonials } from "@/components/Testimonials";
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
      <About />
      <Projects projects={projects} />
      <Experience />
      <Testimonials />
      <BlogSection posts={posts} />
      <Contact />
    </main>
  );
}
