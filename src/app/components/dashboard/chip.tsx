'use client';

import React, { useState } from 'react';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-300 ${
        isSelected ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

const ChipComponent: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const chipData = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleChipClick = (label: string) => {
    setSelectedChip(label === selectedChip ? null : label);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {chipData.map((label) => (
        <Chip
          key={label}
          label={label}
          isSelected={selectedChip === label}
          onClick={() => handleChipClick(label)}
        />
      ))}
    </div>
  );
};

export default ChipComponent;
