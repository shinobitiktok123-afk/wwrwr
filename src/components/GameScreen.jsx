import React, { useState, useEffect } from 'react'
import './GameScreen.css'

function GameScreen({ wallet, balance, onLogout }) {
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(100)
  const [level, setLevel] = useState(1)
  const [gameActive, setGameActive] = useState(true)
  const [enemies, setEnemies] = useState([])
  const [playerX, setPlayerX] = useState(50)
  const [time, setTime] = useState(0)

  useEffect(() => {
    spawnEnemies()
  }, [])

  useEffect(() => {
    if (!gameActive) return
    const interval = setInterval(() => {
      setTime(t => t + 1)
      setEnemies(prev =>
        prev
          .map(e => ({ ...e, y: e.y + 2 }))
          .filter(e => e.y < 100)
      )
    }, 100)
    return () => clearInterval(interval)
  }, [gameActive])

  const spawnEnemies = () => {
    const newEnemies = []
    for (let i = 0; i < level + 2; i++) {
      newEnemies.push({
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: -10,
        type: Math.random() > 0.7 ? 'boss' : 'normal',
      })
    }
    setEnemies(newEnemies)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPlayerX(((e.clientX - rect.left) / rect.width) * 100)
  }

  const handleShoot = (e) => {
    if (!gameActive) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * 100

    let newScore = score
    const remaining = enemies.filter(enemy => {
      const dist = Math.abs(enemy.x - clickX)
      if (dist < 8) {
        newScore += enemy.type === 'boss' ? 100 : 10
        return false
      }
      return true
    })

    setScore(newScore)
    setEnemies(remaining)

    if (remaining.length === 0 && time > 3) {
      setLevel(l => l + 1)
      spawnEnemies()
    }
  }

  useEffect(() => {
    const checkCollisions = () => {
      enemies.forEach(enemy => {
        if (Math.abs(enemy.x - playerX) < 6 && enemy.y > 70) {
          setHealth(h => {
            const newHealth = h - 15
            if (newHealth <= 0) {
              setGameActive(false)
            }
            return Math.max(0, newHealth)
          })
        }
      })
    }

    const interval = setInterval(checkCollisions, 200)
    return () => clearInterval(interval)
  }, [enemies, playerX])

  return (
    <div className="game-screen">
      <div className="game-header">
        <h1>🎮 MemeCoin Quest</h1>
        <div className="wallet-display">
          <span>👛 {wallet?.slice(0, 6)}...{wallet?.slice(-4)}</span>
          <span className="balance">💰 {balance} Tokens</span>
        </div>
        <button className="btn-exit" onClick={onLogout}>
          🚪 Exit
        </button>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="label">Score</span>
          <span className="value">{score}</span>
        </div>
        <div className="stat">
          <span className="label">Health</span>
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${health}%` }}></div>
          </div>
          <span className="value">{health}%</span>
        </div>
        <div className="stat">
          <span className="label">Level</span>
          <span className="value">{level}</span>
        </div>
        <div className="stat">
          <span className="label">Time</span>
          <span className="value">{time}s</span>
        </div>
      </div>

      <div className="game-canvas" onMouseMove={handleMouseMove} onClick={handleShoot}>
        {enemies.map(enemy => (
          <div
            key={enemy.id}
            className={`enemy ${enemy.type}`}
            style={{
              left: `${enemy.x}%`,
              top: `${enemy.y}%`,
            }}
          >
            {enemy.type === 'boss' ? '👿' : '👾'}
          </div>
        ))}

        <div className="player" style={{ left: `${playerX}%` }}>
          🎯
        </div>

        {!gameActive && (
          <div className="game-over">
            <div className="game-over-content">
              <h2>Game Over! 💀</h2>
              <p>Score: {score}</p>
              <p>Level: {level}</p>
              <button onClick={() => location.reload()}>Play Again</button>
            </div>
          </div>
        )}
      </div>

      <div className="controls-info">
        🎮 Move Mouse | 🖱️ Click to Shoot | 💪 Survive!
      </div>
    </div>
  )
}

export default GameScreen
