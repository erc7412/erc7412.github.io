'use client';

import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

function HomeContent() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 max-w-3xl py-16">
        {/* Header Section */}
        <div className="bg-zinc-900/50 rounded-3xl shadow-lg p-10 mb-10 border border-zinc-800 backdrop-blur-sm">
          <h1 className="text-6xl font-bold mb-2 text-white tracking-tighter">ERC-7412</h1>
          <h2 className="text-2xl text-zinc-400 mb-6">
            Use oracle data onchain
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            ERC-7412 is a standard that allows smart contracts to seamlessly 
            retrieve cryptographically-signed data like price feeds or cross-chain data.
            When a contract function requires data from an external source, it throws{" "}
            <code className="bg-zinc-800 px-2 py-1 rounded mx-1 text-zinc-200 font-mono text-sm">
              OracleDataRequired
            </code>{" "}
            during simulation. The client library automatically fetches and prepends the required data to the
            transaction.{" "}
            <a 
              href="https://eips.ethereum.org/EIPS/eip-7412" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-violet-500 transition-colors duration-200 font-medium"
            >
              Read the ERC
            </a>
          </p>
        </div>

        <div className="bg-zinc-900/50 rounded-2xl shadow-lg p-10 border border-zinc-800 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4 text-white tracking-tight">Integrate real-world price data</h2>
          <p className="text-zinc-300 mb-6 font-medium">
            Average prices from{" "}
            <a 
              href="https://docs.chain.link/data-streams" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-violet-500 transition-colors duration-200 font-medium"
            >
              Chainlink
            </a>{" "}
            ,{" "}
            <a 
              href="https://www.pyth.network/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-violet-500 transition-colors duration-200 font-medium"
            >
              Pyth
            </a>,{" "}
            and{" "}
            <a 
              href="https://www.redstone.finance/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-violet-500 transition-colors duration-200 font-medium"
            >
              Redstone
            </a>{" "}
            for ETH and mint a stablecoin.
          </p>
          <div className="rounded-xl overflow-hidden border border-zinc-800">
            <CopyBlock
              text={`function mintStablecoin(uint256 ethAmount) external {
    // Get Chainlink price
    bytes memory chainlinkData = chainlinkOracleContract.retrieveOracleData(
        CHAINLINK_ETH_FEED,
        abi.encodeWithSelector(IChainlinkFeed.latestAnswer.selector)
    );
    uint256 chainlinkPrice = abi.decode(chainlinkData, (uint256));

    // Get Pyth price
    bytes memory pythData = pythOracleContract.retrieveOracleData(
        PYTH_ETH_FEED,
        abi.encodeWithSelector(IPythFeed.getPrice.selector)
    );
    uint256 pythPrice = abi.decode(pythData, (uint256));

    // Get Redstone price
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
              language="javascript"
              theme={dracula}
              codeBlock
              customStyle={{
                borderRadius: '12px',
                padding: '20px',
              }}
            />
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-2xl shadow-lg p-10 mt-10 border border-zinc-800 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4 text-white tracking-tight">Reference data from any chain</h2>
          <p className="text-zinc-300 mb-6 font-medium">
            Verify ENS ownership on an L2 via{" "}
            <a 
              href="https://wormhole.com/products/queries" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-violet-500 transition-colors duration-200 font-medium"
            >
              Wormhole Queries
            </a>.
          </p>
          <div className="rounded-xl overflow-hidden border border-zinc-800">
            <CopyBlock
              text={`function verifyENSOwnership(address user, string calldata ensName) internal {
    // Query ENS ownership data from mainnet via Wormhole
    bytes memory ownerData = wormholeOracleContract.retrieveCrossChainData(
        1,  // Ethereum mainnet chainId
        ENS_REGISTRY, 
        abi.encodeWithSelector(
            IENSRegistry.owner.selector,
            keccak256(bytes(ensName))
        )
    );
    
    address ensOwner = abi.decode(ownerData, (address));
    require(ensOwner == user, "User does not own this ENS name");
}`}
              language="javascript"
              theme={dracula}
              codeBlock
              customStyle={{
                borderRadius: '12px',
                padding: '20px',
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
