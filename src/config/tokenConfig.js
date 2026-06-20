// Memecoin Token Configuration
export const TOKEN_CONFIG = {
  // Token mint address - Replace with your actual memecoin token address
  tokenMintAddress: process.env.VITE_MEMECOIN_TOKEN_ADDRESS || 'YOUR_TOKEN_MINT_ADDRESS',
  
  // Minimum tokens required to play (200k tokens)
  minimumTokenBalance: BigInt(process.env.VITE_MINIMUM_TOKEN_BALANCE || '200000'),
  
  // Token decimals (adjust based on your token's decimals)
  tokenDecimals: parseInt(process.env.VITE_TOKEN_DECIMALS || '6'),
  
  // Solana network configuration
  network: process.env.VITE_SOLANA_NETWORK || 'mainnet-beta',
  rpcUrl: process.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
};

// Calculate display amount (accounting for decimals)
export const formatTokenAmount = (amount) => {
  return (Number(amount) / Math.pow(10, TOKEN_CONFIG.tokenDecimals)).toFixed(2);
};

// Format as raw amount (with decimals)
export const parseTokenAmount = (amount) => {
  return BigInt(Math.floor(amount * Math.pow(10, TOKEN_CONFIG.tokenDecimals)));
};
