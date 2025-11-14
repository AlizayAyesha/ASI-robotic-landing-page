"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Terminal, Newspaper, Calendar, Tag, User } from "lucide-react";
import type { NewsArticle as NewsArticleType } from "@/types/news";
import CrypticText from "@/components/CrypticText";

// Mock data - Replace with real data from your service
const CATEGORIES = [
  "Tech Updates",
  "Events",
  "Projects",
  "Community",
  "Tutorials",
];

// Mock data until service is updated
const MOCK_NEWS: NewsArticleType[] = [
  {
    title: "Club Launches New AI Project",
    excerpt:
      "Our team has started work on an exciting new artificial intelligence project that aims to revolutionize how we approach machine learning education.",
    date: "2024-03-15",
    category: "Projects",
    author: "John Doe",
  },
  {
    title: "Upcoming Hackathon: Code for Change",
    excerpt:
      "Join us for our biggest hackathon yet, where we'll be focusing on creating solutions for social impact.",
    date: "2024-03-20",
    category: "Events",
    author: "Jane Smith",
  },
  {
    title: "New Tutorial Series: Web3 Development",
    excerpt:
      "We're launching a comprehensive tutorial series on Web3 development, covering everything from basic concepts to advanced implementations.",
    date: "2024-03-18",
    category: "Tutorials",
    author: "Mike Johnson",
  },
];

const MOCK_FEATURED_NEWS: NewsArticleType[] = [
  {
    title: "Club Partners with Tech Giants",
    excerpt:
      "We're excited to announce our new partnerships with leading tech companies to provide more opportunities for our members.",
    date: "2024-03-16",
    category: "Tech Updates",
    author: "Sarah Wilson",
  },
  {
    title: "Community Spotlight: Our Impact in 2024",
    excerpt:
      "A look at how our community has grown and the impact we've made in the tech ecosystem this year.",
    date: "2024-03-17",
    category: "Community",
    author: "Alex Brown",
  },
];

const NewsArticle = memo(
  ({
    title,
    excerpt,
    date,
    category,
    author,
    index,
  }: NewsArticleType & { index: number }) => {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-[var(--matrix-color-90)]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3" />
                {category}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                {author}
              </div>
            </div>
            <h3 className="text-xl font-bold text-[var(--matrix-color)]">
              {title}
            </h3>
            <p className="text-gray-300 font-serif leading-relaxed">
              {excerpt}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="self-start px-4 py-2 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] text-sm rounded border border-[var(--matrix-color-30)] hover:border-[var(--matrix-color)] transition-colors"
            >
              Read More →
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  }
);

NewsArticle.displayName = "NewsArticle";

const MatrixOverlay = memo(() => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--matrix-color-20),transparent)]" />
  </div>
));

MatrixOverlay.displayName = "MatrixOverlay";

const News = memo(() => {
  // Use mock data until service is updated
  const news = MOCK_NEWS;
  const featuredNews = MOCK_FEATURED_NEWS;

  return (
    <section className="min-h-screen relative bg-black font-mono">
      <MatrixOverlay />

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 relative"
          >
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 relative z-10 tracking-tight">
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
                  <CrypticText text="The" />
                  <span className="text-2xl opacity-70">:</span>
                  <CrypticText text="Club" />
                  <span className="opacity-70">]</span>
                  <span className="text-base opacity-50">{"//"}</span>
                  <CrypticText text="Chronicle" />
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
                cat latest_news.md
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
      </div>

      {/* Featured News Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredNews.map((article, index) => (
              <NewsArticle key={index} {...article} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-y border-[var(--matrix-color-30)] mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 py-4 overflow-x-auto">
              <Newspaper className="w-5 h-5 text-[var(--matrix-color)]" />
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)] transition-colors whitespace-nowrap"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main News Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <NewsArticle key={index} {...article} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16 border-t border-[var(--matrix-color-30)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color)] rounded-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                Subscribe to Our Newsletter
              </span>
            </h2>
            <p className="text-gray-300 mb-6">
              Stay updated with the latest tech news and club activities
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-black/50 border border-[var(--matrix-color-30)] rounded-lg focus:border-[var(--matrix-color)] focus:outline-none text-[var(--matrix-color)]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

News.displayName = "News";

export default News;
