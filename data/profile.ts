export type EvidenceStatus =
  | "professional"
  | "certified"
  | "project"
  | "learning"
  | "planned";

export const profile = {
  name: "Kushagra Pandey",
  shortName: "KP",
  headline: "Infrastructure Support Professional",
  direction: "Building toward Azure Cloud & DevOps Engineering",
  summary:
    "Hands-on experience with L1 infrastructure monitoring, Windows Server troubleshooting and incident handling, supported by a software-engineering foundation and Microsoft Azure certifications.",
  github: "https://github.com/kushagrapandey-cmd",
  linkedin: "https://www.linkedin.com/in/kushagra-pandey-353b71175",
} as const;

export const experience = [
  {
    company: "HCLTech",
    context: "Infrastructure / L1 Operations",
    period: "Dec 2024 – Present",
    label: "L1 infrastructure monitoring and troubleshooting",
    responsibilities: [
      "Performed L1-level troubleshooting on Windows Servers, including basic diagnostics, service restarts and log analysis.",
      "Monitored data-center operations and reported anomalies in server performance and network connectivity.",
      "Conducted routine health checks on physical and virtual servers.",
      "Used AWS and Azure portals for basic monitoring, including resource usage, logs and service-status checks.",
      "Logged and escalated incidents through internal ticketing systems.",
      "Participated in shift-based monitoring of infrastructure components.",
    ],
  },
] as const;

export const certifications = [
  {
    code: "AZ-104",
    name: "Microsoft Azure Administrator",
    status: "certified" as EvidenceStatus,
    note: "Azure administration credential supporting the current move toward cloud infrastructure work.",
  },
  {
    code: "AZ-900",
    name: "Microsoft Azure Fundamentals",
    status: "certified" as EvidenceStatus,
    note: "Foundational Azure credential supporting core cloud concepts and services.",
  },
] as const;

export const focusAreas = {
  professional: [
    "Windows Server troubleshooting",
    "Infrastructure monitoring",
    "Incident logging & escalation",
    "Azure / AWS portal monitoring",
  ],
  certified: ["AZ-104", "AZ-900"],
  learning: [
    "Linux administration",
    "Networking fundamentals",
    "Azure administration practice",
    "Shell & automation foundations",
    "DevOps foundations",
  ],
} as const;

export const softwareFoundation = [
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Next.js",
  "TypeScript",
  "Git",
] as const;

export const careerJourney = [
  {
    title: "Software Development",
    status: "project" as EvidenceStatus,
    detail: "Academic and personal full-stack development projects.",
  },
  {
    title: "Enterprise Infrastructure",
    status: "professional" as EvidenceStatus,
    detail: "L1 monitoring, Windows Server troubleshooting and incident handling at HCLTech.",
  },
  {
    title: "Azure",
    status: "certified" as EvidenceStatus,
    detail: "AZ-900 and AZ-104 certifications, with basic Azure portal monitoring exposure at work.",
  },
  {
    title: "Linux + Networking",
    status: "learning" as EvidenceStatus,
    detail: "Current learning direction documented through a Linux learning repository.",
  },
  {
    title: "Cloud / DevOps Engineering",
    status: "planned" as EvidenceStatus,
    detail: "Career direction, supported by ongoing infrastructure, Linux, networking and automation learning.",
  },
] as const;

export const education = [
  {
    qualification: "Bachelor of Technology, Computer Science",
    institution: "Axis Institute of Technology",
    period: "2020 – 2024",
  },
  {
    qualification: "Intermediate",
    institution: "K.R. Education Center",
    period: "2017 – 2018",
  },
] as const;

export const internship = {
  title: "Full-stack Web Development",
  organization: "Bharat Intern",
  period: "July 2023 – August 2023",
  details: [
    "Developed internship web projects using React and a MongoDB-backed backend.",
    "Worked with user authentication and responsive web interfaces.",
  ],
} as const;
