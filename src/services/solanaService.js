import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'

const TOKEN_MINT = import.meta.env.VITE_MEMECOIN_TOKEN_ADDRESS || 'EPjFWaYPg7DuBjwBa8V9CGAcsVUFhLupa2GT2t8MN6j'
const MIN_TOKENS = 200000n
const DECIMALS = 6

const connection = new Connection(
  import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta'),
  'confirmed'
)

export async function verifyWallet(walletAddress) {
  try {
    let publicKey
    try {
      publicKey = new PublicKey(walletAddress)
    } catch (e) {
      return {
        verified: false,
        balance: '0',
        message: '❌ Invalid wallet address',
      }
    }

    const walletInfo = await connection.getAccountInfo(publicKey)
    if (!walletInfo) {
      return {
        verified: false,
        balance: '0',
        message: '❌ Wallet not found on blockchain',
      }
    }

    try {
      const tokenMint = new PublicKey(TOKEN_MINT)
      const ataAddress = await getAssociatedTokenAddress(tokenMint, publicKey)
      const tokenAccount = await getAccount(connection, ataAddress)
      
      const balance = tokenAccount.amount
      const isVerified = balance >= MIN_TOKENS

      const displayBalance = (Number(balance) / Math.pow(10, DECIMALS)).toFixed(2)
      const displayMinimum = (Number(MIN_TOKENS) / Math.pow(10, DECIMALS)).toFixed(0)

      if (isVerified) {
        return {
          verified: true,
          balance: displayBalance,
          message: `✅ Verified! You hold ${displayBalance} tokens`,
        }
      } else {
        return {
          verified: false,
          balance: displayBalance,
          message: `❌ Need ${displayMinimum} tokens, you have ${displayBalance}`,
        }
      }
    } catch (e) {
      return {
        verified: false,
        balance: '0',
        message: '❌ No token account found. You need to hold tokens first.',
      }
    }
  } catch (error) {
    console.error('Verification error:', error)
    return {
      verified: false,
      balance: '0',
      message: '❌ Error verifying wallet',
    }
  }
}
