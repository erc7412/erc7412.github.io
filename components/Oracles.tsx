'use client';

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Oracles() {
  const oraclesRef = React.useRef(null);
  const oraclesInView = useInView(oraclesRef, { once: true, amount: 0.3 });

  // Helper function to render button with tooltip if disabled
  const renderButton = (href: string, icon: React.ReactNode, text: string) => {
    const isDisabled = href === '#';
    
    const button = (
      <a 
        href={href} 
        className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs rounded border border-zinc-800 mx-auto whitespace-nowrap ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-800/50 transition-colors'}`}
        onClick={(e) => isDisabled && e.preventDefault()}
      >
        {icon}
        {text}
      </a>
    );

    if (isDisabled) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-800 text-white border border-zinc-700">
            <p>Coming soon</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <TooltipProvider>
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
                { 
                  id: 'PYTH', 
                  client: 'https://github.com/erc7412/erc7412/blob/main/src/oracles/pyth.ts',
                  contract: 'https://github.com/Synthetixio/synthetix-v3/blob/main/auxiliary/PythERC7412Wrapper/contracts/PythERC7412Wrapper.sol',
                  deployments: 'https://usecannon.com/packages/pyth-erc7412-wrapper'
                },
                { 
                  id: 'WORMHOLE', 
                  client: '#',
                  contract: '#',
                  deployments: '#'
                },
                { 
                  id: 'CHAINLINK', 
                  client: 'https://github.com/erc7412/erc7412/blob/main/src/oracles/chainlink-datastreams.ts',
                  contract: 'https://github.com/dbeal-eth/datastreams-erc7412/blob/main/contracts/DataStreamsERC7412Compatible.sol',
                  deployments: '#'
                },
                { 
                  id: 'REDSTONE', 
                  client: 'https://github.com/redstone-finance/erc7412/blob/main/src/adapters/redstone.ts',
                  contract: 'https://github.com/redstone-finance/erc7412/blob/main/contracts/redstone-lib/ERC7412RedstoneFeed.sol',
                  deployments: '#'
                },
              ].map((row, index) => (
                <tr key={row.id}>
                  <td className={`px-3 py-2.5 ${index !== 3 ? 'border-b border-zinc-800 font-medium tracking-wider' : ''}`}>
                    {row.id}
                  </td>
                  <td className={`px-3 py-2.5 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                    {renderButton(
                      row.contract, 
                      <Github className="h-3.5 w-3.5" />, 
                      "Oracle Contract Code"
                    )}
                  </td>
                  <td className={`px-3 py-2.5 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                    {renderButton(
                      row.client, 
                      <Github className="h-3.5 w-3.5" />, 
                      "Client Library Code"
                    )}
                  </td>
                  <td className={`px-3 py-2.5 text-center ${index !== 3 ? 'border-b border-zinc-800' : ''}`}>
                    {renderButton(
                      row.deployments, 
                      <Image
                        src="/cannon.svg"
                        alt="Cannon"
                        width={14}
                        height={14}
                      />, 
                      "Live Deployments"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </TooltipProvider>
  );
} 