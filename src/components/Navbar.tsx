"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/contexts/NavbarContext";
import { useTheme } from "@/contexts/ThemeContext";
import type { Theme } from "@/contexts/ThemeContext";

const THEMES: { name: Theme; color: string }[] = [
  { name: "amber", color: "#ffb000" },
  { name: "ruby", color: "#ff3366" },
  { name: "emerald", color: "#00ff9d" },
  { name: "sapphire", color: "#00a8ff" },
  { name: "violet", color: "#9d00ff" },
];

const LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  //{ label: "NEWS", href: "/news" },
  { label: "TEAM", href: "/team" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = memo(() => {
  const pathname = usePathname();
  const { isPowered, setIsPowered } = useNavbar();
  const { theme, setTheme } = useTheme();
  const handleChannelChange = useCallback(() => {
    // Channel change handled by navigation
  }, []);

  if (!isPowered) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={() => setIsPowered(true)}
        className="fixed left-4 top-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border-2 border-[var(--matrix-color)] flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            opacity: [0.5, 1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-4 h-4 rounded-full bg-[var(--matrix-color)]"
        />
      </motion.button>
    );
  }

  return (
    <motion.nav
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed sm:left-0 sm:top-0 sm:h-screen bottom-0 left-0 right-0 sm:right-auto z-50 p-2 sm:p-4"
    >
      <motion.div
        className="h-[30px] sm:h-[95vh] w-full sm:w-36 bg-black rounded-2xl border border-[var(--matrix-color-30)] shadow-lg flex sm:flex-col flex-row items-center gap-2 p-2 relative sm:gap-4 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Brand Display - Hide on mobile */}
        <div className="hidden sm:block w-full">
          <motion.div
            className="w-full bg-black rounded-lg border-2 border-[var(--matrix-color-30)] p-2 relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 0px var(--matrix-color)",
                "0 0 10px var(--matrix-color)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <motion.div
              className="font-mono text-center text-[var(--matrix-color)] text-sm relative z-10"
              animate={{
                opacity: [1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ASI SaaS
            </motion.div>
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
          </motion.div>
        </div>



        {/* Navigation Section - Simplified for mobile */}
        <div className="flex-1 w-full">
          <div className="hidden sm:block text-[var(--matrix-color)] text-[10px] font-mono text-center border-b-2 border-[var(--matrix-color-30)] pb-1">
            CHANNEL SELECT
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-6 gap-2 w-full">
            {LINKS.map((link, _index) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.button
                    onClick={() => handleChannelChange()}
                    className={`w-full rounded-lg border-2 relative ${
                      isActive
                        ? "bg-[var(--matrix-color-20)] border-[var(--matrix-color)]"
                        : "bg-black border-[var(--matrix-color-30)] hover:border-[var(--matrix-color)]"
                    } flex flex-col items-center justify-center py-1 sm:py-2 gap-0.5 sm:gap-1`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`font-mono text-base sm:text-lg ${
                        isActive
                          ? "text-[var(--matrix-color)]"
                          : "text-[var(--matrix-color-50)]"
                      }`}
                    >
                      {_index + 1}
                    </span>
                    <span className="text-[6px] sm:text-[8px] font-mono text-[var(--matrix-color-50)]">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute right-1 top-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--matrix-color)]"
                        animate={{ opacity: [1, 0.5] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Theme Changer */}
        <div className="sm:hidden flex items-center">
          <motion.div
            className="w-10 h-10 rounded-lg bg-black border-2 border-[var(--matrix-color-30)] flex items-center justify-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const currentIndex = THEMES.findIndex((t) => t.name === theme);
              const nextIndex = (currentIndex + 1) % THEMES.length;
              setTheme(THEMES[nextIndex].name);
            }}
          >
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: THEMES.find((t) => t.name === theme)?.color,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 rounded-lg border-[var(--matrix-color)]"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        </div>

        {/* Theme Controls - Hide on mobile */}
        <div className="hidden sm:block w-full space-y-1 md:space-y-2">
          <div className="text-[var(--matrix-color)] text-[10px] font-mono text-center border-b-2 border-[var(--matrix-color-30)] pb-1">
            COLOR ADJUST
          </div>
          <div className="grid grid-cols-3 gap-1">
            {THEMES.map((t) => (
              <motion.button
                key={t.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(t.name)}
                className={`aspect-square rounded-lg border-2 relative ${
                  theme === t.name
                    ? "border-[var(--matrix-color)] bg-[var(--matrix-color-20)]"
                    : "border-[var(--matrix-color-30)] bg-black"
                } flex items-center justify-center group`}
              >
                <div
                  className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: t.color }}
                />
                {theme === t.name && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-[var(--matrix-color)]"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Volume Controls - Hide on mobile */}
        <div className="hidden sm:block w-full space-y-1 md:space-y-2">
          <div className="text-[var(--matrix-color)] text-[10px] font-mono text-center border-b-2 border-[var(--matrix-color-30)] pb-1">
            SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-6 rounded-lg bg-black border-2 border-[var(--matrix-color-30)] flex items-center justify-center group hover:border-[var(--matrix-color)]"
            >
              <span className="font-mono text-[8px] text-[var(--matrix-color-50)] group-hover:text-[var(--matrix-color)]">
                VOL +
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-6 rounded-lg bg-black border-2 border-[var(--matrix-color-30)] flex items-center justify-center group hover:border-[var(--matrix-color)]"
            >
              <span className="font-mono text-[8px] text-[var(--matrix-color-50)] group-hover:text-[var(--matrix-color)]">
                VOL -
              </span>
            </motion.button>
          </div>
        </div>

        {/* Power Button - Show smaller version on mobile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPowered(false)}
          className="sm:mt-auto w-10 sm:w-full aspect-square sm:aspect-[2/1] rounded-lg bg-black border-2 border-[var(--matrix-color)] flex items-center justify-center gap-1 sm:gap-3 relative overflow-hidden group"
        >
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-[var(--matrix-color)] flex items-center justify-center">
            <motion.div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-[var(--matrix-color)] rounded-full"
              animate={{
                opacity: [1, 0.5],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          <div className="hidden sm:flex flex-col items-center">
            <span className="font-mono text-[10px] text-[var(--matrix-color)]">
              POWER
            </span>
            <span className="font-mono text-[8px] text-[var(--matrix-color-50)]">
              STANDBY
            </span>
          </div>
          {/* Power button glow */}
          <motion.div
            className="absolute inset-0 bg-[var(--matrix-color)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.button>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner Accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[var(--matrix-color-30)] rounded-tl" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--matrix-color-30)] rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--matrix-color-30)] rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[var(--matrix-color-30)] rounded-br" />
        </div>
      </motion.div>
    </motion.nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
