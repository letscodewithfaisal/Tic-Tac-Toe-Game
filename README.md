# Tic Tac Toe

A two-player Tic Tac Toe game built with React and Vite.

## Features

- 3x3 interactive game board
- Two-player turn system (X / O)
- Winner detection with the winning line highlighted
- Draw detection
- Running scoreboard (wins per player + draws)
- "New round" and "Reset scores" controls
- Clear visual feedback for whose turn it is and the result

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Tic Tac Toe game"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

Make sure the repository is set to **Public** on GitHub (Settings → General → Danger Zone → Change visibility).

## Deploy a live link

The easiest options are Vercel or Netlify — both offer free hosting and deploy straight from a GitHub repo.

### Vercel
1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project**, select this repo.
3. Framework preset: **Vite**. Leave build settings as default (`npm run build`, output dir `dist`).
4. Click **Deploy**. You'll get a live URL like `https://tic-tac-toe-yourname.vercel.app`.

### Netlify
1. Go to https://app.netlify.com and sign in with GitHub.
2. Click **Add new site → Import an existing project**, select this repo.
3. Build command: `npm run build`, publish directory: `dist`.
4. Click **Deploy site**. You'll get a live URL like `https://tic-tac-toe-yourname.netlify.app`.

## Project structure

```
tic-tac-toe/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx          # App shell
│   ├── TicTacToe.jsx     # Game component (board, logic, UI)
│   └── index.css        # Page-level styles
└── README.md
```
