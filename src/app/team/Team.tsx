"use client";

import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamService } from "@/services/teamService";
import type { Members } from "@/services/teamService";
import {
  Terminal,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Cpu,
  Palette,
  Megaphone,
  Rocket,
  User,
  Webhook,
  Snowflake,
  Bitcoin,
  LucideIcon,
  Worm,
} from "lucide-react";
import CrypticText from "@/components/CrypticText";

interface TeamSection {
  title: string;
  icon: React.ReactNode;
  members: Members[];
}

// Use the Members type from teamService
const LEADS = teamService.getTeam();

const TEAM_SECTIONS: TeamSection[] = [
  {
    title: "Development",
    icon: <Code className="w-5 h-5" />,
    members: teamService.getDevelopmentTeam(),
  },
  {
    title: "Design",
    icon: <Palette className="w-5 h-5" />,
    members: teamService.getDesignTeam(),
  },
  {
    title: "Content",
    icon: <Megaphone className="w-5 h-5" />,
    members: teamService.getContentTeam(),
  },
];

// const TEAM_0X00: Members[] = LEADS;

const getMemberIcon = (name: string): LucideIcon => {
  switch (name) {
    case "Vinesh Rajpurohit":
      return Webhook;
    case "Deepraj Bhati":
      return Bitcoin;
    case "Vaidehi Shah":
      return Snowflake;
    case "Mahek":
      return Worm;
    default:
      return User;
  }
};

const MemberCard = memo(
  ({ member, isLead = false }: { member: Members; isLead?: boolean }) => {
    const [, setIsHovered] = useState(false);
    const Icon = getMemberIcon(member.name);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative group ${isLead ? "col-span-1" : ""}`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-4 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-[var(--matrix-color-50)] flex items-center justify-center bg-[var(--matrix-color-20)]">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Icon className="w-16 h-16 transition-colors duration-300 relative z-10 text-[var(--matrix-color)]" />
                <div className="absolute inset-0 blur-md -z-10 opacity-50 bg-[var(--matrix-color)]" />
              </motion.div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--matrix-color)]">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--matrix-color-90)] mt-1">
                {member.role}
              </p>
            </div>

            <p className="text-gray-300 text-sm">{member.bio}</p>

            {member.skills && (
              <div className="flex flex-wrap gap-3 justify-center">
                {member.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded border border-[var(--matrix-color-30)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 text-[var(--matrix-color-90)]">
              {member.links?.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--matrix-color)] transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {member.links?.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--matrix-color)] transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {member.links?.email && (
                <a
                  href={`mailto:${member.links.email}`}
                  className="hover:text-[var(--matrix-color)] transition-colors"
                >
                  <Mail size={18} />
                </a>
              )}
              {member.links?.portfolio && (
                <a
                  href={member.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--matrix-color)] transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

MemberCard.displayName = "MemberCard";

const TeamSection = memo(({ section }: { section: TeamSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <span className="text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
            {section.icon}
          </span>
          <h2 className="text-xl font-bold text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
            {section.title} Team
          </h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[var(--matrix-color)] transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="p-6 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg">
              {section.members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.members.map((member) => (
                    <MemberCard key={member.name} member={member} />
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-gray-300 text-center">
                    We are actively looking for passionate individuals to join
                    our {section.title} team! If you&apos;re interested in{" "}
                    {section.title.toLowerCase()} and want to be part of
                    something exciting, we&apos;d love to hear from you.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded border border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-30)] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Get in Touch
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

TeamSection.displayName = "TeamSection";

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

const Team = memo(() => {
  return (
    <section className="min-h-screen py-10 sm:py-20 relative bg-black font-mono">
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
              <h1 className="text-4xl md:text-6xl font-bold mb-4 relative z-10 text-center">
                <motion.div
                  className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex items-center gap-3 justify-center"
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
                  <CrypticText text="The" />
                  <Terminal className="w-8 h-8" />
                  <CrypticText text="Team" />
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
            <div className="flex items-center justify-center gap-2 text-[var(--matrix-color-90)] mt-4">
              <Terminal className="w-4 h-4" />
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
                <span className="text-[var(--matrix-color)]">root@club</span>
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
                cat team_manifest.md
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
            <p className="text-gray-400 max-w-2xl mx-auto mt-6">
              Meet the minds behind Club - a collective of innovators,
              developers, and tech enthusiasts.
            </p>
          </motion.div>
          {/* Club Leads */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--matrix-color)] mb-8 flex items-center gap-2"
            >
              <Rocket className="w-6 h-6" />
              Club Leads
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEADS.map((lead, index) => (
                <MemberCard key={index} member={lead} isLead />
              ))}
            </div>
          </div>
          {/* Team Sections */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--matrix-color)] mb-8 flex items-center gap-2"
            >
              <Cpu className="w-6 h-6" />
              Specialized Teams
            </motion.h2>
            {TEAM_SECTIONS.map((section, index) => (
              <TeamSection key={index} section={section} />
            ))}
          </div>
          {/* Team 0x00
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--matrix-color)] mb-8 flex items-center gap-2"
            >
              <Binary className="w-6 h-6" />
              Team 0x00 - Elite Squad
            </motion.h2>
            <div className="p-6 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg">
              <p className="text-gray-300 mb-6">
                Our competitive team that represents Axiom Club in hackathons
                and coding competitions. We&apos;re actively looking for
                talented individuals to join our elite squad and push the
                boundaries of what&apos;s possible.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM_0X00.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-300 mb-4">
                  Think you have what it takes to be part of Team 0x00?
                  We&apos;re always on the lookout for exceptional talent!
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded border border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-30)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Apply to Join
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
