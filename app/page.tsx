'use client';

import React from "react";
import { CodeBlock, railscast } from "react-code-blocks";
import { Button } from "@/components/ui/button";
import { Github, Package, BookOpen, Copy, Check } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

function HomeContent() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Add refs and useInView hooks for each section
  const heroRef = React.useRef(null);
  const oraclesRef = React.useRef(null);
  const examplesHeaderRef = React.useRef(null);
  const crossChainRef = React.useRef(null);
  const priceDataRef = React.useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const oraclesInView = useInView(oraclesRef, { once: true });
  const examplesHeaderInView = useInView(examplesHeaderRef, { once: true });
  const crossChainInView = useInView(crossChainRef, { once: true });
  const priceDataInView = useInView(priceDataRef, { once: true });

  const basePath = process.env.NODE_ENV === 'production' ? '/erc7412' : '';

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,0.5),rgba(0,0,0,0.5))]" />
      
      <motion.div 
        className="container mx-auto px-4 max-w-3xl py-24"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.4
        }}
      >
        <motion.div 
          ref={heroRef}
          className="bg-zinc-900/50 rounded-sm shadow-lg p-10 mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.33)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: heroInView ? 1 : 0, 
            y: heroInView ? 0 : 20 
          }}
          transition={{
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1]
          }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">ERC-7412</h1>
          <h2 className="text-xl md:text-3xl text-zinc-400 mb-9 font-medium">
            Use oracle data onchain
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed mb-3">
            ERC-7412 is a standard that allows smart contracts on Ethereum to 
            use cryptographically-signed prices, cross-chain data, and more.</p>

          <p className="text-zinc-300 text-lg leading-relaxed">
            The idea is simple. When a function requires offchain data, it throws an
            <code className="inline bg-zinc-800 px-2 py-1 rounded mx-1 text-zinc-200 font-mono text-sm">
              OracleDataRequired
            </code>error 
            during simulation. The client library then fetches and prepends the required data to the
            transaction automatically.
          </p>
          <div className="flex flex-wrap gap-5 mt-8">
            <Button
              variant="outline"
              className="px-4"
              size="lg"
              onClick={() => window.open('https://www.npmjs.com/package/erc7412', '_blank')}
            >
              <Package className="mr-1 h-4 w-4" />
              Install Client Library
            </Button>
            <Button
              variant="outline"
              className="px-4"
              size="lg"
              onClick={() => window.open('https://github.com/erc7412/erc7412', '_blank')}
            >
              <Github className="mr-1 h-4 w-4" />
              View on GitHub
            </Button>
            <Button
              variant="outline"
              className="px-4"
              size="lg"
              onClick={() => window.open('https://eips.ethereum.org/EIPS/eip-7412', '_blank')}
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Read the ERC
            </Button>
          </div>
        </motion.div>

        <motion.div 
          ref={oraclesRef}
          className="bg-zinc-900/50 rounded-sm shadow-lg p-10 mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.6)]"
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
          <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">
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
                          src={`${basePath}/cannon.svg`}
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

        <motion.h2 
          ref={examplesHeaderRef}
          className="backdrop-blur-sm pt-24 mb-24 text-muted-foreground text-mono font-medium tracking-widest uppercase text-lg flex items-center justify-center"
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
          <div className="h-[1px] w-full bg-zinc-800"></div>
          <span className="px-4">Examples</span>
          <div className="h-[1px] w-full bg-zinc-800"></div>
        </motion.h2>

        <motion.div 
          ref={crossChainRef}
          className="bg-zinc-900/50 rounded-sm shadow-lg p-10 mb-24 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.6)]"
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
          <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Reference data from any chain</h2>
          <p className="text-zinc-300 mb-8 text-lg">
            Verify ENS ownership on an L2 via{" "}
            <a 
              href="https://wormhole.com/products/queries" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
            >
              Wormhole Queries
            </a>.
          </p>
          <div className="rounded-sm border border-zinc-800 shadow-lg">
            <CodeBlock
              text={`function verifyENSOwnership(address user, bytes ensNameNode) internal {
    // Query ENS ownership data from mainnet via Wormhole
    bytes memory ownerData = wormholeOracleContract.retrieveCrossChainData(
        1,  // Ethereum mainnet chain ID
        "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", // Address of ENS Universal Resolver Contract
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
                padding: '0.75rem',
                backgroundColor: '#000000'
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          ref={priceDataRef}
          className="bg-zinc-900/50 rounded-sm shadow-lg p-10 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.33)]"
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
          <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Integrate price data</h2>
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
              Redstone
            </a>{" "}
            when issuing a decentralized stablecoin.
          </p>
          <div className="rounded-sm border border-zinc-800 shadow-lg">
            <CodeBlock
              text={`function mintStablecoin(uint256 ethAmount) external {
    // Require ETH collateral
    require(msg.value == ethAmount, "Must send exact ETH amount");

    // Get ETH price from Chainlink
    bytes memory chainlinkData = chainlinkOracleContract.retrieveOracleData(
        CHAINLINK_ETH_FEED,
        abi.encodeWithSelector(IChainlinkFeed.latestAnswer.selector)
    );
    uint256 chainlinkPrice = abi.decode(chainlinkData, (uint256));

    // Get ETH price from Pyth
    bytes memory pythData = pythOracleContract.retrieveOracleData(
        PYTH_ETH_FEED,
        abi.encodeWithSelector(IPythFeed.getPrice.selector)
    );
    uint256 pythPrice = abi.decode(pythData, (uint256));

    // Get ETH price from Redstone
    bytes memory redstoneData = redstoneOracleContract.retrieveOracleData(
        REDSTONE_ETH_FEED,
        abi.encodeWithSelector(IRedstoneOracle.getValue.selector)
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
                padding: '0.75rem',
                backgroundColor: '#000000'
              }}
            />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default function HomePage() {
  return (
        <HomeContent />
  );
}
