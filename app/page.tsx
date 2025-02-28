'use client';

import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Oracles from "@/components/Oracles";
import ExamplesHeader from "@/components/ExamplesHeader";
import CrossChainExample from "@/components/CrossChainExample";
import PriceDataExample from "@/components/PriceDataExample";
import Footer from "@/components/Footer";

function HomeContent() {
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        initial={{ backgroundColor: "#1a1a1a" }}
        animate={{
          backgroundColor: "#000000"
        }}
        transition={{
          duration: 2,
          ease: "easeInOut"
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-zinc-800/25" />
      
      <motion.div 
        className="container mx-auto px-4 max-w-3xl py-8 md:py-12 md:pt-24"
        variants={contentVariants}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0.215, 0.61, 0.355, 1]
        }}
      >
        <Hero />
        <Oracles />
        <ExamplesHeader />
        <CrossChainExample />
        <PriceDataExample />
        <Footer />
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  return (
    <HomeContent />
  );
}
