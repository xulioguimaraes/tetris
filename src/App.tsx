import React from 'react';
import { useGameLoop } from './hooks/useGameLoop';
import Board from './components/Board';
import GameStats from './components/GameStats';
import { Gamepad2, Play, Pause } from 'lucide-react';

function App() {
  const { 
    board, 
    score, 
    level, 
    gameOver, 
    isPlaying, 
    startGame, 
    togglePause,
    currentPiece,
    currentPosition
  } = useGameLoop();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8" />
            <h1 className="text-4xl font-bold">React Tetris</h1>
          </div>
          
          <div className="flex gap-8">
            <Board 
              board={board} 
              currentPiece={currentPiece} 
              currentPosition={currentPosition}
            />
            <div className="flex flex-col gap-4">
              <GameStats score={score} level={level} />
              
              {!isPlaying && !gameOver && (
                <button
                  onClick={startGame}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Start Game
                </button>
              )}

              {isPlaying && !gameOver && (
                <button
                  onClick={togglePause}
                  className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  <Pause className="w-5 h-5" />
                  Pause Game
                </button>
              )}

              {gameOver && (
                <div className="bg-red-600 p-4 rounded-lg text-center">
                  <h2 className="text-xl font-bold">Game Over!</h2>
                  <button
                    onClick={startGame}
                    className="mt-4 bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              )}

              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Controls</h2>
                <ul className="space-y-2">
                  <li>← → : Move</li>
                  <li>↑ : Rotate</li>
                  <li>↓ : Soft Drop</li>
                  <li>Space : Pause</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;