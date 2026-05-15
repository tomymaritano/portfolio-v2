import type { Metadata } from "next";
import { allProjects } from "content-collections";
import { PageHeader } from "@/components/PageHeader";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, shipped, and experimented with.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <PageHeader
        title="Projects"
        subtitle="Things I've built, shipped, and experimented with."
      />
      <ProjectsClient projects={allProjects} />
    </main>
  );
}
