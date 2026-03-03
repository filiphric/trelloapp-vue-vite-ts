import React, { useState } from 'react';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import Board from '@/typings/board';
import Dots from '@/assets/icons/dots.svg';
import Dropdown from '@/components/common/Dropdown';
import DropdownItem from '@/components/common/DropdownItem';

interface BoardOptionsProps {
  board: Board;
}

const BoardOptions: React.FC<BoardOptionsProps> = ({ board }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const deleteBoard = useStore((s) => s.deleteBoard);

  return (
    <div className="inline-block relative">
      <button
        data-test-id="board-options"
        className="inline-grid self-center ml-2 w-8 h-8 text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
        onClick={() => setDropdown(true)}
      >
        <Dots className="place-self-center m-2" />
      </button>
      {dropdown && (
        <Dropdown data-test-id="board-dropdown" header="Board actions" onClose={() => setDropdown(false)}>
          <DropdownItem
            itemText="Delete board"
            warning={true}
            data-test-id="delete-board"
            onClick={() => {
              deleteBoard(board.id);
              navigate('/');
              setDropdown(false);
            }}
          />
        </Dropdown>
      )}
    </div>
  );
};

export default BoardOptions;
