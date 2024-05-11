import React, { useState, useEffect } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O'>('X');
  const [aiName] = useState<string>('AI');
  const [greeting, setGreeting] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (currentPlayer === 'O' && !winner && gameStarted) {
      const delay = setTimeout(() => {
        const bestMoveIndex = getBestMove(board, 'O');
        handleCellClick(bestMoveIndex);
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [board, currentPlayer, winner, gameStarted]);

  const handleCellClick = (index: number) => {
    if (!board[index] && !winner && gameStarted) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board: Array<string | null>, player: string) => {
    const winConditions: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }

    if (!winner && board.every(cell => cell !== null)) {
      setWinner('tie');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer('X');
    setGreeting(`Welcome, ${playerName}!`);
    setGameStarted(false);
  };

  const startGame = () => {
    if (playerName && playerSymbol) {
      setGreeting(`Welcome, ${playerName}!`);
      setGameStarted(true);
    }
  };

  const getBestMove = (board: Array<string | null>, player: string): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = player;
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const minimax = (board: Array<string | null>, depth: number, isMaximizing: boolean): number => {
    const scores = {
      X: -10,
      O: 10,
      tie: 0
    };

    const result = checkResult(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = 'O';
          const score = minimax(newBoard, depth + 1, false);
          bestScore = Math.max(bestScore, score);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = 'X';
          const score = minimax(newBoard, depth + 1, true);
          bestScore = Math.min(bestScore, score);
        }
      }
      return bestScore;
    }
  };

  const checkResult = (board: Array<string | null>): string | null => {
    const winConditions: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as string;
      }
    }

    if (board.every(cell => cell !== null)) {
      return 'tie';
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl text-center text-orangered mb-8">TIC TAC TOE</h1>
      {!gameStarted ? (
        <div>
          <label className="flex items-center mb-4">
            Enter your name:
            <input
              type="text"
              className="border border-gray-400 rounded-md px-3 py-1 ml-2"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </label>
          <label className="flex items-center mb-4">
            Choose your symbol:
            <select
              className="border border-gray-400 rounded-md px-3 py-1 ml-2"
              value={playerSymbol}
              onChange={(e) => setPlayerSymbol(e.target.value as 'X' | 'O')}
            >
              <option value="X">X</option>
              <option value="O">O</option>
            </select>
          </label>
          <button
            className="border border-dodgerblue bg-blue-500 rounded-md px-4 py-2 mt-2 text-dodgerblue text-lg hover:bg-blue-400"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          {greeting && <p className="text-lg text-dodgerblue mb-4">{greeting}</p>}
          <div className="grid grid-cols-3 gap-2">
            {board.map((cell, index) => (
              <button
                key={index}
                className="border border-gray-400 w-20 h-20 flex items-center justify-center text-3xl bg-white hover:bg-gray-200 focus:outline-none"
                disabled={cell !== null || winner !== null}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </button>
            ))}
          </div>
          <button className="border border-dodgerblue rounded-md px-4 py-2 mt-8 bg-blue-600 text-dodgerblue text-lg hover:bg-blue-500" onClick={resetGame}>RESET</button>
          <p className="mt-8 font-normal text-dodgerblue text-lg">{winner ? `${winner === 'tie' ? 'It\'s a tie!' : `Player ${winner} wins!`}` : `Player ${currentPlayer === 'X' ? playerName : aiName}'s turn`}</p>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
