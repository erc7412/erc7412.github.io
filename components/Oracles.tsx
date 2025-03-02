'use client';

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";

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

      <div className="overflow-x-auto rounded-sm border border-zinc-800 shadow-lg">
        <table className="table-auto w-full text-left border-collapse bg-black">
          <tbody className="align-middle text-sm">
            {[
              { id: 'PYTH', client: 'https://github.com/erc7412/erc7412/blob/main/src/oracles/pyth.ts' },
              { id: 'WORMHOLE', client: '#' },
              { id: 'CHAINLINK', client: 'https://github.com/erc7412/erc7412/blob/main/src/oracles/chainlink-datastreams.ts' },
              { id: 'REDSTONE', client: 'https://github.com/redstone-finance/erc7412/blob/main/src/adapters/redstone.ts' },
            ].map((row, index) => (
              <tr key={row.id}>
                <td className={`px-3 py-2 ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  {row.id}
                </td>
                <td className={`px-3 py-2 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <a href="#" className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors mx-auto whitespace-nowrap">
                    <Github className="h-3.5 w-3.5" />
                    Oracle Contract Code
                  </a>
                </td>
                <td className={`px-3 py-2 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <a href={row.client} className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors mx-auto whitespace-nowrap">
                    <Github className="h-3.5 w-3.5" />
                    Client Library Code
                  </a>
                </td>
                <td className={`px-3 py-2 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                  <a href="#" className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors mx-auto whitespace-nowrap">
                    <Image
                      src="/cannon.svg"
                      alt="Cannon"
                      width={14}
                      height={14}
                    />
                    Live Deployments
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 