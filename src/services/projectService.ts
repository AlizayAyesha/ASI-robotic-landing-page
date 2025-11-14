import { Project, FeaturedProject } from "@/types/project";

export const getAllProjects = (): Project[] => [
  {
    title: "NeuroCore Platform",
    description:
      "Our flagship superintelligent operating system that demonstrates emergent cognitive capabilities and recursive self-improvement.",
    tech: ["Advanced Neural Networks", "Cognitive Computing", "Recursive AI", "Self-Improvement Algorithms", "Emergent Intelligence"],
    status: "Completed",
    github: "https://github.com/artificial-superintelligence/neurocore",
    demo: "https://neurocore.ai",
  },
  {
    title: "QuantumMind Analytics",
    description:
      "A predictive cognition engine that processes complex multi-dimensional data streams to forecast market movements and strategic opportunities with unprecedented accuracy.",
    tech: ["Quantum Computing", "Predictive Cognition", "Multi-dimensional Data Processing", "Market Forecasting", "Strategic Intelligence"],
    status: "In Progress",
    github: "https://github.com/artificial-superintelligence/quantummind",
  },
  {
    title: "AutoGenesis Framework",
    description:
      "Self-designing SaaS infrastructure that autonomously architects and optimizes digital ecosystems based on real-time organizational intelligence.",
    tech: ["Autonomous Architecture", "Self-Designing Systems", "Real-time Intelligence", "Digital Ecosystems", "Adaptive Optimization"],
    status: "Planned",
    github: "https://github.com/artificial-superintelligence/autogenesis",
  },
  {
    title: "Synaptic Network",
    description:
      "A decentralized superintelligence mesh that enables seamless knowledge transfer and collaborative problem-solving across distributed AI agents.",
    tech: ["Decentralized Superintelligence", "Knowledge Transfer", "Distributed AI Agents", "Collaborative Problem-Solving", "Neural Mesh"],
    status: "Planned",
    github: "https://github.com/artificial-superintelligence/synaptic",
  },
  {
    title: "ChronoLogic Scheduler",
    description:
      "Temporal optimization system that models and orchestrates complex workflows across multiple time horizons simultaneously.",
    tech: ["Temporal Optimization", "Multi-horizon Modeling", "Workflow Orchestration", "Time-based Intelligence", "Complex Systems"],
    status: "Planned",
    github: "https://github.com/artificial-superintelligence/chronologic",
  },
  {
    title: "OmniVision Insights",
    description:
      "Multi-perspective analytical engine that synthesizes disparate data sources into unified cognitive understanding.",
    tech: ["Multi-perspective Analytics", "Data Synthesis", "Unified Cognition", "Disparate Data Integration", "Cognitive Understanding"],
    status: "Planned",
    github: "https://github.com/artificial-superintelligence/omnivision",
  },
  {
    title: "Sentient CloudOps",
    description:
      "Autonomous infrastructure management system with self-healing, self-scaling, and self-securing capabilities powered by adaptive intelligence.",
    tech: ["Autonomous Infrastructure", "Self-Healing Systems", "Self-Scaling", "Self-Securing", "Adaptive Intelligence"],
    status: "Planned",
    github: "https://github.com/artificial-superintelligence/sentient-cloudops",
  },
];

export const getFeaturedProjects = (): FeaturedProject[] => [
  {
    title: "Project Matrix",
    description: "A revolutionary AI-powered code analysis tool",
    image: "/projects/matrix.jpg",
    link: "/projects/matrix",
  },
  {
    title: "Neural Net",
    description: "Deep learning framework for edge computing",
    image: "/projects/neural.jpg",
    link: "/projects/neural",
  },
  {
    title: "Quantum OS",
    description: "Next-gen operating system prototype",
    image: "/projects/quantum.jpg",
    link: "/projects/quantum",
  },
];
