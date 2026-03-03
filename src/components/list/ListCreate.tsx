import React, { useState, useRef, useCallback } from 'react';
import { useStore } from '@/store/store';
import Cross from '@/assets/icons/cross.svg';
import Plus from '@/assets/icons/plus.svg';
import SaveButton from '@/components/SaveButton';
import { useClickOutside } from '@/hooks/useClickOutside';

interface ListCreateProps {
  board?: number;
}

const ListCreate: React.FC<ListCreateProps> = () => {
  const board = useStore((s) => s.board);
  const createListInput = useStore((s) => s.createListInput);
  const lists = useStore((s) => s.lists);
  const createList = useStore((s) => s.createList);
  const [listTitle, setListTitle] = useState('');
  const [showInput, setShowInput] = useState(createListInput);
  const listCreateRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onClickAway = useCallback(() => {
    setShowInput(false);
    setListTitle('');
  }, []);

  useClickOutside(wrapperRef, onClickAway);

  const addList = () => {
    if (!listTitle) return;
    const boardId = (board as any).id;
    createList(boardId, listTitle);
    setListTitle('');
  };

  const enableInput = () => {
    setShowInput(true);
    setTimeout(() => listCreateRef.current?.focus(), 0);
  };

  if (showInput) {
    return (
      <div ref={wrapperRef} className="grid py-1 px-1.5 ml-3 w-list bg-gray2 rounded-sm shadow-md cursor-pointer">
        <input
          ref={listCreateRef}
          value={listTitle}
          className="py-2 px-2 w-full h-9 text-sm rounded-sm border-2 border-transparent focus:border-blue6 outline-none"
          data-test-id="add-list-input"
          placeholder="Enter list title..."
          onChange={(e) => setListTitle(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addList();
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              setShowInput(false);
              setListTitle('');
            }
          }}
        />
        <div>
          <SaveButton buttontext="Add list" onClick={addList} />
          <Cross
            className="inline-block order-last p-1 mx-0.5 w-8 h-8 text-gray-600 fill-current"
            data-test-id="cancel"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setShowInput(false);
              setListTitle('');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-2.5 ml-3 w-list text-sm text-gray-50 bg-white bg-opacity-20 hover:bg-opacity-30 rounded cursor-pointer flex-no-shrink"
      data-test-id="create-list"
      onClick={enableInput}
    >
      <Plus className="inline-block w-3 h-3" /> {!lists.length ? 'Add a list' : 'Add another list'}
    </div>
  );
};

export default ListCreate;
