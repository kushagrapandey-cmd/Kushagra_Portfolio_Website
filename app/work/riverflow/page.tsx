import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Riverflow Case Study" };

export default function RiverflowPage() {
  return <CaseStudyLayout project={projects.find((project) => project.slug === "riverflow")!} />;
}
