# MemeCoin Quest 🎮💎

A token-gated gaming experience built on Solana blockchain. Players must hold at least 200,000 memecoin tokens to access and play the game.

## 🚀 Features

- **Solana Wallet Verification**: Connect and verify your wallet directly in the browser
- **Token Balance Checking**: Automatic validation that you hold the required 200K tokens
- **Interactive Game**: Fast-paced action game with leveling system
- **Real-time Stats**: Score tracking, health management, and level progression
- **Beautiful UI**: Cyberpunk-themed interface with smooth animations
- **Mobile Responsive**: Works on desktop and mobile devices
- **Secure**: No wallet private keys stored, only address verification

## 📋 Requirements

- Node.js 16+
- npm or yarn
- Solana wallet (Phantom, Solflare, etc.)
- 200,000+ memecoin tokens

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Update .env with your token mint address
# VITE_MEMECOIN_TOKEN_ADDRESS=YOUR_TOKEN_MINT_HERE

# Start development server
npm run dev

# Build for production
npm run build
```

## ⚙️ Configuration

Edit `.env` file to configure:

- `VITE_MEMECOIN_TOKEN_ADDRESS`: Your SPL token mint address
- `VITE_MINIMUM_TOKEN_BALANCE`: Required tokens to play (default: 200000)
- `VITE_TOKEN_DECIMALS`: Your token's decimal places
- `VITE_SOLANA_NETWORK`: Network (mainnet-beta, testnet, devnet)
- `VITE_SOLANA_RPC_URL`: Custom RPC endpoint (optional)

## 🎮 How to Play

1. **Verify Wallet**: Enter your Solana wallet address
2. **Confirm Balance**: System verifies you hold 200K+ tokens
3. **Start Game**: Move mouse to aim, click to shoot
4. **Survive**: Dodge incoming enemies and rack up points
5. **Level Up**: Defeat all enemies to progress to the next level

## 🔒 Security

- No wallet private keys are ever stored or transmitted
- Only wallet address is used for token balance verification
- All verification happens client-side when possible
- Solana RPC queries are read-only

## 📁 Project Structure

```
src/
├── components/
│   ├── TokenVerificationModal.jsx   # Wallet verification UI
│   ├── GameContainer.jsx             # Main game container
│   ├── Game.jsx                      # Game logic and rendering
│   └── *.css                         # Component styles
├── config/
│   └── tokenConfig.js                # Token configuration
├── services/
│   └── solanaService.js              # Solana blockchain interactions
├── App.jsx                           # Root component
├── main.jsx                          # React entry point
└── App.css                           # Global styles
```

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```bash
docker build -t memecoin-quest .
docker run -p 3000:3000 memecoin-quest
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - Feel free to use this project for your own memecoin projects!

## 🎨 Customization

- **Colors**: Edit CSS files to change the cyberpunk theme
- **Game Difficulty**: Adjust enemy spawn rates and damage in Game.jsx
- **Token Requirements**: Change VITE_MINIMUM_TOKEN_BALANCE in .env
- **Game Mechanics**: Modify Game.jsx component

## 🐛 Troubleshooting

**"Invalid Solana wallet address"**
- Ensure you're entering a valid Solana address (base58, ~44 chars)

**"No token account found"**
- Your wallet doesn't have any of this token yet
- Need to acquire tokens first

**"Insufficient balance"**
- You need to hold at least 200K tokens
- Purchase more tokens to unlock the game

**RPC connection errors**
- Check your internet connection
- Try switching networks in .env
- Use a different RPC endpoint

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by Solana Web3.js
- Token verification via SPL Token program

---

**Happy gaming! 🎮 May your tokens multiply! 💎**
