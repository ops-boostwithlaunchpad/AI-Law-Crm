"use client";

import * as React from "react";
import { motion } from "motion/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
