export interface Members {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  links?: {
    github?: string;
    linkedin?: string;
    email?: string;
    portfolio?: string;
  };
}

export const teamService = {
  getTeam: (): Members[] => [
    {
      name: "alizay Ayesha",
      role: "Founder & CEO",
      image: "/team/alizay.jpg",
      bio: "Leading the development of Artificial Super intelligenceence SaaS solutions.",
      skills: ["Leadership", "Strategy", "AI/ML"],
      links: {
        email: "alizayyousfzai@gmail.com",
      },
    },
  ],

  getDesignTeam: (): Members[] => [
    {
      name: "alizay",
      role: "UI/UX Designer",
      image: "/team/mahek.jpg",
      bio: "Crafting beautiful digital experiences",
      skills: ["UI/UX", "Design Systems", "Visual Design"],
      links: {},
    },
  ],

  getDevelopmentTeam: (): Members[] => [],
  getContentTeam: (): Members[] => [],
};
