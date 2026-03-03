import React, { useState } from 'react';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import startImg from '@/assets/start.png';

const Emptylist: React.FC = () => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const createBoard = useStore((s) => s.createBoard);
  const navigate = useNavigate();

  const redirectToNewBoard = async () => {
    const result = await createBoard(newBoardTitle);
    if (result?.id) {
      navigate(`/board/${result.id}`);
    }
  };

  return (
    <div className="grid z-10 grid-cols-2 gap-x-8 items-stretch px-20 h-screen">
      <div className="grid content-center">
        <h1 className="mb-8 text-3xl font-bold">Get started!</h1>
        <p>Go ahead and create your first board!</p>
        <input
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          type="text"
          data-test-id="first-board"
          className="px-2 mt-4 w-full h-8 bg-white rounded-sm border-2"
          placeholder="Name of your first board"
          name="newBoard"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              redirectToNewBoard();
            }
          }}
        />
      </div>
      <img className="gap-x-5 self-center place-self-center" src={startImg} />
    </div>
  );
};

export default Emptylist;
