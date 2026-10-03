export type EvidenceStatus =
  | "professional"
  | "certified"
  | "project"
  | "learning"
  | "planned";

export const profile = {
  name: "Kushagra Pandey",
  shortName: "KP",
  headline: "Infrastructure Support Professional | Azure Certified",
  direction: "Building toward Cloud & DevOps Engineering",
  summary:
    "HCLTech infrastructure experience across Ericsson L1.5 support and Benchmark Electronics ICC shift leadership: Linux and Windows troubleshooting, AWS/Azure portal checks, incident coordination and operational go-live support, backed by Microsoft Azure certifications and a software-development foundation.",
  github: "https://github.com/kushagrapandey-cmd",
  linkedin: "https://www.linkedin.com/in/kushagra-pandey-353b71175",
  email: "kushagrapandey102@gmail.com",
  resumePdf: "/resume/Kushagra_Pandey_Resume.pdf",
} as const;

export const experience = [
  {
    company: "HCLTech",
    project: "Benchmark Electronics",
    context: "ICC · Shift Lead",
    period: "Nov 2025 – Present",
    label: "Infrastructure monitoring, operational readiness and shift coordination",
    tools: ["SolarWinds", "Incident / ticketing workflows", "ICC technical-team groups"],
    responsibilities: [
      "Supported the project through operational go-live and early stabilization, helping establish day-to-day ICC monitoring and coordination practices.",
      "Lead shift coordination, organize coverage and handovers, and track critical alerts and pending incidents with the relevant technical teams.",
      "Created project SOPs to document monitoring, incident handling, escalation and shift-handover procedures.",
      "Created ICC communication groups to connect Windows, backup, network and storage teams and support timely incident updates and handoffs.",
      "Monitor infrastructure alerts through SolarWinds and email-driven workflows; review ticket routing, priority and incident chronology.",
      "Work with clients and customer stakeholders to understand monitoring requirements, clarify operational expectations and communicate critical-alert status.",
      "Helped organize the roster and cross-team workflows during the initial months, supporting continuous coverage and consistent operational practices.",
    ],
  },
  {
    company: "HCLTech",
    project: "Ericsson",
    context: "Rhythm Team · L1.5 Infrastructure Support",
    period: "Dec 2024 – Oct 2025",
    label: "Linux, Windows and cloud-hosted server troubleshooting",
    tools: ["BHOM portal", "AWS portal", "Azure portal", "PuTTY / SSH", "RDP", "SVM portal"],
    responsibilities: [
      "Provided L1.5 infrastructure support for Linux and Windows servers, including servers hosted in AWS and Azure environments.",
      "Performed initial diagnostics using service-status checks, CPU, memory and disk observations, connectivity checks and log review; followed approved troubleshooting procedures before escalation.",
      "Used PuTTY / SSH for Linux access and RDP for Windows access, alongside AWS and Azure portals for resource health and monitoring checks.",
      "Reviewed infrastructure events through the BHOM portal and operational queues; recorded investigation findings and coordinated escalation to specialist teams.",
      "Coordinated Multiple Failed Login (MFL) control work with two team members reporting to me for that activity, tracking follow-ups and communicating investigation status.",
      "Maintained incident updates, prioritization and shift handovers to support continuity and SLA-aware troubleshooting.",
    ],
  },
] as const;

export const certifications = [
  { code: "AZ-104", name: "Microsoft Azure Administrator", status: "certified" as EvidenceStatus, note: "Azure administration credential supporting the current move toward cloud infrastructure work." },
  { code: "AZ-900", name: "Microsoft Azure Fundamentals", status: "certified" as EvidenceStatus, note: "Foundational Azure credential supporting core cloud concepts and services." },
] as const;

export const focusAreas = {
  professional: ["Linux / Windows L1.5 support", "Infrastructure monitoring", "Shift leadership & SOPs", "Azure / AWS portal troubleshooting"],
  certified: ["AZ-104", "AZ-900"],
  learning: ["Linux administration", "Networking fundamentals", "Azure administration practice", "Shell & automation foundations", "DevOps foundations"],
} as const;

export const softwareFoundation = ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Next.js", "TypeScript", "Git"] as const;

export const careerJourney = [
  { title: "Software Development", status: "project" as EvidenceStatus, detail: "Academic and personal full-stack development projects." },
  { title: "Enterprise Infrastructure", status: "professional" as EvidenceStatus, detail: "Ericsson L1.5 infrastructure support and Benchmark Electronics ICC shift leadership at HCLTech." },
  { title: "Azure", status: "certified" as EvidenceStatus, detail: "AZ-900 and AZ-104 certifications, with basic Azure portal monitoring exposure at work." },
  { title: "Linux + Networking", status: "learning" as EvidenceStatus, detail: "Current learning direction documented in the Devops-Learning repository." },
  { title: "Cloud / DevOps Engineering", status: "planned" as EvidenceStatus, detail: "Career direction, supported by ongoing infrastructure, Linux, networking and automation learning." },
] as const;

export const education = [
  { qualification: "Bachelor of Technology, Computer Science", institution: "Axis Institute of Technology", period: "2020 – 2024" },
  { qualification: "Intermediate", institution: "K.R. Education Center", period: "2017 – 2018" },
] as const;

export const internship = {
  title: "Full-stack Web Development",
  organization: "Bharat Intern",
  period: "July 2023 – August 2023",
  details: ["Developed internship web projects using React and a MongoDB-backed backend.", "Worked with user authentication and responsive web interfaces."],
} as const;
