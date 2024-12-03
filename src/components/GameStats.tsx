import React from 'react';

interface GameStatsProps {
  score: number;
  level: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Score</h2>
        <p className="text-2xl">{score}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Level</h2>
        <p className="text-2xl">{level}</p>
      </div>
    </div>
  );
};

export default GameStats;