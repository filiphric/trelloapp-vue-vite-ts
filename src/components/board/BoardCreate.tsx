import React, { useState, useRef, useCallback } from 'react';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '@/components/SaveButton';
import { useClickOutside } from '@/hooks/useClickOutside';

const BoardCreate: React.FC = () => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardInputActive, setNewBoardInputActive] = useState(false);
  const boardCreateInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const createBoard = useStore((s) => s.createBoard);

  const onClickAway = useCallback(() => {
    setNewBoardInputActive(false);
    setNewBoardTitle('');
  }, []);

  useClickOutside(wrapperRef, onClickAway);

  const focusNewBoardInput = () => {
    setNewBoardInputActive(true);
    setTimeout(() => boardCreateInputRef.current?.focus(), 0);
  };

  const redirectToNewBoard = async () => {
    const board = await createBoard(newBoardTitle);
    if (board?.id) navigate(`/board/${board.id}`);
  };

  return (
    <div
      ref={wrapperRef}
      data-test-id="create-board"
      className={`bg-gray6 cursor-pointer grid h-36 px-4 py-3 rounded-sm w-72 ${!newBoardInputActive ? 'hover:bg-gray7' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        focusNewBoardInput();
      }}
    >
      {!newBoardInputActive && <h1 className="text-white">Create new board</h1>}
      {newBoardInputActive && (
        <>
          <input
            ref={boardCreateInputRef}
            value={newBoardTitle}
            className="px-2 w-full h-9 rounded-sm border-2 border-transparent focus:border-blue6 outline-none"
            data-test-id="new-board-input"
            placeholder="Add board title"
            onChange={(e) => setNewBoardTitle(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                redirectToNewBoard();
              }
            }}
          />
          <div className="flex flex-row-reverse justify-items-end items-end">
            <Cross
              data-test-id="cancel"
              className="order-last px-2 mx-1 w-9 h-9 text-gray-600 fill-current"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setNewBoardInputActive(false);
              }}
            />
            <SaveButton
              data-test-id="new-board-create"
              buttontext="Create board"
              onClick={() => {
                redirectToNewBoard();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BoardCreate;
