import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "YTGuide Case Study" };

export default function YTGuidePage() {
  return <CaseStudyLayout project={projects.find((project) => project.slug === "ytguide")!} />;
}
