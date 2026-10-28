import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { archivedRiverflow } from "@/data/projects";

export const metadata: Metadata = { title: "Riverflow Case Study" };

export default function RiverflowPage() {
  return <CaseStudyLayout project={archivedRiverflow} />;
}
