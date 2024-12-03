import React from 'react';
import Cell from './Cell';
import { GameState } from '../types/tetris';

interface BoardProps {
  board: number[][];
  currentPiece: GameState['currentPiece'];
  currentPosition: GameState['currentPosition'];
}

const Board: React.FC<BoardProps> = ({ board, currentPiece, currentPosition }) => {
  const getDisplayBoard = () => {
    // Create a deep copy of the board to avoid modifying the original
    const displayBoard = board.map(row => [...row]);

    // Only add the current piece at its current position
    if (currentPiece) {
      const tetrominoTypeIndex = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'].indexOf(currentPiece.type) + 1;
      
      // Only render the piece at its current position
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = y + currentPosition.y;
            const boardX = x + currentPosition.x;
            
            // Only draw if within bounds and the position is valid
            if (
              boardY >= 0 && 
              boardY < displayBoard.length && 
              boardX >= 0 && 
              boardX < displayBoard[0].length
            ) {
              displayBoard[boardY][boardX] = tetrominoTypeIndex;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  return (
    <div className="grid gap-[1px] bg-gray-800 p-1">
      {getDisplayBoard().map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <Cell key={`${y}-${x}`} type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Board);