import React from 'react';

interface CellProps {
  type: number;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 0:
        return 'bg-gray-900';
      case 1: // I
        return 'bg-[#00f0f0]';
      case 2: // J
        return 'bg-[#0000f0]';
      case 3: // L
        return 'bg-[#f0a000]';
      case 4: // O
        return 'bg-[#f0f000]';
      case 5: // S
        return 'bg-[#00f000]';
      case 6: // T
        return 'bg-[#a000f0]';
      case 7: // Z
        return 'bg-[#f00000]';
      default:
        return 'bg-gray-900';
    }
  };
  
  return (
    <div
      className={`w-6 h-6 border border-gray-800 ${type === 0 ? '' : 'shadow-inner'} ${getBackgroundColor()}`}
    />
  );
};

export default React.memo(Cell);