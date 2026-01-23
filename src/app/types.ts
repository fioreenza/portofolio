export type NavItem = "about" | "projects";

export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  link?: string;
}
