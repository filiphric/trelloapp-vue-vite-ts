import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/store';
import Cross from '@/assets/icons/cross.svg';
import List from '@/typings/list';
import SaveButton from '@/components/SaveButton';
import { useClickOutside } from '@/hooks/useClickOutside';

interface CardCreateInputProps {
  list: List;
  onToggleInput: (flag: boolean) => void;
}

const CardCreateInput: React.FC<CardCreateInputProps> = ({ list, onToggleInput }) => {
  const board = useStore((s) => s.board);
  const createCard = useStore((s) => s.createCard);
  const [cardTitle, setCardTitle] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    onToggleInput(false);
    setCardTitle('');
  });

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const addCard = () => {
    if (!cardTitle) return;
    createCard({
      boardId: (board as any).id,
      listId: list.id,
      name: cardTitle,
    });
    setCardTitle('');
  };

  return (
    <div ref={wrapperRef} className="grid w-full cursor-pointer">
      <textarea
        ref={textareaRef}
        value={cardTitle}
        className="py-1 px-2 w-full h-16 text-sm rounded border-b border-gray7 outline-none resize-none"
        data-test-id="new-card-input"
        placeholder="Enter a title for this card..."
        onChange={(e) => setCardTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addCard();
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            onToggleInput(false);
            setCardTitle('');
          }
        }}
      />
      <div>
        <SaveButton buttontext="Add card" onClick={addCard} />
        <Cross
          data-test-id="cancel"
          className="inline-block order-last p-1 mx-0.5 w-8 h-8 text-gray-600 fill-current"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onToggleInput(false);
            setCardTitle('');
          }}
        />
      </div>
    </div>
  );
};

export default CardCreateInput;
