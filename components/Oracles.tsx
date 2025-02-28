'use client';

import React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import { Github } from "lucide-react";

export default function Oracles() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const oraclesRef = React.useRef(null);
  const oraclesInView = useInView(oraclesRef, { once: true, amount: 0.3 });

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div 
      ref={oraclesRef}
      className="bg-zinc-900/50 rounded-sm shadow-lg p-6 md:p-10 mb-12 md:mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.6)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: oraclesInView ? 1 : 0, 
        y: oraclesInView ? 0 : 20 
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
        Build with real-world data
      </h2>
      <p className="text-zinc-300 mb-8 text-lg">
        Write smart contracts that call oracle contracts. Use your protocol with any app that has the client library installed.
      </p>

      <div className="overflow-x-auto rounded-sm border border-zinc-800 shadow-lg">
        <table className="table-auto w-full text-left border-collapse bg-black">
          <thead>
            <tr>
              <th className="pb-2 border-b border-zinc-800 px-3 py-2 text-sm">
                <span className="font-mono">ORACLE_ID</span>
              </th>
              <th className="pb-2 border-b border-zinc-800 px-6 py-2 text-sm">
                Oracle Contract Address <span className="ml-0.5 font-light text-muted-foreground text-xs">on all chains</span>
              </th>
              <th className="pb-2 border-b border-zinc-800 px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="align-middle text-sm">
            {[
              { id: 'WORMHOLE', address: '0x0000000000000000000000000000000000000000' },
              { id: 'PYTH', address: '0x0000000000000000000000000000000000000000' },
              { id: 'CHAINLINK', address: '0x0000000000000000000000000000000000000000' },
              { id: 'REDSTONE', address: '0x0000000000000000000000000000000000000000' }
            ].map((row, index) => (
              <tr key={row.id}>
                <td className={`px-3 py-2 ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  {row.id}
                </td>
                <td className={`px-6 py-2 font-mono ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <div className="flex items-center gap-2">
                    {row.address}
                    <AnimatePresence initial={false} mode="wait">
                      {copiedId === row.id ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check 
                            className="h-3 w-3 text-green-500" 
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy 
                            className="h-3 w-3 text-zinc-400 hover:text-zinc-300 cursor-pointer" 
                            onClick={() => handleCopy(row.id, row.address)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </td>
                <td className={`px-3 py-2 ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <div className="flex gap-4 justify-end min-w-[88px]">
                    <Image
                      src="/cannon.svg"
                      alt="Cannon"
                      width={16}
                      height={16}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                    <Github className="h-4 w-4 hover:opacity-80 transition-opacity cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 