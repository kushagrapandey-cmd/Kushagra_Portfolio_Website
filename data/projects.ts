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
  live?: string;
  screenshot?: string;
  screenshotAlt?: string;
  demoLabel?: string;
  problem: string;
  architecture: readonly string[];
  contributions: readonly string[];
  limitations: readonly string[];
  improvements: readonly string[];
};

export const projects: readonly Project[] = [
  {
    "slug": "cloudops-sentinel",
    "title": "CloudOps Sentinel",
    "eyebrow": "FEATURED / CLOUD & OPERATIONS",
    "status": "project",
    "context": "Linux diagnostics, Kubernetes recovery and a command-driven VM workbench.",
    "summary": "An operations toolkit pairing real Python/Bash diagnostics and container recovery drills with an interactive browser incident simulator.",
    "stack": [
      "Linux",
      "Bash",
      "Python",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Azure CLI"
    ],
    "repo": "https://github.com/kushagrapandey-cmd/Devops-Learning/tree/main/projects/cloudops-sentinel",
    "live": "https://cloudops-sentinel-three.vercel.app/",
    "screenshot": "/images/projects/cloudops-sentinel.webp",
    "screenshotAlt": "CloudOps Sentinel live demo interface",
    "problem": "Turn an unhealthy service into an explainable investigation: collect evidence, isolate the fault, recover and verify the outcome.",
    "architecture": [
      "Linux host checks + triage scripts",
      "Python health / readiness API",
      "Non-root Docker container",
      "Kubernetes Deployment + ClusterIP",
      "GitHub Actions + kind recovery drills"
    ],
    "contributions": [
      "Four browser incidents: readiness failure, broken image, memory limit and Service selector mismatch.",
      "Practice terminal, saved local progress and downloadable incident reports.",
      "Linux VM workbench: typed commands for systemd service recovery, wrong-port faults, networking and patch maintenance.",
      "Real Ubuntu systemd installation, inspection, configuration backup/restore and guarded patch scripts.",
      "Two replicas, resource limits, probes, read-only root filesystem and explicit rollback drills.",
      "Optional ACR/AKS scripts and Azure VM Bicep templates; documented runbooks and verification evidence."
    ],
    "limitations": [
      "Browser metrics and terminals are simulations; they do not connect to Azure or a live cluster.",
      "Kubernetes validation runs on kind. Azure AKS and VM deployment are not claimed.",
      "Portfolio lab with AI-assisted implementation; no production monitoring, historical metrics or high-availability claim."
    ],
    "improvements": [
      "Reproduce and document an isolated Azure deployment.",
      "Extend monitoring with historical metrics and alerting after validating the core recovery workflows."
    ]
  },
  {
    "slug": "mediconnect",
    "title": "MediConnect",
    "eyebrow": "FULL-STACK / HEALTHCARE SHOWCASE",
    "status": "project",
    "context": "Patient-controlled records and time-limited doctor access.",
    "summary": "A deployed React and Express application with PostgreSQL, secure sessions, scoped record sharing and India nearby-care discovery.",
    "stack": [
      "React",
      "Express",
      "Neon PostgreSQL",
      "Vercel",
      "Leaflet"
    ],
    "repo": "https://github.com/kushagrapandey-cmd/mediconnect",
    "live": "https://mediconnect-psi-sand.vercel.app/",
    "screenshot": "/images/projects/mediconnect.webp",
    "screenshotAlt": "MediConnect live demo interface",
    "problem": "Keep patient documents organized while requiring explicit permission before a doctor can access selected records.",
    "architecture": [
      "React + Vite client",
      "Express API on Vercel",
      "Server-side session + authorization",
      "Neon PostgreSQL records and grants",
      "Bundled OSM nearby-care dataset"
    ],
    "contributions": [
      "Record upload, preview, download, filtering and activity history.",
      "Patient approval selects individual documents and an expiry; revocation is checked on every subsequent access.",
      "Salted password hashing, HttpOnly sessions, recovery keys and session management.",
      "India locality search, radius filters and an opt-in interactive nearby-care map."
    ],
    "limitations": [
      "Academic team showcase: synthetic data only; doctor roles are self-declared.",
      "No UHI/ABDM integration or clinical certification. Nearby facilities are community mappings, not verified emergency availability.",
      "Small files are stored in PostgreSQL; account email delivery is not configured."
    ],
    "improvements": [
      "Move larger files to private object storage.",
      "Add verified practitioner and account lifecycle workflows before considering broader use."
    ]
  },
  {
    "slug": "ytguide",
    "title": "YTGuide",
    "eyebrow": "PYTHON / SEMANTIC SEARCH",
    "status": "project",
    "context": "A focused video-learning workspace with account-synced study tools.",
    "summary": "Live YouTube retrieval and multilingual semantic ranking, backed by a Python API, managed authentication and PostgreSQL study progress.",
    "stack": [
      "Python",
      "ONNX / MiniLM",
      "JavaScript",
      "Node.js",
      "Neon Auth",
      "PostgreSQL"
    ],
    "repo": "https://github.com/kushagrapandey-cmd/First_ML_project",
    "live": "https://ytguide-five.vercel.app/",
    "screenshot": "/images/projects/ytguide.webp",
    "screenshotAlt": "YTGuide live demo interface",
    "problem": "Find relevant lessons for a specific study goal, then keep notes, bookmarks and progress in one focused workspace.",
    "architecture": [
      "Goal + language + duration",
      "YouTube API / labelled catalogue",
      "Python MiniLM + TF-IDF ranking",
      "Node authenticated workspace API",
      "Neon Auth + PostgreSQL"
    ],
    "contributions": [
      "Live retrieval with shared cache and quota budgets; URL-persisted search context.",
      "Pretrained multilingual MiniLM embeddings combined with TF-IDF and channel diversity.",
      "Saved lessons, notes, collections, timestamp bookmarks and resume positions sync for signed-in users.",
      "Versioned note conflicts, pending-write status, JSON backup, focus timer and theme controls."
    ],
    "limitations": [
      "Uses pretrained weights; no claim of training a neural model or evaluating teaching quality.",
      "Provider quotas and video playback restrictions apply. Catalogue fallback is explicitly labelled.",
      "Modern implementation is AI-assisted; email recovery and second-device walkthrough need separate checks."
    ],
    "improvements": [
      "Broaden relevance evaluation beyond the small development query set.",
      "Complete account lifecycle and wider cross-device reliability checks."
    ]
  },
  {
    "slug": "www-of-anime",
    "title": "WWW-of-Anime",
    "eyebrow": "FULL-STACK / INTERACTIVE WEB",
    "status": "project",
    "context": "Three worlds. One playground.",
    "summary": "An anime fan platform with private turn-based battles, character comparisons, quizzes and account-synced progression.",
    "stack": [
      "React",
      "Vite",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel"
    ],
    "repo": "https://github.com/kushagrapandey-cmd/WWW-of-Anime",
    "live": "https://www-of-anime.vercel.app/",
    "screenshot": "/images/projects/www-of-anime.webp",
    "screenshotAlt": "WWW-of-Anime live demo interface",
    "problem": "Bring character discovery, games and persistent player progress into a coherent application across three anime worlds.",
    "architecture": [
      "React + Vite interface",
      "Same-origin Node API",
      "Server-owned game rules",
      "PostgreSQL transactions + sessions"
    ],
    "contributions": [
      "Five-fighter CPU and private friend battles, hidden lineups and replayable outcomes.",
      "Searchable character portraits, form comparisons, quizzes and three guessing games.",
      "Server-calculated scores, saved profiles, achievements and display-only reward coins.",
      "HttpOnly sessions, transactional updates and adaptive polling for match progress."
    ],
    "limitations": [
      "Unofficial fan project in public beta; game ratings are authored estimates.",
      "Turn-based updates use polling, with expected synchronization latency.",
      "AI-assisted implementation; email recovery and further production operations work remain pending."
    ],
    "improvements": [
      "Expand accessibility and compatibility coverage.",
      "Improve account recovery, operational monitoring and backup procedures."
    ]
  }
,

];

export const linuxLearning = {
 title: "Cloud & Linux Engineering Lab",
 eyebrow: "HANDS-ON FOUNDATIONS",
 status: "project" as EvidenceStatus,
 summary: "Working Linux diagnostics, Bash/Python automation, containerized health APIs and Kubernetes recovery exercises. These foundations now support a deeper learning path in Azure infrastructure and platform operations.",
 repo: "https://github.com/kushagrapandey-cmd/Devops-Learning",
 evidence: ["CloudOps Sentinel includes Python tests, shell checks and GitHub Actions workflows.", "The kind lab exercises readiness recovery, pod replacement and failed-release rollback.", "Azure scripts and templates are included; a live Azure deployment is not claimed."],
 topics: ["Linux services & networking", "Bash / Python automation", "Docker containers", "Kubernetes recovery", "GitHub Actions", "Next: deeper Azure operations & infrastructure as code"],
} as const;

// Retained only for existing case-study links; excluded from every showcase.
export const archivedRiverflow: Project = {
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
  };
