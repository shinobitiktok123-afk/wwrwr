import React, { useState, useEffect } from 'react';
import TokenVerificationModal from './TokenVerificationModal';
import Game from './Game';
import './GameContainer.css';

const GameContainer = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedWallet, setVerifiedWallet] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedWallet = sessionStorage.getItem('verifiedWallet');
    const savedBalance = sessionStorage.getItem('tokenBalance');

    if (savedWallet && savedBalance) {
      setVerifiedWallet(savedWallet);
      setTokenBalance(savedBalance);
      setIsVerified(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleVerificationSuccess = (wallet, balance) => {
    setVerifiedWallet(wallet);
    setTokenBalance(balance);
    setIsVerified(true);
    setShowModal(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('verifiedWallet');
    sessionStorage.removeItem('tokenBalance');
    setIsVerified(false);
    setVerifiedWallet(null);
    setTokenBalance(null);
    setShowModal(true);
  };

  return (
    <div className="game-container">
      {showModal && !isVerified && (
        <TokenVerificationModal
          onVerificationSuccess={handleVerificationSuccess}
          onClose={() => {}}
        />
      )}

      {isVerified && (
        <>
          <div className="game-header">
            <div className="header-content">
              <h1>🎮 MemeCoin Quest</h1>
              <div className="wallet-info">
                <span className="wallet-label">Wallet:</span>
                <span className="wallet-address">{verifiedWallet?.slice(0, 4)}...{verifiedWallet?.slice(-4)}</span>
                <span className="token-balance">💰 {tokenBalance} Tokens</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Exit
            </button>
          </div>
          <Game walletAddress={verifiedWallet} tokenBalance={tokenBalance} />
        </>
      )}
    </div>
  );
};

export default GameContainer;
