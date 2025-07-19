interface AreaOfFocus {
  id: string;
  label: string;
  skills: Skill[];
  interests: Interest[];
}

interface Skill {
  id: string;
  label: string;
}

interface Interest {
  id: string;
  label: string;
}

export const areaOfFocusList: AreaOfFocus[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "tailwind", label: "Tailwind CSS" },
      { id: "figma", label: "Figma" },
      { id: "typescript", label: "TypeScript" },
    ],
    interests: [
      { id: "ui_design", label: "UI Design" },
      { id: "web_perf", label: "Web Performance" },
      { id: "open_source", label: "Open Source" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { id: "nodejs", label: "Node.js" },
      { id: "express", label: "Express.js" },
      { id: "postgres", label: "PostgreSQL" },
      { id: "redis", label: "Redis" },
      { id: "docker", label: "Docker" },
    ],
    interests: [
      { id: "system_design", label: "System Design" },
      { id: "api_design", label: "API Design" },
      { id: "devops", label: "DevOps" },
    ],
  },
  {
    id: "fullstack",
    label: "Full Stack",
    skills: [
      { id: "react", label: "React" },
      { id: "nodejs", label: "Node.js" },
      { id: "postgres", label: "PostgreSQL" },
      { id: "tailwind", label: "Tailwind CSS" },
      { id: "nextjs", label: "Next.js" },
    ],
    interests: [
      { id: "product_dev", label: "Product Development" },
      { id: "side_projects", label: "Side Projects" },
      { id: "startups", label: "Startups" },
    ],
  },
  {
    id: "ux_ui",
    label: "UX/UI",
    skills: [
      { id: "figma", label: "Figma" },
      { id: "design_tokens", label: "Design Tokens" },
      { id: "a11y", label: "Accessibility (a11y)" },
    ],
    interests: [
      { id: "design_systems", label: "Design Systems" },
      { id: "user_research", label: "User Research" },
      { id: "usability_testing", label: "Usability Testing" },
    ],
  },
  {
    id: "ml_ai",
    label: "Machine Learning / AI",
    skills: [
      { id: "python", label: "Python" },
      { id: "pytorch", label: "PyTorch" },
      { id: "tensorflow", label: "TensorFlow" },
      { id: "pandas", label: "Pandas" },
    ],
    interests: [
      { id: "ai", label: "AI" },
      { id: "data_science", label: "Data Science" },
      { id: "mlops", label: "MLOps" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      { id: "docker", label: "Docker" },
      { id: "kubernetes", label: "Kubernetes" },
      { id: "aws", label: "AWS" },
      { id: "gcp", label: "GCP" },
    ],
    interests: [
      { id: "infra_as_code", label: "Infrastructure as Code" },
      { id: "ci_cd", label: "CI/CD" },
      { id: "cloud_architecture", label: "Cloud Architecture" },
    ],
  },
  {
    id: "product",
    label: "Product Thinking",
    skills: [
      { id: "roadmapping", label: "Product Roadmapping" },
      { id: "user_journeys", label: "User Journeys" },
      { id: "metrics", label: "Product Metrics" },
    ],
    interests: [
      { id: "ux_feedback", label: "UX Feedback" },
      { id: "startup_mindset", label: "Startup Mindset" },
      { id: "customer_dev", label: "Customer Development" },
    ],
  },
];
