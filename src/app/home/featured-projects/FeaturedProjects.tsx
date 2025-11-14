"use client";

import React, { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ExternalLink,
  Github,
  Code2,
  Folder,
  MonitorPlay,
  Bot,
  Shield,
  Database,
  Cpu,
  Car,
} from "lucide-react";
import { Project } from "@/types/project";
import { getAllProjects } from "@/services/projectService";

// Icon mapping for different project types
const getProjectIcon = (project: Project) => {
  const iconProps = {
    size: 20,
    className:
      "text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors sm:w-6 sm:h-6",
  };

  if (project.tech.includes("AI") || project.tech.includes("OpenAI API")) {
    return <Bot {...iconProps} />;
  }
  if (project.tech.includes("React Native")) {
    return <MonitorPlay {...iconProps} />;
  }
  if (
    project.tech.includes("Cybersecurity") ||
    project.tech.includes("Security")
  ) {
    return <Shield {...iconProps} />;
  }
  if (project.tech.includes("PostgreSQL") || project.tech.includes("MongoDB")) {
    return <Database {...iconProps} />;
  }
  if (project.tech.includes("Assembly") || project.tech.includes("C")) {
    return <Cpu {...iconProps} />;
  }
  if (project.title === "Rootus") {
    return <Car {...iconProps} />;
  }
  return <Folder {...iconProps} />;
};

const ProjectIcon = memo(
  ({
    project,
    isSelected,
    onClick,
  }: {
    project: Project;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    return (
      <motion.button
        onClick={onClick}
        className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[var(--matrix-color-10)] transition-colors ${
          isSelected ? "bg-[var(--matrix-color-10)]" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          {getProjectIcon(project)}
        </div>
        <span className="text-[10px] leading-tight font-mono text-center text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors line-clamp-2 px-0.5">
          {project.title}
        </span>
        <span
          className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${
            project.status === "Completed"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : project.status === "In Progress"
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
          }`}
        >
          {project.status}
        </span>
      </motion.button>
    );
  }
);

ProjectIcon.displayName = "ProjectIcon";

const ProjectDetails = memo(({ project }: { project: Project | null }) => {
  return (
    <AnimatePresence mode="wait">
      {project ? (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="h-full"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-4 h-full overflow-y-auto">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-3 sm:mb-6">
              <div className="flex items-start gap-2 sm:items-center sm:gap-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center">
                  {getProjectIcon(project)}
                </div>
                <div className="flex-1">
                  <h2 className="text-base sm:text-2xl font-bold text-[var(--matrix-color)] font-mono leading-tight break-words">
                    {project.title}
                  </h2>
                  <span
                    className={`inline-block mt-1 text-[10px] sm:text-sm px-2 py-0.5 rounded-full font-medium ${
                      project.status === "Completed"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : project.status === "In Progress"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex gap-2 sm:hidden">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-lg border border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-20)] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[var(--matrix-color)] text-black rounded-lg hover:bg-[var(--matrix-glow)] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex gap-2 sm:gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-lg border border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-20)] transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--matrix-color)] text-black rounded-lg hover:bg-[var(--matrix-glow)] transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed px-0 sm:px-0">
              {project.description}
            </p>

            <div className="space-y-3 sm:space-y-6 px-0 sm:px-0">
              <div>
                <h3 className="text-xs sm:text-base text-[var(--matrix-color)] font-mono mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-0.5 text-[10px] sm:text-sm bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-full border border-[var(--matrix-color-30)] whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex items-center justify-center"
        >
          <div className="text-center text-gray-400 font-mono">
            <Terminal className="w-7 h-7 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 opacity-50" />
            <p className="text-xs sm:text-base">
              Select a project to view details
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ProjectDetails.displayName = "ProjectDetails";

const FeaturedProjects = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get featured projects (using first 6 projects for now)
  const projects = useMemo(() => getAllProjects().slice(0, 6), []);

  return (
    <section className="min-h-screen relative py-6 sm:py-12 md:py-20 bg-gradient-to-b from-black/50 to-black/30">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
              Featured Innovations
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Witness the frontier of superintelligent SaaS solutions, where artificial intelligence evolves beyond human cognition.
          </p>
        </motion.div>

        {/* Split Layout: Project Icons Grid and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
          {/* Project Icons Grid */}
          <div className="bg-black/20 border border-[var(--matrix-color-30)] rounded-lg p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {projects.map((project) => (
                <ProjectIcon
                  key={project.title}
                  project={project}
                  isSelected={selectedProject?.title === project.title}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="h-[calc(100vh-12rem)] sm:h-[calc(100vh-18rem)] md:h-[calc(100vh-20rem)] sticky top-20">
            <ProjectDetails project={selectedProject} />
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedProjects.displayName = "FeaturedProjects";

export default FeaturedProjects;
