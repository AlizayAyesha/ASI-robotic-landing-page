"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Story, StoryContent } from "@/types/news";
import { SPEAKER_CONFIG, groupContentBySpeaker } from "@/app/news/[slug]/utils";

export const MatrixOverlay = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--matrix-color-20),transparent)]" />
  </div>
);

export const CrypticText = ({ text }: { text: string }) => {
  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  return (
    <motion.span
      className="inline-block relative cursor-pointer"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block relative"
          animate={{
            y: [0, -1, 0],
          }}
          transition={{
            duration: 2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.span
            className="absolute top-0 left-0 text-[var(--matrix-glow)]"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {characters[Math.floor(Math.random() * characters.length)]}
          </motion.span>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const ClientArticle = ({
  story,
  slug,
}: {
  story: Story;
  slug: string;
}) => {
  const groupedContent = groupContentBySpeaker(story.content);

  return (
    <article className="max-w-4xl mx-auto relative z-10">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 relative z-10 leading-tight">
            <motion.div
              className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex items-center gap-3"
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
              {story.title}
              <span className="opacity-70">]</span>
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
            cat {slug}.md
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

      {/* Story Content */}
      <div className="space-y-8">
        {groupedContent.map((group: StoryContent[], groupIndex: number) => {
          const speaker = SPEAKER_CONFIG[group[0].speaker];
          const Icon = speaker.icon;

          return (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="group relative"
            >
              {/* Content */}
              <div className="relative flex items-start gap-6 p-6">
                {/* Left Decorative Elements */}
                <div className="absolute -left-6 top-0 bottom-0 w-4 flex flex-col justify-between items-center pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.1, 0.4, 0.1],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      <div className="text-xs" style={{ color: speaker.color }}>
                        {[">", "//", "[]", "{}", "<<", ">>", "||", "::"][i]}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right Decorative Elements */}
                <div className="absolute -right-6 top-0 bottom-0 w-4 flex flex-col justify-between items-center pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="text-right w-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.1, 0.4, 0.1],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    >
                      <div className="text-xs" style={{ color: speaker.color }}>
                        {["01", "10", "11", "00", "1x", "0x"][i]}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add circuit-like connectors */}
                <div
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px opacity-30"
                  style={{
                    background: `linear-gradient(to right, 
                      transparent 0%,
                      ${speaker.color} 20%,
                      transparent 20%,
                      transparent 40%,
                      ${speaker.color} 40%,
                      ${speaker.color} 60%,
                      transparent 60%,
                      transparent 80%,
                      ${speaker.color} 80%,
                      transparent 100%
                    )`,
                  }}
                />

                {/* Speaker Icon with Enhanced Tooltip */}
                <div className="relative group/icon">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Icon
                      className="w-8 h-8 transition-colors duration-300 relative z-10"
                      style={{ color: speaker.color }}
                    />
                    <div
                      className="absolute inset-0 blur-md -z-10 opacity-50"
                      style={{ backgroundColor: speaker.color }}
                    />
                  </motion.div>

                  {/* Enhanced Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1.5 text-sm rounded-md whitespace-nowrap relative"
                      style={{
                        backgroundColor: speaker.color,
                        color: "black",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-md blur-md -z-10"
                        style={{ backgroundColor: speaker.color }}
                      />
                      {speaker.name}
                    </motion.div>
                    <div
                      className="w-3 h-3 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5"
                      style={{ backgroundColor: speaker.color }}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 leading-relaxed font-mono">
                  <div
                    className="rounded-lg overflow-hidden relative"
                    style={{
                      backgroundColor: `${speaker.color}08`,
                      borderColor: speaker.color,
                      borderWidth: "1.5px",
                    }}
                  >
                    {/* Corner Decorations */}
                    <div
                      className="absolute top-0 left-0 w-2 h-2"
                      style={{
                        borderTop: `2px solid ${speaker.color}`,
                        borderLeft: `2px solid ${speaker.color}`,
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 w-2 h-2"
                      style={{
                        borderTop: `2px solid ${speaker.color}`,
                        borderRight: `2px solid ${speaker.color}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-2 h-2"
                      style={{
                        borderBottom: `2px solid ${speaker.color}`,
                        borderLeft: `2px solid ${speaker.color}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-2 h-2"
                      style={{
                        borderBottom: `2px solid ${speaker.color}`,
                        borderRight: `2px solid ${speaker.color}`,
                      }}
                    />

                    {/* Terminal Header */}
                    <div
                      className="px-4 py-3 flex items-center gap-3 relative"
                      style={{
                        borderBottom: `1.5px solid ${speaker.color}`,
                        backgroundColor: `${speaker.color}15`,
                      }}
                    >
                      <span
                        style={{ color: speaker.color }}
                        className="text-lg"
                      >
                        ◆
                      </span>
                      <span className="text-sm font-medium text-white/90">
                        {speaker.name.toLowerCase()}@club
                      </span>
                      <span className="text-sm text-white/50">~</span>
                      <span className="text-sm text-white/70">
                        {group.length} messages
                      </span>
                      <div className="flex-1" />
                      <div className="flex gap-1">
                        <span className="text-sm text-white/50">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 space-y-4">
                      {group.map((content: StoryContent, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group/line"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="flex items-center gap-2 pt-1"
                              style={{ color: speaker.color }}
                            >
                              <span className="opacity-80 select-none font-bold text-lg">
                                ❯
                              </span>
                            </div>
                            <div className="flex-1 text-white/90 text-base leading-relaxed">
                              {content.text}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Terminal Footer with Bio */}
                    <div
                      className="px-4 py-3 flex items-center gap-2 relative"
                      style={{
                        borderTop: `1.5px solid ${speaker.color}`,
                        backgroundColor: `${speaker.color}15`,
                      }}
                    >
                      <span className="text-sm text-white/90 flex-1">
                        {getSpeakerBio(speaker.name)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </article>
  );
};

function getSpeakerBio(name: string): string {
  const bios: { [key: string]: string } = {
    Vinesh: "autistic",
    Deep: "autistic",
    Vaidehi: "autistic",
  };
  return bios[name] || `${name} | Club Team Member`;
}
