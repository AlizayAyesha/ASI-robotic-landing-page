"use client";

import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Terminal,
  ExternalLink,
  Github,
  SlidersHorizontal,
} from "lucide-react";
import { Project } from "@/types/project";
import { getAllProjects } from "@/services/projectService";
import CrypticText from "@/components/CrypticText";

// Custom Dropdown Component
interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
}

const CustomDropdown = memo(
  ({ value, onChange, options, label }: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-colors font-mono text-sm"
        >
          <span className="opacity-70">{label}:</span>
          <span>{options.find((opt) => opt.value === value)?.label}</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 py-1 bg-black/95 border border-[var(--matrix-color-30)] rounded-lg shadow-xl backdrop-blur-sm"
            >
              {/* Search input */}
              <div className="px-2 pb-1 mb-1 border-b border-[var(--matrix-color-30)]">
                <div className="relative">
                  <Search
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-2 py-1.5 bg-black/30 border border-[var(--matrix-color-30)] rounded-md focus:outline-none focus:border-[var(--matrix-color)] font-mono text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              {/* Options list */}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-[var(--matrix-color-20)] font-mono text-sm ${
                      value === option.value
                        ? "text-[var(--matrix-color)] bg-[var(--matrix-color-10)]"
                        : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
                {filteredOptions.length === 0 && (
                  <div className="px-3 py-2 text-gray-400 text-sm font-mono">
                    No matches found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

CustomDropdown.displayName = "CustomDropdown";

const ProjectRow = memo(
  ({ project, index }: { project: Project; index: number }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="border-b border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-10)]"
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex items-center py-4 px-4 cursor-pointer group"
        >
          <Terminal
            size={16}
            className="text-[var(--matrix-color)] mr-3 group-hover:text-[var(--matrix-glow)] transition-colors"
          />
          <span className="text-[var(--matrix-color)] font-mono group-hover:text-[var(--matrix-glow)] transition-colors">
            {project.title}
          </span>
          <span
            className={`ml-4 text-sm px-2 py-0.5 rounded-full font-medium ${
              project.status === "Completed"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : project.status === "In Progress"
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            }`}
          >
            {project.status}
          </span>
          <div className="ml-auto flex items-center space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {expanded ? (
              <ChevronUp
                size={16}
                className="text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors"
              />
            ) : (
              <ChevronDown
                size={16}
                className="text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors"
              />
            )}
          </div>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4 font-mono"
            >
              <div className="pl-6 border-l border-[var(--matrix-color-30)]">
                <p className="text-gray-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded border border-[var(--matrix-color-30)] hover:border-[var(--matrix-color)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

ProjectRow.displayName = "ProjectRow";

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

const Projects = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "status">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  // Get projects from service
  const projects = useMemo(() => getAllProjects(), []);

  // Get unique tech stack items and sort them alphabetically
  const uniqueTech = useMemo(() => {
    const techSet = new Set(projects.flatMap((p) => p.tech));
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tech.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );
        const matchesStatus =
          selectedStatus === "all" || project.status === selectedStatus;
        const matchesTech =
          selectedTech === "all" || project.tech.includes(selectedTech);
        return matchesSearch && matchesStatus && matchesTech;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else {
          return sortOrder === "asc"
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        }
      });
  }, [projects, searchQuery, selectedStatus, selectedTech, sortBy, sortOrder]);

  return (
    <section className="min-h-screen py-10 sm:py-20 relative overflow-hidden bg-black font-mono">
      <MatrixOverlay />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block relative">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 relative z-10 text-center">
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
                  <CrypticText text="Project" />
                  <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
                  <CrypticText text="Index" />
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
                <span className="text-[var(--matrix-color)]">root@axiom</span>
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
                cat project_manifest.md
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

          {/* Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-black/40 backdrop-blur-sm border border-[var(--matrix-color)] rounded-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left side - Terminal style */}
              <div className="text-left font-mono">
                <div className="flex items-center gap-2 text-[var(--matrix-color)] mb-3">
                  <Terminal size={18} />
                  <span className="text-lg font-bold tracking-wider">
                    PROJECT STATUS
                  </span>
                </div>
                <div className="text-[var(--matrix-color-90)] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    <span>
                      {projects.filter((p) => p.status === "Completed").length}{" "}
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                    <span>
                      {
                        projects.filter((p) => p.status === "In Progress")
                          .length
                      }{" "}
                      In Progress
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>
                      {projects.filter((p) => p.status === "Planning").length}{" "}
                      Planning
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Status & Suggest */}
              <div className="text-right font-mono flex items-center justify-end gap-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/30 rounded-lg border border-[var(--matrix-color-30)]">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[var(--matrix-color-90)]">
                    System Active
                  </span>
                </div>
                <motion.a
                  href="https://github.com/axiom-svgu/axiomclub.tech/issues/new?labels=project-suggestion&template=project_suggestion.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--matrix-color)] text-black rounded-lg hover:bg-[var(--matrix-glow)] transition-colors font-bold relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span>+</span>
                  <span>Suggest Project</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Controls with enhanced styling */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--matrix-color-90)]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg focus:outline-none focus:border-[var(--matrix-color)] font-mono text-[var(--matrix-color)] placeholder-[var(--matrix-color-90)]"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto inline-flex items-center gap-2 px-4 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-colors font-mono text-[var(--matrix-color)]"
              >
                <SlidersHorizontal size={16} />
                <span>Filters</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <CustomDropdown
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    options={[
                      { value: "all", label: "All Status" },
                      { value: "Completed", label: "Completed" },
                      { value: "In Progress", label: "In Progress" },
                      { value: "Planning", label: "Planning" },
                    ]}
                    label="Status"
                  />
                  <CustomDropdown
                    value={selectedTech}
                    onChange={setSelectedTech}
                    options={[
                      { value: "all", label: "All Tech" },
                      ...uniqueTech.map((tech) => ({
                        value: tech,
                        label: tech,
                      })),
                    ]}
                    label="Tech Stack"
                  />
                  <div className="relative">
                    <button
                      onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        setSortBy(sortBy);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-colors font-mono text-sm"
                    >
                      <span className="opacity-70">Sort By:</span>
                      <span>
                        {sortBy === "name" ? "Name" : "Status"}{" "}
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                      <ChevronDown
                        size={14}
                        className="transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSortBy(sortBy === "name" ? "status" : "name");
                        }}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Projects List with enhanced styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border border-[var(--matrix-color-30)] bg-black/20 backdrop-blur-sm"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectRow
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))
            ) : (
              <div className="p-8 text-center text-[var(--matrix-color-90)] font-mono">
                <Terminal className="w-8 h-8 mx-auto mb-4 opacity-50" />
                No projects match your search criteria
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
