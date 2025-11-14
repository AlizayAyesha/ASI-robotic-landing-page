"use client";

import React, { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
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
    size: 32,
    className:
      "text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors",
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
        className={`group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-[var(--matrix-color-10)] transition-colors ${
          isSelected ? "bg-[var(--matrix-color-10)]" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getProjectIcon(project)}
        <span className="text-sm font-mono text-center text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
          {project.title}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
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
          <div className="bg-black/70 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-6 h-full">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {getProjectIcon(project)}
                <div>
                  <h2 className="text-2xl font-bold text-[var(--matrix-color)] font-mono">
                    {project.title}
                  </h2>
                  <span
                    className={`text-sm px-2 py-0.5 rounded-full font-medium ${
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
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-lg border border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-20)] transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--matrix-color)] text-black rounded-lg hover:bg-[var(--matrix-glow)] transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-6">{project.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-[var(--matrix-color)] font-mono mb-2 flex items-center gap-2">
                  <Code2 size={16} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-full border border-[var(--matrix-color-30)]"
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
            <Terminal size={32} className="mx-auto mb-4 opacity-50" />
            <p>Select a project to view details</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ProjectDetails.displayName = "ProjectDetails";

const FeaturedProjects = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get projects from service
  const projects = useMemo(() => getAllProjects(), []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tech.some((t) => t.toLowerCase().includes(searchLower))
      );
    });
  }, [projects, searchQuery]);

  return (
    <section className="min-h-screen py-10 sm:py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(32,224,128,.2)_50%,transparent_100%)] bg-[length:100%_3px] animate-matrix" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="text-left font-mono">
                <div className="flex items-center gap-2 text-[var(--matrix-color)] mb-3">
                  <Terminal size={18} />
                  <span className="text-lg font-bold">FEATURED PROJECTS</span>
                </div>
                <div className="text-gray-400">
                  {filteredProjects.length} projects •{" "}
                  {projects.filter((p) => p.status === "Completed").length}{" "}
                  completed
                </div>
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg focus:outline-none focus:border-[var(--matrix-color)] font-mono"
                />
              </div>
            </div>
          </motion.div>

          {/* Split Layout: Project Icons Grid and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Icons Grid */}
            <div className="bg-black/20 border border-[var(--matrix-color-30)] rounded-lg p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
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
            <div className="h-[calc(100vh-20rem)] sticky top-20">
              <ProjectDetails project={selectedProject} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedProjects.displayName = "FeaturedProjects";

export default FeaturedProjects;
