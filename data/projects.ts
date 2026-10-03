import type { EvidenceStatus } from "./profile";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  status: EvidenceStatus;
  context: string;
  summary: string;
  stack: readonly string[];
  repo: string;
  problem: string;
  architecture: readonly string[];
  contributions: readonly string[];
  limitations: readonly string[];
  improvements: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: "mediconnect",
    title: "MediConnect",
    eyebrow: "COLLEGE MAJOR PROJECT",
    status: "project",
    context: "Full-stack healthcare-record prototype inspired by India's UHI concept.",
    summary:
      "A MERN application exploring a centralized patient-record workflow with MongoDB metadata and Google Drive file storage.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Google Drive API"],
    repo: "https://github.com/kushagrapandey-cmd/mediconnect",
    problem:
      "The project explores how patients and providers could access medical-record information through a shared application rather than keeping records fragmented across separate local workflows.",
    architecture: [
      "React client",
      "Express REST API",
      "MongoDB / Mongoose metadata",
      "Google Drive file storage",
    ],
    contributions: [
      "Registration and login flows with a generated patient code.",
      "Patient medical-document upload and retrieval flow.",
      "Doctor-side record lookup using the patient code.",
      "Frontend and backend application structure in a single repository.",
    ],
    limitations: [
      "The repository does not directly integrate with an external UHI API.",
      "The current authentication implementation is not production-grade and requires password hashing plus stronger authorization.",
      "No public production deployment is documented.",
      "Automated test coverage is not documented in the repository.",
    ],
    improvements: [
      "Replace custom credential handling with secure authentication and role-based authorization.",
      "Add automated tests and production environment configuration.",
      "Deploy a sanitized demonstration environment before treating the project as production-ready.",
    ],
  },
  {
    slug: "riverflow",
    title: "Riverflow",
    eyebrow: "PERSONAL LEARNING PROJECT",
    status: "project",
    context: "A StackOverflow-style application used to learn modern Next.js and managed backend patterns.",
    summary:
      "A Next.js application using Appwrite and Zustand, with authentication and voting flows documented in the repository.",
    stack: ["Next.js", "TypeScript", "Appwrite", "Zustand", "Tailwind CSS"],
    repo: "https://github.com/kushagrapandey-cmd/stackoverflow-clone",
    problem:
      "The project was created as a learning environment for modern React/Next.js patterns, backend-as-a-service integration and predictable client-side state.",
    architecture: [
      "Next.js App Router",
      "Server and client components",
      "Zustand auth state",
      "Appwrite authentication, database and storage",
    ],
    contributions: [
      "Registration, login and persisted session handling.",
      "Upvote and downvote API logic with author-reputation updates.",
      "Development-time database and storage bootstrap logic.",
      "Documented hydration and routing issues encountered during development.",
    ],
    limitations: [
      "The repository is presented as a learning project rather than a production service.",
      "No public production deployment is documented.",
      "The repository is a learning snapshot rather than a continuously maintained product.",
    ],
    improvements: [
      "Add a documented deployment pipeline and environment strategy.",
      "Expand automated tests around authentication and voting flows.",
      "Add observability before treating the application as production-ready.",
    ],
  },
  {
    slug: "ytguide",
    title: "YTGuide",
    eyebrow: "ACADEMIC TEAM PROJECT",
    status: "project",
    context: "A recommendation-system prototype for selecting YouTube study videos by topic.",
    summary:
      "A Python and Streamlit project that ranks similar video entries and presents five recommended study links for a selected topic.",
    stack: ["Python", "Streamlit", "Pandas", "Recommendation logic"],
    repo: "https://github.com/kushagrapandey-cmd/First_ML_project",
    problem:
      "The project attempts to reduce distraction when searching for study content by presenting a short list of recommendations for a selected topic.",
    architecture: [
      "Prepared video dataset",
      "Similarity matrix",
      "Python recommendation function",
      "Streamlit interface",
    ],
    contributions: [
      "The repository contains the recommendation application, notebooks and serialized data used by the prototype.",
      "The source code identifies the work as a team academic project.",
      "The public repository does not document the exact division of responsibilities among team members.",
    ],
    limitations: [
      "The repository README contains almost no project documentation.",
      "No repository-backed analytics or evaluation metrics are documented.",
      "The codebase reflects an academic prototype rather than a maintained production recommendation service.",
    ],
    improvements: [
      "Document dataset creation, evaluation method and team responsibilities.",
      "Add reproducible setup instructions and tests.",
      "Replace serialized local artifacts with a clearer data pipeline if the project is revisited.",
    ],
  },
] as const;

export const linuxLearning = {
  title: "Linux Learning Tracker",
  eyebrow: "ACTIVE LEARNING",
  status: "learning" as EvidenceStatus,
  summary:
    "A public learning tracker used to organize Linux command-line, permissions, process, monitoring, shell and networking topics.",
  repo: "https://github.com/kushagrapandey-cmd/Devops-Learning",
  evidence: [
    "Repository created in August 2026 as a syllabus and progress tracker.",
    "Current public content is primarily a structured README rather than a finished infrastructure project.",
    "The repository explicitly records Linux as an active learning journey.",
  ],
  topics: [
    "Filesystem and command-line foundations",
    "Users, permissions and ownership",
    "Processes and system monitoring",
    "Networking and package management",
    "Shell scripting foundations",
  ],
} as const;
