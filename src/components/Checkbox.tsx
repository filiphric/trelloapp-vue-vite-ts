import React from 'react';
import { useStore } from '@/store/store';
import Card from '@/typings/card';

interface CheckboxProps {
  card: Card;
}

const Checkbox: React.FC<CheckboxProps> = ({ card }) => {
  const patchCard = useStore((s) => s.patchCard);

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        data-test-id="card-checkbox"
        checked={card.completed}
        className="w-4 h-4 text-blue5 outline-none"
        onClick={(e) => {
          e.stopPropagation();
          patchCard(card, { completed: !card.completed });
        }}
        readOnly
      />
    </label>
  );
};

export default Checkbox;
