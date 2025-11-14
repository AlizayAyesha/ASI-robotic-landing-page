export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  imageUrl?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  achievements?: string[];
  specialization?: string;
  joinedDate: string;
  status: "active" | "alumni" | "advisor";
}

export type TeamSection = {
  id: string;
  title: string;
  description: string;
  members: TeamMember[];
};
