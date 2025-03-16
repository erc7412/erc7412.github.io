'use client';

import React from "react";
import { motion, useInView } from "framer-motion";
import { CodeBlock, railscast } from "react-code-blocks";

export default function PriceDataExample() {
  const priceDataRef = React.useRef(null);
  const priceDataInView = useInView(priceDataRef, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={priceDataRef}
      className="bg-zinc-900/50 rounded-sm shadow-lg p-6 md:p-10 mb-12 md:mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.33)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: priceDataInView ? 1 : 0, 
        y: priceDataInView ? 0 : 20 
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Integrate with price feeds</h2>
      <p className="text-zinc-300 mb-8 text-lg">
        Fetch ETH prices from{" "}
        <a 
          href="https://www.pyth.network/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
        >
          Pyth
        </a>,{" "}
        <a 
          href="https://docs.chain.link/data-streams" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
        >
          Chainlink
        </a>,{" "}
        and{" "}
        <a 
          href="https://www.redstone.finance/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
        >
          RedStone
        </a>{" "}
        when issuing decentralized stablecoins.
      </p>
      <div className="rounded-sm border border-zinc-800 shadow-lg font-mono text-xs">
        <CodeBlock
          text={`function mintStablecoin(uint256 ethAmount) external {

    // Require ETH collateral
    require(msg.value == ethAmount, "Must send exact ETH amount");

    // Get ETH price from Chainlink
    bytes memory chainlinkData = chainlinkOracleContract.getLatestPrice(
        CHAINLINK_ETH_FEED,
        60
    );
    uint256 chainlinkPrice = abi.decode(chainlinkData, (uint256));

    // Get ETH price from Pyth
    bytes memory pythData = pythOracleContract.getLatestPrice(
        PYTH_ETH_FEED,
        60
    );
    uint256 pythPrice = abi.decode(pythData, (uint256));

    // Get ETH price from Redstone
    bytes memory redstoneData = redstoneOracleContract.getLatestValue(
        REDSTONE_ETH_FEED,
        60
    );
    uint256 redstonePrice = abi.decode(redstoneData, (uint256));

    // Average the prices
    uint256 avgPrice = (chainlinkPrice + pythPrice + redstonePrice) / 3;
    
    // Calculate stablecoins to mint with 200% collateralization ratio
    uint256 stableAmount = (ethAmount * avgPrice) / (2 * 1e18);
    
    // Issue stablecoins to the user
    _mint(msg.sender, stableAmount);
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