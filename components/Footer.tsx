'use client';

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const footerRef = React.useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={footerRef}
      className="text-center text-zinc-600 text-xs backdrop-blur-sm font-mono tracking-wider pt-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: footerInView ? 1 : 0, 
        y: footerInView ? 0 : 10 
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      built with{" "}
      <Image 
        src="/heart.webp"
        alt="heart"
        width={16}
        height={16}
        className="inline-block"
      />
      {" "}by{" "}
      <a 
        href="https://github.com/dbeal-eth" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200"
      >
        dbeal-eth
      </a>
      {" "}+{" "}
      <a 
        href="https://github.com/noahlitvin" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200"
      >
        noahlitvin
      </a>
    </motion.div>
  );
} 