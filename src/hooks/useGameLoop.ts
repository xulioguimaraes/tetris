import { useState, useEffect, useCallback } from 'react';
import { GameState, Position } from '../types/tetris';
import {
  createEmptyBoard,
  getRandomTetromino,
  isValidMove,
  rotateTetromino,
  clearLines
} from '../utils/gameLogic';
import { INITIAL_SPEED, BOARD_WIDTH } from '../constants/tetrominos';

export const useGameLoop = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    currentPosition: { x: 0, y: 0 },
    score: 0,
    level: 1,
    gameOver: false,
    isPlaying: false
  });

  const startGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: null,
      currentPosition: { x: 0, y: 0 },
      score: 0,
      level: 1,
      gameOver: false,
      isPlaying: true
    });
  }, []);

  const togglePause = useCallback(() => {
    if (!gameState.gameOver) {
      setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  }, [gameState.gameOver]);

  const spawnNewPiece = useCallback(() => {
    const newPiece = getRandomTetromino();
    const newPosition = {
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2),
      y: 0
    };

    if (!isValidMove(gameState.board, newPiece, newPosition)) {
      setGameState(prev => ({ ...prev, gameOver: true, isPlaying: false }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentPiece: newPiece,
      currentPosition: newPosition
    }));
  }, [gameState.board]);

  const mergePieceToBoard = useCallback(() => {
    if (!gameState.currentPiece) return;

    const newBoard = [...gameState.board.map(row => [...row])];
    const tetrominoTypeIndex = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'].indexOf(gameState.currentPiece.type) + 1;

    gameState.currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = y + gameState.currentPosition.y;
          const boardX = x + gameState.currentPosition.x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = tetrominoTypeIndex;
          }
        }
      });
    });

    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
    const newScore = gameState.score + (linesCleared * 100 * gameState.level);
    const newLevel = Math.floor(newScore / 1000) + 1;

    setGameState(prev => ({
      ...prev,
      board: clearedBoard,
      score: newScore,
      level: newLevel,
      currentPiece: null
    }));
  }, [gameState]);

  const moveDown = useCallback(() => {
    if (!gameState.currentPiece) return;

    const newPosition: Position = {
      x: gameState.currentPosition.x,
      y: gameState.currentPosition.y + 1
    };

    if (isValidMove(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({ ...prev, currentPosition: newPosition }));
    } else {
      mergePieceToBoard();
    }
  }, [gameState, mergePieceToBoard]);

  const moveHorizontally = useCallback((direction: number) => {
    if (!gameState.currentPiece || !gameState.isPlaying) return;

    const newPosition: Position = {
      x: gameState.currentPosition.x + direction,
      y: gameState.currentPosition.y
    };

    if (isValidMove(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({ ...prev, currentPosition: newPosition }));
    }
  }, [gameState]);

  const rotate = useCallback(() => {
    if (!gameState.currentPiece || !gameState.isPlaying) return;

    const rotatedShape = rotateTetromino(gameState.currentPiece);
    const rotatedPiece = { ...gameState.currentPiece, shape: rotatedShape };

    if (isValidMove(gameState.board, rotatedPiece, gameState.currentPosition)) {
      setGameState(prev => ({ ...prev, currentPiece: rotatedPiece }));
    }
  }, [gameState]);

  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;
    if (!gameState.currentPiece) {
      spawnNewPiece();
    }
  }, [gameState.currentPiece, gameState.gameOver, gameState.isPlaying, spawnNewPiece]);

  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    const speed = Math.max(INITIAL_SPEED - (gameState.level - 1) * 100, 100);
    const gameLoop = setInterval(() => {
      moveDown();
    }, speed);

    return () => clearInterval(gameLoop);
  }, [gameState.gameOver, gameState.level, gameState.isPlaying, moveDown]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.gameOver) return;

      if (event.code === 'Space') {
        togglePause();
        return;
      }

      if (!gameState.isPlaying) return;

      switch (event.key) {
        case 'ArrowLeft':
          moveHorizontally(-1);
          break;
        case 'ArrowRight':
          moveHorizontally(1);
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver, gameState.isPlaying, moveHorizontally, moveDown, rotate, togglePause]);

  return { ...gameState, startGame, togglePause };
};