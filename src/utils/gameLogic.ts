import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOS } from '../constants/tetrominos';
import { Position, Tetromino, TetrominoType } from '../types/tetris';

export const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

export const getRandomTetromino = (): Tetromino => {
  const tetrominoTypes = Object.keys(TETROMINOS) as TetrominoType[];
  const randomType = tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
  return TETROMINOS[randomType];
};

export const isValidMove = (
  board: number[][],
  tetromino: Tetromino,
  position: Position
): boolean => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const rotateTetromino = (tetromino: Tetromino): number[][] => {
  const rotated = tetromino.shape[0].map((_, i) =>
    tetromino.shape.map(row => row[i]).reverse()
  );
  return rotated;
};

export const clearLines = (board: number[][]): { newBoard: number[][], linesCleared: number } => {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const isLineFull = row.every(cell => cell !== 0);
    if (isLineFull) linesCleared++;
    return !isLineFull;
  });

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }

  return { newBoard, linesCleared };
};