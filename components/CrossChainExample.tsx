'use client';

import React from "react";
import { motion, useInView } from "framer-motion";
import { CodeBlock, railscast } from "react-code-blocks";

export default function CrossChainExample() {
  const crossChainRef = React.useRef(null);
  const crossChainInView = useInView(crossChainRef, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={crossChainRef}
      className="bg-zinc-900/50 rounded-sm shadow-lg p-6 md:p-10 mb-12 md:mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.6)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: crossChainInView ? 1 : 0, 
        y: crossChainInView ? 0 : 20 
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Call view functions across chains</h2>
      <p className="text-zinc-300 mb-8 text-lg">
        Verify <span className="font-mono">.eth</span> address ownership on an L2 via{" "}
        <a 
          href="https://wormhole.com/products/queries" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
        >
          Wormhole Queries
        </a>.
      </p>
      <div className="rounded-sm border border-zinc-800 shadow-lg font-mono text-xs">
        <CodeBlock
          text={`function verifyENSOwnership(address user, bytes ensNameNode) internal {

    // Query ENS ownership data on mainnet
    bytes memory ownerData = wormholeOracleContract.retrieveCrossChainData(
        1,  // Ethereum mainnet chain ID
        "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", // ENS Universal Resolver
        abi.encodeWithSelector(
            IENSRegistry.owner.selector,
            ensNameNode
        )
    );
    
    address ensOwner = abi.decode(ownerData, (address));
    require(ensOwner == user, "User does not own this ENS name");
}`}
          language="solidity"
          theme={railscast}
          showLineNumbers={false}
          customStyle={{
            padding: '0.5rem',
            backgroundColor: '#000000'
          }}
        />
      </div>
    </motion.div>
  );
} 