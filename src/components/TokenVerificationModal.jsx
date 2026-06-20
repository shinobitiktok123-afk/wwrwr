import React, { useState } from 'react';
import { verifyWalletAndCheckBalance } from '../services/solanaService';
import './TokenVerificationModal.css';

const TokenVerificationModal = ({ onVerificationSuccess, onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyWallet = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      setLoading(false);
      return;
    }

    try {
      const result = await verifyWalletAndCheckBalance(walletAddress);
      setVerificationResult(result);

      if (result.success && result.verified) {
        setSuccess(result.message);
        // Store verified wallet in session
        sessionStorage.setItem('verifiedWallet', walletAddress);
        sessionStorage.setItem('tokenBalance', result.balance);
        
        // Call success callback after 1.5 seconds
        setTimeout(() => {
          onVerificationSuccess(walletAddress, result.balance);
        }, 1500);
      } else if (result.success && !result.verified) {
        setError(result.message);
      } else {
        setError(result.error || 'Verification failed');
      }
    } catch (err) {
      setError('Error verifying wallet. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasteAddress = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setWalletAddress(text);
    } catch (err) {
      setError('Failed to paste from clipboard');
    }
  };

  return (
    <div className="token-verification-overlay">
      <div className="token-verification-modal">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h1>🎮 MemeCoin Quest</h1>
          <p>Verify Your Token Holdings</p>
        </div>

        <div className="modal-content">
          <div className="verification-info">
            <div className="info-box">
              <span className="info-label">Required to Play:</span>
              <span className="info-value">200,000 Tokens</span>
            </div>
            <div className="info-box">
              <span className="info-label">Network:</span>
              <span className="info-value">Solana Mainnet</span>
            </div>
          </div>

          <form onSubmit={handleVerifyWallet} className="verification-form">
            <div className="input-group">
              <label htmlFor="wallet-address">Solana Wallet Address</label>
              <div className="input-wrapper">
                <input
                  id="wallet-address"
                  type="text"
                  placeholder="Enter your Solana wallet address (e.g., 4zM...)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  disabled={loading}
                  className="wallet-input"
                />
                <button
                  type="button"
                  onClick={handlePasteAddress}
                  disabled={loading}
                  className="paste-btn"
                  title="Paste from clipboard"
                >
                  📋
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <span>⚠️</span> {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <span>✅</span> {success}
              </div>
            )}

            {verificationResult && (
              <div className="verification-details">
                <div className="detail-row">
                  <span>Your Balance:</span>
                  <strong>{verificationResult.balance} Tokens</strong>
                </div>
                <div className="detail-row">
                  <span>Required:</span>
                  <strong>{verificationResult.minimumRequired} Tokens</strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <strong className={verificationResult.verified ? 'verified' : 'unverified'}>
                    {verificationResult.verified ? '✅ VERIFIED' : '❌ UNVERIFIED'}
                  </strong>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !walletAddress.trim()}
              className="verify-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Verifying...
                </>
              ) : (
                '🔍 Verify Wallet'
              )}
            </button>
          </form>

          <div className="modal-footer">
            <p className="security-note">
              🔒 <strong>Your wallet address is only used for verification and is never stored.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenVerificationModal;
