import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "MediConnect Case Study" };

export default function MediConnectPage() {
  return <CaseStudyLayout project={projects.find((project) => project.slug === "mediconnect")!} />;
}
