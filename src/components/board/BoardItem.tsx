import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '@/typings/board';
import Star from '@/assets/icons/star.svg';
import { useStore } from '@/store/store';

interface BoardItemProps {
  board: Board;
}

const BoardItem: React.FC<BoardItemProps> = ({ board }) => {
  const patchBoard = useStore((s) => s.patchBoard);
  const navigate = useNavigate();
  const [showStar, setShowStar] = useState(false);

  return (
    <div
      className="grid grid-cols-6 justify-between py-3 px-4 w-72 h-36 bg-blue7 hover:bg-blue8 rounded-sm cursor-pointer"
      id={`board-${board.id}`}
      data-test-id="board-item"
      onClick={() => navigate(`/board/${board.id}`)}
      onMouseOver={() => setShowStar(true)}
      onMouseOut={() => setShowStar(false)}
    >
      <h2 className="col-span-5 font-bold text-white">{board.name}</h2>
      {showStar && (
        <div
          data-test-id="star"
          className="justify-self-end self-start"
          onClick={(e) => {
            e.stopPropagation();
            patchBoard(board, { starred: !board.starred });
          }}
        >
          <Star className={`col-span-1 w-5 h-5 ${board.starred ? 'fill-current text-yellow-300' : 'stroke-current text-white'}`} />
        </div>
      )}
    </div>
  );
};

export default BoardItem;
