import { allProjects, allPosts, allLogs } from "content-collections";
import { IdentityBlock } from "@/components/home/IdentityBlock";
import { WritingList } from "@/components/home/WritingList";
import { LogGlimpse } from "@/components/home/LogGlimpse";
import { SelectedWork } from "@/components/home/SelectedWork";

export default function Home() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
    }));

  const logs = [...allLogs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((log) => ({ date: log.date, summary: log.summary }));

  const featured = allProjects
    .filter((p) => p.featured)
    .map((p) => ({ slug: p.slug, name: p.name, tagline: p.tagline, status: p.status }));

  const projectsToShow =
    featured.length > 0
      ? featured
      : allProjects.slice(0, 4).map((p) => ({
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          status: p.status,
        }));

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <IdentityBlock />
      <WritingList posts={posts} />
      <LogGlimpse entries={logs} />
      <SelectedWork projects={projectsToShow} />
    </main>
  );
}
