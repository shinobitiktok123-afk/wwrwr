import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = ({ walletAddress, tokenBalance }) => {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [level, setLevel] = useState(1);
  const [gameActive, setGameActive] = useState(true);
  const [enemies, setEnemies] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 80 });
  const [gameTime, setGameTime] = useState(0);

  // Initialize game
  useEffect(() => {
    spawnEnemies();
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setGameTime(t => t + 1);
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        y: enemy.y + 2,
        x: enemy.x + (Math.random() - 0.5) * 2
      })).filter(enemy => enemy.y < 100));
    }, 50);

    return () => clearInterval(interval);
  }, [gameActive]);

  const spawnEnemies = () => {
    const newEnemies = [];
    for (let i = 0; i < level + 2; i++) {
      newEnemies.push({
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: -10,
        type: Math.random() > 0.7 ? 'boss' : 'normal'
      });
    }
    setEnemies(newEnemies);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPlayerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: 80
    });
  };

  const handleShoot = (e) => {
    if (!gameActive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;

    const newEnemies = enemies.filter(enemy => {
      const distance = Math.abs(enemy.x - clickX);
      if (distance < 5) {
        setScore(s => s + (enemy.type === 'boss' ? 100 : 10));
        return false;
      }
      return true;
    });

    setEnemies(newEnemies);

    if (newEnemies.length === 0 && gameTime > 5) {
      setLevel(l => l + 1);
      spawnEnemies();
    }
  };

  useEffect(() => {
    const checkCollisions = () => {
      enemies.forEach(enemy => {
        if (Math.abs(enemy.x - playerPos.x) < 5 && enemy.y > 70) {
          setHealth(h => {
            const newHealth = h - 10;
            if (newHealth <= 0) {
              setGameActive(false);
            }
            return newHealth;
          });
        }
      });
    };

    const collisionInterval = setInterval(checkCollisions, 200);
    return () => clearInterval(collisionInterval);
  }, [enemies, playerPos]);

  return (
    <div className="game-wrapper">
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Score</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Health</span>
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${health}%` }}></div>
          </div>
          <span className="stat-value">{health}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Level</span>
          <span className="stat-value">{level}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time</span>
          <span className="stat-value">{gameTime}s</span>
        </div>
      </div>

      <div
        className="game-canvas"
        onMouseMove={handleMouseMove}
        onClick={handleShoot}
      >
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

        <div
          className="player"
          style={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
          }}
        >
          🎯
        </div>

        {!gameActive && (
          <div className="game-over-screen">
            <div className="game-over-content">
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <p>Level Reached: {level}</p>
              <button onClick={() => location.reload()}>Play Again</button>
            </div>
          </div>
        )}
      </div>

      <div className="game-instructions">
        <p>🎮 Move your crosshair | 🖱️ Click to shoot | 💰 Earn points | 🎯 Survive!</p>
      </div>
    </div>
  );
};

export default Game;
