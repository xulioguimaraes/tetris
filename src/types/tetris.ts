export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export type Position = {
  x: number;
  y: number;
};

export type Tetromino = {
  shape: number[][];
  color: string;
  type: TetrominoType;
};

export type GameState = {
  board: number[][];
  currentPiece: Tetromino | null;
  currentPosition: Position;
  score: number;
  level: number;
  gameOver: boolean;
  isPlaying: boolean;
};