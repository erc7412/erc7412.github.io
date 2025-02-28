'use client';

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { CommandPreview } from "./CommandPreview";

export default function Oracles() {
  const oraclesRef = React.useRef(null);
  const oraclesInView = useInView(oraclesRef, { once: true, amount: 0.3 });

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
      <p className="text-zinc-300 mb-6 text-lg">
        Write smart contracts that call oracle contracts. Use your protocol with any app that has the client library installed.
      </p>

      <div className="mb-6">
        <div className="mb-2 text-zinc-300 text-sm">
          Start a local node that loads an <a href="https://usecannon.com/packages/erc7412-example/latest/13370-main/code" className="text-white hover:text-gray-200 underline underline-offset-2">example contract</a> which integrates with oracle contracts.
        </div>
      
        <CommandPreview command="npx @usecannon/cli erc7412-example" />
      </div>

      <div className="mb-2 text-zinc-300 text-sm">
        Explore implementations for various <code>ORACLE_ID</code>s.
      </div>

      <div className="overflow-x-auto rounded-sm border border-zinc-800 shadow-lg">
        <table className="table-auto w-full text-left border-collapse bg-black">
          <tbody className="align-middle text-sm">
            {[
              { id: 'PYTH' },
              { id: 'WORMHOLE' },
              { id: 'CHAINLINK' },
              { id: 'REDSTONE' }
            ].map((row, index) => (
              <tr key={row.id}>
                <td className={`px-3 py-2 ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  {row.id}
                </td>
                <td className={`px-3 py-2 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <button className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors mx-auto whitespace-nowrap">
                    <Github className="h-3.5 w-3.5" />
                    Oracle Contract Code
                  </button>
                </td>
                <td className={`px-3 py-2 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <button className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors mx-auto whitespace-nowrap">
                    <Github className="h-3.5 w-3.5" />
                    Library Adapter Code
                  </button>
                </td>
                <td className={`px-3 py-2 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <button className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors mx-auto whitespace-nowrap">
                    <Image
                      src="/cannon.svg"
                      alt="Cannon"
                      width={14}
                      height={14}
                    />
                    Live Deployments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 