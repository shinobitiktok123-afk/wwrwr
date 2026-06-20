import React, { useState } from 'react'
import { verifyWallet } from '../services/solanaService'
import './VerificationModal.css'

function VerificationModal({ onVerify }) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const result = await verifyWallet(address)
      if (result.verified) {
        setSuccess('✅ Wallet Verified! Loading game...')
        setTimeout(() => onVerify(address, result.balance), 1500)
      } else {
        setError(result.message || '❌ Verification failed')
      }
    } catch (err) {
      setError('Error verifying wallet: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1>🎮 MemeCoin Quest</h1>
        <p>Hold 200K Tokens to Play</p>

        <div className="info-cards">
          <div className="info-card">
            <span className="label">Required</span>
            <span className="value">200,000 Tokens</span>
          </div>
          <div className="info-card">
            <span className="label">Network</span>
            <span className="value">Solana Mainnet</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Solana Wallet Address</label>
            <input
              type="text"
              placeholder="Enter your wallet address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
              className="input"
            />
          </div>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <button type="submit" disabled={loading || !address} className="btn-verify">
            {loading ? '⏳ Verifying...' : '🔍 Verify Wallet'}
          </button>
        </form>

        <p className="security-note">🔒 Your address is never stored</p>
      </div>
    </div>
  )
}

export default VerificationModal
