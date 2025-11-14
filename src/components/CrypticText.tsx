"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface CrypticTextProps {
  text: string;
}

const CrypticText = memo(({ text }: CrypticTextProps) => {
  return (
    <motion.span className="inline-block font-bold text-[var(--matrix-color)]">
      {text}
    </motion.span>
  );
});

CrypticText.displayName = "CrypticText";

export default CrypticText;
