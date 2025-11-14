"use client";

import React, { memo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Code2,
  Cpu,
  Network,
  Braces,
  Users,
  LucideIcon,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";

import CrypticText from "@/components/CrypticText";

const AboutSection = memo(
  ({
    title,
    content,
    icon: Icon,
    index,
  }: {
    title: string;
    content: string;
    icon: LucideIcon;
    index: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[var(--matrix-color-20)] rounded-lg">
              <Icon className="w-6 h-6 text-[var(--matrix-color)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--matrix-color)] mb-2">
                {title}
              </h3>
              <p className="text-gray-300">{content}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

AboutSection.displayName = "AboutSection";

const MatrixRain = memo(() => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const chars = "AXIOMCLUBTECH10".split("");

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "var(--matrix-color)";
      context.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvas]);

  return (
    <canvas
      ref={setCanvas}
      className="fixed inset-0 pointer-events-none opacity-20"
    />
  );
});

MatrixRain.displayName = "MatrixRain";

const MatrixOverlay = memo(() => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,var(--matrix-glow-30),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,var(--matrix-color-20),transparent)]" />
  </div>
));

MatrixOverlay.displayName = "MatrixOverlay";

const About = memo(() => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Static data
  const projects: { name: string; tech: string; progress?: number }[] = [
    { name: "NeuroCore Platform", tech: "Advanced Neural Networks", progress: 100 },
    { name: "QuantumMind Analytics", tech: "Predictive Cognition", progress: 75 },
  ];
  const techStack: { category: string; techs: string[] }[] = [
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
  ];
  const activities: { date: string; event: string; details: string }[] = [
    {
      date: "2024-09-03",
      event: "Company Founded",
      details: "Artificial Super intelligenceence SaaS established with vision to advance human potential",
    },
    {
      date: "2025-02-01",
      event: "First Deployment",
      details: "Successfully deployed initial superintelligent SaaS solution for enterprise client",
    },
    {
      date: "2025-01-27",
      event: "Platform Development",
      details: "Core superintelligence platform architecture completed and tested",
    },
    {
      date: "2025-03-06",
      event: "AI Breakthrough",
      details: "Achieved major milestone in recursive self-improvement algorithms",
    },
  ];
  const events: { date: string; event: string; type: string }[] = [
    {
      date: "/* CONFIDENTIAL */",
      event: "",
      type: "",
    },
  ];
  const stats: { label: string; value: string }[] = [
    { label: "Active Members", value: "24" },
    { label: "Project Teams", value: "1" },
    { label: "Monthly Events", value: "4" },
    { label: "Total Projects", value: "15" },
  ];


  const sections = [
    {
      title: "Our Mission",
      content:
        "To advance human potential through superintelligent SaaS solutions that augment cognition, automate complex decision-making, and solve problems beyond human-scale complexity.",
      icon: Terminal,
    },
    {
      title: "Technical Focus",
      content:
        "We specialize in artificial superintelligence, cognitive computing, recursive AI algorithms, and autonomous systems that evolve beyond traditional machine learning.",
      icon: Code2,
    },
    {
      title: "Innovation Hub",
      content:
        "Our platform serves as the foundation for superintelligent innovation, providing the infrastructure and intelligence to transform industries and human capabilities.",
      icon: Cpu,
    },
    {
      title: "Enterprise Solutions",
      content:
        "We deliver enterprise-grade superintelligence solutions that integrate seamlessly with existing systems, enabling organizations to achieve unprecedented levels of automation and insight.",
      icon: Users,
    },
    {
      title: "Research & Development",
      content:
        "Our R&D focuses on advancing the frontiers of artificial superintelligence, from emergent cognitive capabilities to self-improving autonomous systems.",
      icon: Braces,
    },
    {
      title: "Global Impact",
      content:
        "Partnering with forward-thinking organizations worldwide to deploy superintelligent solutions that drive innovation, efficiency, and human advancement on a global scale.",
      icon: Network,
    },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-black font-mono">
      <MatrixOverlay />
      <MatrixRain />

      {/* Hero Section */}
      <motion.div
        style={{ opacity, scale }}
        className="relative min-h-[600px] flex items-center justify-center py-12"
      >
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block relative mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 relative z-10">
                <motion.div
                  className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex flex-wrap items-center gap-2 sm:gap-3 justify-center"
                  animate={{
                    textShadow: [
                      "0 0 20px var(--matrix-color-50)",
                      "0 0 10px var(--matrix-color-30)",
                      "0 0 20px var(--matrix-color-50)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <span className="opacity-70">[</span>
                  <CrypticText text="About" />
                  <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
                  <CrypticText text="Artificial Super intelligenceence SaaS" />
                  <span className="opacity-70">]</span>
                  <motion.span
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    className="text-[var(--matrix-color)] opacity-50"
                  >
                    _
                  </motion.span>
                </motion.div>
              </h1>
              <motion.div
                className="absolute -inset-4 bg-black/50 blur-xl -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-[var(--matrix-color-90)] mt-4 text-xs sm:text-base">
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
              <motion.div
                className="font-mono"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <span className="text-[var(--matrix-color)]">root@artificial-super-intelligence</span>
                <span>:</span>
                <span className="opacity-75">~</span>
                <span>$</span>
              </motion.div>
              <motion.span
                className="font-mono"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  overflow: "hidden",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                cat about_artificial_super_intelligence_saas.md
              </motion.span>
              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="font-mono text-[var(--matrix-color)]"
              >
                ▊
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Rest of the existing sections with updated styling */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color)] rounded-lg p-4 sm:p-6 lg:p-8 mb-16"
          >
            {/* Existing dashboard content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column - Key Metrics and Activity */}
              <div className="col-span-1 lg:col-span-8 grid grid-rows-[auto_1fr] gap-4">
                {/* Top Row - Current Projects and Tech Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Active Projects */}
                  <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                    <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Projects
                    </div>
                    <div className="space-y-4 overflow-x-auto">
                      {projects.map((project) => (
                        <div
                          key={project.name}
                          className="space-y-1 min-w-[200px]"
                        >
                          <div className="flex justify-between text-xs flex-wrap gap-1">
                            <span className="text-[var(--matrix-color)]">
                              {project.name}
                            </span>
                            <span className="text-[var(--matrix-color-90)]">
                              {project.tech}
                            </span>
                          </div>
                          <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--matrix-color)] rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                    <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                      <Braces className="w-4 h-4" />
                      Tech Stack
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                      {techStack.map((stack) => (
                        <div key={stack.category} className="space-y-1">
                          <div className="text-[var(--matrix-color-90)] text-xs">
                            {stack.category}
                          </div>
                          <div className="space-y-0.5">
                            {stack.techs.map((tech) => (
                              <div
                                key={tech}
                                className="text-xs text-[var(--matrix-color)]"
                              >
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                  <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Recent Activities
                  </div>
                  <div className="space-y-3 overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-[var(--matrix-color)] scrollbar-track-transparent">
                    {activities.map((activity) => (
                      <div
                        key={activity.date}
                        className="flex items-start gap-3 text-xs border-l-2 border-[var(--matrix-color)] pl-3"
                      >
                        <div className="text-[var(--matrix-color-90)] whitespace-nowrap">
                          {activity.date}
                        </div>
                        <div>
                          <div className="text-[var(--matrix-color)] font-medium">
                            {activity.event}
                          </div>
                          <div className="text-[var(--matrix-color-90)]">
                            {activity.details}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-1 lg:col-span-4 space-y-4">
                {/* Stats */}
                <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                  <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Stats
                  </div>
                  <div className="space-y-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex justify-between items-center flex-wrap gap-2"
                      >
                        <span className="text-[var(--matrix-color-90)] text-xs">
                          {stat.label}
                        </span>
                        <span className="text-[var(--matrix-color)] text-lg font-bold">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                  <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Upcoming
                  </div>
                  <div className="space-y-3 overflow-x-auto">
                    {events.map((event) => (
                      <div
                        key={event.date}
                        className="flex items-start gap-2 text-xs min-w-[200px]"
                      >
                        <div className="text-[var(--matrix-color)] font-medium whitespace-nowrap">
                          {event.date}
                        </div>
                        <div>
                          <div className="text-[var(--matrix-color-90)]">
                            {event.event}
                          </div>
                          <div className="text-[var(--matrix-color-90)] opacity-60">
                            {event.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                  <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Connect
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="text-[var(--matrix-color-90)] text-xs">
                      Connect with our Founder & CEO on LinkedIn
                    </div>
                    <a
                      href="https://www.linkedin.com/in/alizay-ayeshaa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[var(--matrix-color)] hover:opacity-80 break-all"
                    >
                      linkedin.com/in/alizay-ayeshaa
                    </a>
                    <div className="text-[var(--matrix-color-90)] text-xs">
                      Follow our GitHub for project updates
                    </div>
                    <a
                      href="https://github.com/AlizayAyesha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[var(--matrix-color)] hover:opacity-80 break-all"
                    >
                      github.com/AlizayAyesha
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Sections with enhanced styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {sections.map((section, index) => (
              <AboutSection key={section.title} {...section} index={index} />
            ))}
          </div>

          {/* History & Timeline Section */}
          <div className="container mx-auto px-4 py-12 sm:py-20 border-t border-[var(--matrix-color-30)]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                    Our Journey
                  </span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto px-4">
                  From humble beginnings to technological excellence
                </p>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[var(--matrix-color-30)]" />
                {[
                  {
                    year: "2024",
                    title: "Company Foundation",
                    description:
                      "Artificial Super intelligenceence SaaS was established with a vision to advance human potential through superintelligent solutions.",
                  },
                  {
                    year: "2025",
                    title: "First Enterprise Deployment",
                    description:
                      "Successfully deployed our first superintelligent SaaS solution for a Fortune 500 company, demonstrating the power of autonomous AI systems.",
                  },
                  {
                    year: "2025",
                    title: "Platform Launch",
                    description:
                      "Launched our comprehensive superintelligence platform, providing enterprises worldwide with access to cutting-edge cognitive computing capabilities.",
                  },
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8 mb-12`}
                  >
                    <div
                      className={`w-full md:w-1/2 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      } text-center md:text-left`}
                    >
                      <div className="text-[var(--matrix-color)] font-mono text-xl mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--matrix-color)] rounded-full border-4 border-black md:mt-0 mt-4" />
                    <div className="w-full md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Impact Section */}
          <div className="container mx-auto px-4 py-12 sm:py-20 border-t border-[var(--matrix-color-30)]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                    Achievements & Impact
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {[
                  {
                    number: "20+",
                    label: "Active Members",
                    description: "Passionate developers and innovators",
                  },
                  {
                    number: "2",
                    label: "Projects in progress",
                    description: "From web apps to AI solutions",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-6 sm:p-8 bg-black/30 rounded-lg border border-[var(--matrix-color-30)] hover:border-[var(--matrix-color)] transition-colors"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-[var(--matrix-color)] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg sm:text-xl text-[var(--matrix-color-90)] mb-2">
                      {stat.label}
                    </div>
                    <div className="text-gray-400">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="container mx-auto px-4 py-12 sm:py-20 border-t border-[var(--matrix-color-30)]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                    Core Values
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Lightbulb,
                    title: "Innovation",
                    description:
                      "Pushing boundaries and embracing new technologies",
                  },
                  {
                    icon: Users,
                    title: "Collaboration",
                    description: "Working together to achieve greater results",
                  },
                  {
                    icon: Target,
                    title: "Excellence",
                    description:
                      "Striving for the highest quality in everything we do",
                  },
                  {
                    icon: TrendingUp,
                    title: "Growth",
                    description: "Continuous learning and personal development",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-4 sm:p-6 hover:border-[var(--matrix-color)] transition-colors"
                  >
                    <div className="mb-4 flex justify-center">
                      <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--matrix-color)]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Join Us Section */}
          <div className="container mx-auto px-4 py-12 sm:py-20 border-t border-[var(--matrix-color-30)]">
            <div className="max-w-6xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color)] rounded-lg p-4 sm:p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                      Partner With Us
                    </span>
                  </h2>
                  <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
                    Ready to be part of something extraordinary? Join our
                    community of innovators and shape the future of technology.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                  {[
                    {
                      title: "Learn",
                      description:
                        "Access workshops, tutorials, and hands-on projects",
                    },
                    {
                      title: "Build",
                      description:
                        "Work on real projects with cutting-edge tech",
                    },
                    {
                      title: "Connect",
                      description:
                        "Network with industry professionals and peers",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-4 sm:p-6"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors relative overflow-hidden group"
                  >
                    <motion.span
                      className="relative inline-block"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      Apply Now
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="container mx-auto px-4 py-12 sm:py-20 border-t border-[var(--matrix-color-30)]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                    Resources
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    title: "Documentation",
                    description:
                      "Access our comprehensive guides and documentation",
                    link: "#",
                    showLearnMore: false,
                    status: "Coming soon",
                  },
                  {
                    title: "GitHub Repository",
                    description:
                      "Explore our open-source projects and contributions",
                    link: "#",
                    showLearnMore: false,
                    status: "Coming soon",
                  },
                  {
                    title: "Learning Path",
                    description:
                      "Follow our curated learning paths and tutorials",
                    link: "#",
                    showLearnMore: false,
                    status: "Coming soon",
                  },
                ].map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-4 sm:p-6 hover:border-[var(--matrix-color)] transition-colors h-full"
                      onClick={() =>
                        resource.showLearnMore &&
                        window.open(resource.link, "_blank")
                      }
                      style={{
                        cursor: resource.showLearnMore ? "pointer" : "default",
                      }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[var(--matrix-color)] transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base mb-4">
                        {resource.description}
                      </p>
                      <div className="text-[var(--matrix-color)] font-mono text-xs sm:text-sm">
                        {"> "}
                        {resource.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
