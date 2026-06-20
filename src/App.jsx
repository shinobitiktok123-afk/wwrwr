import React, { useState, useEffect } from 'react'
import VerificationModal from './components/VerificationModal'
import GameScreen from './components/GameScreen'
import './App.css'

function App() {
  const [verified, setVerified] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('verified')
    if (saved) {
      setVerified(true)
      setWallet(sessionStorage.getItem('wallet'))
      setBalance(sessionStorage.getItem('balance'))
    }
  }, [])

  const handleVerify = (walletAddr, tokenBalance) => {
    sessionStorage.setItem('verified', 'true')
    sessionStorage.setItem('wallet', walletAddr)
    sessionStorage.setItem('balance', tokenBalance)
    setWallet(walletAddr)
    setBalance(tokenBalance)
    setVerified(true)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    setVerified(false)
    setWallet(null)
    setBalance(null)
  }

  return (
    <div className="app">
      {!verified ? (
        <VerificationModal onVerify={handleVerify} />
      ) : (
        <GameScreen wallet={wallet} balance={balance} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
