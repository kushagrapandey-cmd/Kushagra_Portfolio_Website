import { CaseStudyLayout } from "@/components/case-study-layout";
import { projects } from "@/data/projects";
export const metadata = { title: "WWW-of-Anime" };
export default function Page() { return <CaseStudyLayout project={projects.find(p => p.slug === "www-of-anime")!} />; }
