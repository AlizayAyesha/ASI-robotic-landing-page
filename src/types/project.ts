export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Planning"
  | "Planned";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  github?: string;
  demo?: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  link: string;
}
