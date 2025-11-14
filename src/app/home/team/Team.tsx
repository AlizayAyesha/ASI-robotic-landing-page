"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github,
  Linkedin,
  User,
  Code,
  Cpu,
  Rocket,
  Terminal,
  Database,
  Cloud,
  Palette,
} from "lucide-react";
import { teamService } from "@/services/teamService";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  links?: {
    github?: string;
    linkedin?: string;
  };
}

const getIconByRole = (role: string) => {
  const roleLC = role.toLowerCase();
  if (roleLC.includes("founder") || roleLC.includes("leader")) return Rocket;
  if (roleLC.includes("frontend")) return Code;
  if (roleLC.includes("backend")) return Database;
  if (roleLC.includes("full")) return Terminal;
  if (roleLC.includes("devops")) return Cloud;
  if (roleLC.includes("system")) return Cpu;
  if (roleLC.includes("design")) return Palette;
  return User;
};

const TeamMemberCard = memo(
  ({ member, index }: { member: TeamMember; index: number }) => {
    const { ref, inView } = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    const Icon = getIconByRole(member.role);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.2 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-4 sm:p-6 bg-black/50 backdrop-blur-sm ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
            <div className="relative w-16 sm:w-24 h-16 sm:h-24 rounded-full overflow-hidden ring-2 ring-[var(--matrix-color-50)] bg-[var(--matrix-color-20)] flex items-center justify-center group">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 bg-[var(--matrix-color-20)] opacity-50"
              />
              <Icon className="w-8 sm:w-12 h-8 sm:h-12 text-[var(--matrix-color)] relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--matrix-color-90)] bg-[var(--matrix-color-20)] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
                {member.role}
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4 pt-1 sm:pt-2">
              {member.links?.github && (
                <motion.a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 sm:w-5 h-4 sm:h-5" />
                </motion.a>
              )}
              {member.links?.linkedin && (
                <motion.a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

TeamMemberCard.displayName = "TeamMemberCard";

const Team = memo(() => {
  // Get all team members and filter for leads only
  const teamMembers = teamService
    .getTeam()
    .filter(
      (member) =>
        member.role.toLowerCase().includes("lead") ||
        member.role.toLowerCase().includes("founder") ||
        member.role.toLowerCase().includes("leader")
    );

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--matrix-color)] mb-2 sm:mb-4">
            Our Team
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Meet our expert team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
