"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
}

export function SlideIn({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "" 
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -50, y: 0 };
      case "right":
        return { x: 50, y: 0 };
      case "up":
        return { x: 0, y: 50 };
      case "down":
        return { x: 0, y: -50 };
    }
  };

  return (
    <motion.div
      initial={{ ...getInitialPosition(), opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
