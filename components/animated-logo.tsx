"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function AnimatedLogo() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 rounded-full border-t-2 border-primary/30"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-2, 2, -2] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <Rocket size={24} className="text-primary" />
      </motion.div>
    </div>
  );
}