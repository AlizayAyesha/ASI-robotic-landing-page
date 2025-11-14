interface Project {
  name: string;
  progress: number;
  tech: string;
}

interface TechStack {
  category: string;
  techs: string[];
}

interface Activity {
  date: string;
  event: string;
  details: string;
}

interface Event {
  date: string;
  event: string;
  type: string;
}

interface ClubStat {
  label: string;
  value: string;
}

export const eventService = {
  getActiveProjects: (): Project[] => [
    {
      name: "Club Website",
      progress: 95,
      tech: "Next.js",
    },
    {
      name: "AI Task Manager",
      progress: 35,
      tech: "Next.js / Go",
    },
    /*{
      name: "Campus Events App",
      progress: 40,
      tech: "React Native",
    },*/
  ],

  getTechStack: (): TechStack[] => [
    {
      category: "Frontend",
      techs: ["React", "Next.js", "TypeScript"],
    },
    {
      category: "Backend",
      techs: ["Node.js", "Python", "Go"],
    },
    {
      category: "Database",
      techs: ["PostgreSQL", "MongoDB"],
    },
    {
      category: "DevOps",
      techs: ["Docker", "AWS"],
    },
  ],

  getRecentActivities: (): Activity[] => [
    {
      date: "2024-09-03",
      event: "Club Created",
      details: "The creation of this club",
    },
    {
      date: "2025-02-01",
      event: "Spark Quest",
      details: "Participated in a webpage devloping compititon",
    },
    {
      date: "2025-01-27",
      event: "The Website",
      details: "We started wroking on this website",
    },
    {
      date: "2025-03-06",
      event: "First Project",
      details: "Started our first open source project",
    },
  ],

  getUpcomingEvents: (): Event[] => [
    {
      date: "",
      event: "/* CONFIDENTIAL */",
      type: "",
    },
  ],

  getClubStats: (): ClubStat[] => [
    { label: "Active Members", value: "24" },
    { label: "Project Teams", value: "1" },
    { label: "Monthly Events", value: "4" },
    { label: "Total Projects", value: "15" },
  ],

  getSocialLinks: () => ({
    discord: "https://discord.gg/YebuA3HmYn",
    github: "https://github.com/axiom-svgu",
  }),
};
