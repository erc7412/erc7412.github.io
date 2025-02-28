'use client';

import React from "react";
import { motion, useInView } from "framer-motion";

export default function ExamplesHeader() {
  const examplesHeaderRef = React.useRef(null);
  const examplesHeaderInView = useInView(examplesHeaderRef, { once: true, amount: 0.3 });

  return (
    <motion.h2 
      ref={examplesHeaderRef}
      className="backdrop-blur-sm mt-12 pt-12 md:pt-24 mb-12 md:mb-24 text-muted-foreground text-mono font-medium tracking-widest uppercase text-lg flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: examplesHeaderInView ? 1 : 0, 
        y: examplesHeaderInView ? 0 : 20 
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800/90 via-[20%] to-zinc-800"></div>
      <span className="px-4">Examples</span>
      <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800 via-zinc-800/90 via-[80%] to-transparent"></div>
    </motion.h2>
  );
} 