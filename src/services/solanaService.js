import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { TOKEN_CONFIG, formatTokenAmount } from '../config/tokenConfig';

// Initialize Solana connection
const connection = new Connection(
  TOKEN_CONFIG.rpcUrl || clusterApiUrl(TOKEN_CONFIG.network),
  'confirmed'
);

/**
 * Verify Solana wallet and check token balance
 * @param {string} walletAddress - The wallet address to verify
 * @returns {Promise<Object>} - Balance info and verification status
 */
export const verifyWalletAndCheckBalance = async (walletAddress) => {
  try {
    // Validate wallet address format
    let publicKey;
    try {
      publicKey = new PublicKey(walletAddress);
    } catch (error) {
      return {
        success: false,
        error: 'Invalid Solana wallet address format',
        verified: false,
        balance: '0',
      };
    }

    // Verify wallet exists
    const walletInfo = await connection.getAccountInfo(publicKey);
    if (!walletInfo) {
      return {
        success: false,
        error: 'Wallet address not found on the blockchain',
        verified: false,
        balance: '0',
      };
    }

    // Get token mint address
    const tokenMintPublicKey = new PublicKey(TOKEN_CONFIG.tokenMintAddress);

    // Get associated token account
    const associatedTokenAddress = await getAssociatedTokenAddress(
      tokenMintPublicKey,
      publicKey
    );

    // Get token account info
    const tokenAccountInfo = await connection.getAccountInfo(associatedTokenAddress);
    
    if (!tokenAccountInfo) {
      return {
        success: true,
        error: null,
        verified: false,
        balance: '0',
        message: 'No token account found. This wallet does not hold any of this token.',
      };
    }

    // Get token balance
    const parsedTokenAccount = await getAccount(connection, associatedTokenAddress);
    const tokenBalance = parsedTokenAccount.amount;
    const minimumRequired = TOKEN_CONFIG.minimumTokenBalance;

    const isVerified = tokenBalance >= minimumRequired;
    const formattedBalance = formatTokenAmount(tokenBalance);
    const formattedMinimum = formatTokenAmount(minimumRequired);

    return {
      success: true,
      error: null,
      verified: isVerified,
      balance: formattedBalance,
      rawBalance: tokenBalance.toString(),
      minimumRequired: formattedMinimum,
      message: isVerified
        ? `✅ Verified! You hold ${formattedBalance} tokens (${formattedMinimum} required)`
        : `❌ Insufficient balance. You hold ${formattedBalance} tokens but need at least ${formattedMinimum}`,
    };
  } catch (error) {
    console.error('Wallet verification error:', error);
    return {
      success: false,
      error: `Error verifying wallet: ${error.message}`,
      verified: false,
      balance: '0',
    };
  }
};

/**
 * Get wallet SOL balance
 * @param {string} walletAddress - The wallet address
 * @returns {Promise<number>} - SOL balance
 */
export const getSolBalance = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
};

/**
 * Get connection instance
 */
export const getConnection = () => connection;
