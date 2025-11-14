"use client";

import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  date: string;
  title: string;
  content: string;
  tags: string[];
}

const newsItems: NewsItem[] = [
  {
    date: "2025-01-30",
    title: "The Foundation of Axiom Club",
    content:
      "Systum elvish bhai bhai elvish systum Systum elvish bhai bhai elvish systum Systum elvish bhai bhai elvish systum Systum elvish bhai bhai elvish systum Systum elvish bhai bhai elvish systum ",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2025-01-30",
    title: "Waiting for the future",
    content: "",
    tags: ["AI", "Research", "Innovation"],
  },
];

const NewsArticle = memo(
  ({
    item,
    isSelected,
    onClick,
  }: {
    item: NewsItem;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.article
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onClick}
        transition={{ duration: 0.3 }}
        className={`
        relative overflow-hidden h-[80px]
        group cursor-pointer
        transform transition-all duration-300
        hover:scale-[1.02] hover:z-10
        ${
          isSelected
            ? "border-2 border-[var(--matrix-glow)] shadow-lg shadow-[var(--matrix-color-30)]"
            : ""
        }
      `}
      >
        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--matrix-color-30)] to-transparent opacity-10" />

        {/* Content Container */}
        <div
          className={`
          relative z-10 p-4
          border border-[var(--matrix-color-30)]
          bg-black/80 backdrop-blur-sm
          h-full flex flex-col justify-between
          transition-all duration-300
          ${isHovered ? "bg-black/90" : ""}
        `}
        >
          {/* Date */}
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--matrix-color)] animate-pulse" />
            <span className="text-[var(--matrix-color)] font-mono text-xs">
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`
            font-bold text-base
            text-[var(--matrix-color)]
            group-hover:text-[var(--matrix-glow)]
            transition-colors duration-300
            line-clamp-1
          `}
          >
            {item.title}
          </h3>

          {/* Bottom Decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--matrix-color-30)] to-transparent" />
        </div>
      </motion.article>
    );
  }
);

NewsArticle.displayName = "NewsArticle";

const DetailedView = ({ item }: { item: NewsItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative h-full overflow-hidden border border-[var(--matrix-color-30)] bg-black/80"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--matrix-color-30)] to-transparent opacity-10" />
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Date and Tags */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[var(--matrix-color)] animate-pulse" />
            <span className="text-[var(--matrix-color)] font-mono text-sm">
              {item.date}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full border border-[var(--matrix-color-30)] text-[var(--matrix-color)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--matrix-color)] mb-4">
          {item.title}
        </h2>

        {/* Content */}
        <p className="text-gray-400 text-base leading-relaxed">
          {item.content}
        </p>

        {/* Learn More Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-2 bg-black/50 border border-[var(--matrix-color)] 
                   text-[var(--matrix-color)] rounded-md font-mono text-sm
                   hover:bg-[var(--matrix-color-30)] hover:text-white
                   transition-colors duration-300
                   flex items-center justify-center space-x-2"
        >
          <span>LEARN MORE</span>
          <motion.span
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>
        </motion.button>

        {/* Decorative Elements */}
        <div className="mt-auto pt-6 flex justify-center">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-2 h-2 bg-[var(--matrix-color)] rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

DetailedView.displayName = "DetailedView";

const News = memo(() => {
  const [selectedStory, setSelectedStory] = useState<NewsItem>(newsItems[0]);
  const leftStories = newsItems.slice(0, newsItems.length / 2);
  const rightStories = newsItems.slice(newsItems.length / 2);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-3xl font-bold text-[var(--matrix-color)] bg-clip-text"
            >
              AXIOM CHRONICLE
            </motion.span>
            <div className="mt-1 text-[var(--matrix-color)] text-xs font-mono">
              DIGITAL EDITION • {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {leftStories.map((item, index) => (
              <NewsArticle
                key={index}
                item={item}
                isSelected={selectedStory === item}
                onClick={() => setSelectedStory(item)}
              />
            ))}
          </div>

          {/* Middle Column - Detailed View */}
          <div className="h-full">
            <AnimatePresence mode="wait">
              <DetailedView key={selectedStory.title} item={selectedStory} />
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightStories.map((item, index) => (
              <NewsArticle
                key={index}
                item={item}
                isSelected={selectedStory === item}
                onClick={() => setSelectedStory(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

News.displayName = "News";

export default News;
