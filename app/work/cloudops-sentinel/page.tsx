import { CaseStudyLayout } from "@/components/case-study-layout";
import { projects } from "@/data/projects";
export const metadata = { title: "CloudOps Sentinel" };
export default function Page() { return <CaseStudyLayout project={projects.find(p => p.slug === "cloudops-sentinel")!} />; }
