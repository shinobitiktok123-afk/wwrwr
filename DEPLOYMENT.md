# Deployment Guide

## Prerequisites
- Node.js 16+
- npm or yarn
- Git

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Deploy to Vercel

1. Push code to GitHub
2. Visit vercel.com
3. Import your repository
4. Add environment variables:
   - `VITE_MEMECOIN_TOKEN_ADDRESS`
   - `VITE_MINIMUM_TOKEN_BALANCE`
   - `VITE_TOKEN_DECIMALS`
5. Deploy!

## Deploy to Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Deploy to GitHub Pages

1. Update `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/wwrwr/',
     // ...
   })
   ```
2. Build: `npm run build`
3. Deploy dist/ folder to gh-pages branch

## Docker Deployment

```bash
docker build -t memecoin-quest .
docker run -p 3000:3000 memecoin-quest
```

## Environment Variables

Set these in your hosting platform:

```
VITE_MEMECOIN_TOKEN_ADDRESS=YOUR_TOKEN_MINT
VITE_MINIMUM_TOKEN_BALANCE=200000
VITE_TOKEN_DECIMALS=6
VITE_SOLANA_NETWORK=mainnet-beta
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Performance Optimization

- Images are optimized
- CSS is minified
- JavaScript is bundled and minified
- No external CDN dependencies

## Monitoring

- Monitor gas prices and RPC performance
- Track player verification success rates
- Monitor game analytics

For more support, check README.md
