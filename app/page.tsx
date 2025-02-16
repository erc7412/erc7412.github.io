'use client';

import React from "react";
import { CodeBlock, railscast } from "react-code-blocks";
import { Button } from "@/components/ui/button";
import { Github, Package, BookOpen } from "lucide-react";

function HomeContent() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <div className="bg-zinc-900/50 rounded-sm shadow-lg p-10 mb-12 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.33)]">
          <h1 className="text-5xl md:text-7xl font-semibold mb-3 text-white tracking-tight">ERC-7412</h1>
          <h2 className="text-xl md:text-3xl text-zinc-400 mb-9 font-medium">
            Use oracle data onchain
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed mb-3">
            ERC-7412 is a standard that allows smart contracts to seamlessly 
            retrieve cryptographically-signed prices, cross-chain data, and more.</p>

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
        </div>

        <div className="bg-zinc-900/50 rounded-sm shadow-lg p-10 mb-12 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.6)]">
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
              customStyle={{
                padding: '0.75rem',
                backgroundColor: '#000000'
              }}
            />
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-sm shadow-lg p-10 border border-zinc-800 backdrop-blur-sm ring-1 ring-inset ring-white/[0.05] [box-shadow:inset_0_2px_20px_rgba(0,0,0,0.33)]">
          <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Integrate real-world price data</h2>
          <p className="text-zinc-300 mb-8 text-lg">
            Average prices from{" "}
            <a 
              href="https://docs.chain.link/data-streams" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
            >
              Chainlink
            </a>{" "}
            ,{" "}
            <a 
              href="https://www.pyth.network/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium border-b border-zinc-700 hover:border-zinc-500"
            >
              Pyth
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
            and mint a stablecoin.
          </p>
          <div className="rounded-sm border border-zinc-800 shadow-lg">
            <CodeBlock
              text={`function mintStablecoin(uint256 ethAmount) external {
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
    
    // Require ETH collateral
    require(msg.value == ethAmount, "Must send exact ETH amount");
    
    // Mint stablecoins to user
    _mint(msg.sender, stableAmount);
}`}
              language="solidity"
              theme={railscast}
              customStyle={{
                padding: '0.75rem',
                backgroundColor: '#000000'
              }}
            />
          </div>
        </div>


        </div>
    </div>
  );
}

export default function HomePage() {
  return (
        <HomeContent />
  );
}
