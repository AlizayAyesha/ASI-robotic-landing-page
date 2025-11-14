"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Wrench, Monitor, Rocket, Microscope, Handshake, TrendingUp } from "lucide-react";

interface ActivityCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}

const ActivityCard = ({
  title,
  description,
  icon: Icon,
  delay,
}: ActivityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-4 sm:p-6 bg-black/50 backdrop-blur-sm ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-1.5 sm:p-2 bg-[var(--matrix-color-20)] rounded-lg shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--matrix-color)]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--matrix-color)] mb-1 sm:mb-2">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhatWeDo = memo(() => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
              <motion.span
                className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex items-center gap-2 justify-center"
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
                What We Do
              </motion.span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
              Architecting the Future with Superintelligent SaaS

We don&apos;t just build software; we forge the cognitive tools for the next evolutionary leap. Our suite of superintelligence-driven solutions is designed to augment human intellect and automate complex decision-making at scale.            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <ActivityCard
              title="Autonomous SaaS Platforms"
              description="Our foundational ASI engine provides the core intelligence that powers all our solutions, capable of recursive self-improvement and solving problems beyond human-scale complexity."
              icon={Wrench}
              delay={0.1}
            />
            <ActivityCard
              title="SaaS Development"
              description="We develop self-managing, adaptive SaaS solutions that evolve with your needs. They don&apos;t just respond to commands; they anticipate challenges and orchestrate optimal outcomes.


"
              icon={Monitor}
              delay={0.2}
            />
            <ActivityCard
              title="Enterprise-Grade ASI Deployment"
              description="Move beyond data analysis. Our systems engage in predictive cognition, modeling complex futures and providing prescriptive insights to guide strategic dominance."
              icon={Rocket}
              delay={0.3}
            />
            <ActivityCard
              title="Predictive Cognition & Analytics"
              description="Intelligent analytics and AI-powered insights for data-driven decisions."
              icon={Microscope}
              delay={0.4}
            />
            <ActivityCard
              title="Exponential Growth Engine"
              description="We collaborate with forward-thinking enterprises to build symbiotic relationships, integrating our ASI capabilities to create ecosystems of unparalleled innovation."
              icon={Handshake}
              delay={0.5}
            />
            <ActivityCard
              title="Exponential Growth Engine"
              description="Our solutions are inherently designed for exponential scaling. We provide the intelligence infrastructure to accelerate your growth trajectory at an unprecedented pace."
              icon={TrendingUp}
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

WhatWeDo.displayName = "WhatWeDo";

export default WhatWeDo;
