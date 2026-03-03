import React from 'react';
import Plus from '@/assets/icons/plus.svg';

interface CardCreateButtonProps {
  onToggleInput: (flag: boolean) => void;
}

const CardCreateButton: React.FC<CardCreateButtonProps> = ({ onToggleInput }) => {
  return (
    <div
      className="py-1.5 px-2 text-sm font-normal text-gray-500 hover:text-gray-600 hover:bg-gray4 rounded-md cursor-pointer"
      onClick={() => onToggleInput(true)}
    >
      <Plus className="inline-block w-3 h-3" />
      <div data-test-id="new-card">Add another card</div>
    </div>
  );
};

export default CardCreateButton;
