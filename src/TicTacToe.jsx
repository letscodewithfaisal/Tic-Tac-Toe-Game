import React, { useState, useMemo, useCallback } from "react";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateResult(squares) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  if (squares.every((s) => s !== null)) {
    return { winner: "draw", line: null };
  }
  return null;
}

function Square({ value, onClick, highlighted, disabled }) {
  return (
    <button
      className={`square ${value ? `filled ${value.toLowerCase()}` : ""} ${
        highlighted ? "win" : ""
      }`}
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={value ? `Square filled with ${value}` : "Empty square"}
    >
      {value === "X" && (
        <svg viewBox="0 0 100 100" className="mark">
          <line x1="20" y1="20" x2="80" y2="80" />
          <line x1="80" y1="20" x2="20" y2="80" />
        </svg>
      )}
      {value === "O" && (
        <svg viewBox="0 0 100 100" className="mark">
          <circle cx="50" cy="50" r="32" />
        </svg>
      )}
    </button>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [scoredThisRound, setScoredThisRound] = useState(false);

  const result = useMemo(() => calculateResult(squares), [squares]);
  const currentPlayer = xIsNext ? "X" : "O";

  const handleClick = useCallback(
    (i) => {
      if (squares[i] || result) return;
      const next = squares.slice();
      next[i] = currentPlayer;
      setSquares(next);
      setXIsNext(!xIsNext);
    },
    [squares, xIsNext, currentPlayer, result]
  );

  if (result && !scoredThisRound) {
    setScoredThisRound(true);
    setScores((prev) => {
      if (result.winner === "draw") return { ...prev, draws: prev.draws + 1 };
      return { ...prev, [result.winner]: prev[result.winner] + 1 };
    });
  }

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScoredThisRound(false);
  };

  const resetAll = () => {
    resetBoard();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  let statusText;
  let statusClass = "";
  if (result && result.winner === "draw") {
    statusText = "It's a draw";
    statusClass = "draw";
  } else if (result) {
    statusText = `Player ${result.winner} wins`;
    statusClass = result.winner.toLowerCase();
  } else {
    statusText = `Player ${currentPlayer}'s turn`;
    statusClass = currentPlayer.toLowerCase();
  }

  return (
    <div className="ttt-app">
      <style>{`
        .ttt-app {
          --ink: #1b1a17;
          --paper: #faf6ee;
          --paper-2: #f1ead9;
          --line: #d8cdb4;
          --x-color: #b1502f;
          --o-color: #2c6e63;
          --draw-color: #8a7a55;
          max-width: 480px;
          margin: 0 auto;
          padding: 2rem 1.5rem 2.5rem;
          background: var(--paper);
          border-radius: 20px;
          font-family: 'Georgia', 'Iowan Old Style', serif;
          color: var(--ink);
          box-shadow: 0 1px 0 rgba(0,0,0,0.05);
        }
        .ttt-title {
          text-align: center;
          font-size: 1.9rem;
          letter-spacing: 0.04em;
          margin: 0 0 0.25rem;
          font-weight: 700;
        }
        .ttt-sub {
          text-align: center;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9a8f72;
          margin: 0 0 1.5rem;
        }
        .scoreboard {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .score-card {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 0.7rem 0.4rem;
          text-align: center;
        }
        .score-label {
          font-family: -apple-system, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9a8f72;
          margin-bottom: 0.3rem;
        }
        .score-value {
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1;
        }
        .score-card.x .score-value { color: var(--x-color); }
        .score-card.o .score-value { color: var(--o-color); }
        .score-card.draw .score-value { color: var(--draw-color); }
        .status-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.65rem 1rem;
          border-radius: 999px;
          background: var(--paper-2);
          border: 1px solid var(--line);
          margin-bottom: 1.5rem;
          font-family: -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          transition: background 0.25s ease;
        }
        .status-bar.x { color: var(--x-color); }
        .status-bar.o { color: var(--o-color); }
        .status-bar.draw { color: var(--draw-color); }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: currentColor;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          background: var(--line);
          padding: 8px;
          border-radius: 16px;
          margin: 0 auto 1.5rem;
        }
        .square {
          position: relative;
          aspect-ratio: 1 / 1;
          background: var(--paper);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .square:hover:not(.filled) {
          background: var(--paper-2);
        }
        .square:active:not(.filled) {
          transform: scale(0.96);
        }
        .square.filled {
          cursor: default;
        }
        .mark {
          width: 55%;
          height: 55%;
          fill: none;
          stroke-width: 9;
          stroke-linecap: round;
          animation: pop 0.22s ease-out;
        }
        .square.x .mark { stroke: var(--x-color); }
        .square.o .mark { stroke: var(--o-color); }
        .square.win {
          background: #fff2c4;
        }
        @keyframes pop {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          font-family: -apple-system, sans-serif;
        }
        .btn {
          border: 1px solid var(--ink);
          background: var(--ink);
          color: var(--paper);
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.1s ease;
        }
        .btn:hover { opacity: 0.85; }
        .btn:active { transform: scale(0.97); }
        .btn.secondary {
          background: transparent;
          color: var(--ink);
        }
      `}</style>

      <h1 className="ttt-title">Tic&nbsp;Tac&nbsp;Toe</h1>
      <p className="ttt-sub">Two players, one board</p>

      <div className="scoreboard">
        <div className="score-card x">
          <div className="score-label">Player X</div>
          <div className="score-value">{scores.X}</div>
        </div>
        <div className="score-card draw">
          <div className="score-label">Draws</div>
          <div className="score-value">{scores.draws}</div>
        </div>
        <div className="score-card o">
          <div className="score-label">Player O</div>
          <div className="score-value">{scores.O}</div>
        </div>
      </div>

      <div className={`status-bar ${statusClass}`}>
        {!result && <span className="status-dot" />}
        {statusText}
      </div>

      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => handleClick(i)}
            highlighted={!!result?.line?.includes(i)}
            disabled={!!result}
          />
        ))}
      </div>

      <div className="controls">
        <button className="btn" onClick={resetBoard}>
          New round
        </button>
        <button className="btn secondary" onClick={resetAll}>
          Reset scores
        </button>
      </div>
    </div>
  );
}
