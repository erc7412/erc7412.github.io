'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Github, BookOpen } from "lucide-react";
import { motion, useInView } from "framer-motion";
import NpmIcon from "@/components/icons/NpmIcon";

export default function Hero() {
  const heroRef = React.useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={heroRef}
      className="bg-zinc-900/50 rounded-sm shadow-lg p-6 md:p-10 mb-12 md:mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.33)]"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ 
        opacity: heroInView ? 1 : 0, 
        y: heroInView ? 0 : 20,
        scale: heroInView ? 1 : 0.98
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <h1 className="text-5xl md:text-7xl font-semibold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mt-3">ERC-7412</h1>
      <h2 className="text-xl md:text-3xl text-zinc-400 mb-6 md:mb-9 font-medium">
        Use oracle data onchain
      </h2>
      <p className="text-zinc-300 text-lg leading-relaxed mb-3">
        <span className="font-semibold">ERC-7412</span> is a standard that enables smart contracts on Ethereum to 
        use cryptographically-signed price data, cross-chain data, and more.</p>

      <p className="text-zinc-300 text-lg leading-relaxed">
      When a function requires offchain data, it throws an{' '}
        <code className="inline bg-zinc-800 px-2 py-1 rounded mx-1 text-zinc-200 font-mono text-sm">
          OracleDataRequired
        </code>{' '}error 
        during simulation. The client library then fetches and prepends the required data to the
        transaction automatically.
      </p>
      <div className="flex flex-wrap gap-3 md:gap-5 mt-6">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          onClick={() => window.open('https://github.com/erc7412/erc7412/blob/main/docs/integrate.md', '_blank')}
        >
          <Package className="h-3.5 w-3.5" />
          Install Client Library
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          onClick={() => window.open('https://eips.ethereum.org/EIPS/eip-7412', '_blank')}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Read the ERC
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          onClick={() => window.open('https://github.com/erc7412/erc7412#erc-7412', '_blank')}
        >
          <Github className="h-3.5 w-3.5" />
          View on GitHub
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          onClick={() => window.open('https://www.npmjs.com/package/erc7412', '_blank')}
        >
          <NpmIcon className="h-3.5 w-3.5" />
          View on npm
        </Button>
      </div>
    </motion.div>
  );
} 