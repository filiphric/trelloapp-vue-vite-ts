import React from 'react';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const Tools: React.FC = () => {
  const { reset, resetBoards, resetLists, resetCards, resetUsers } = useStore();
  const navigate = useNavigate();

  return (
    <div className="fixed right-0 bottom-0 p-5 m-3 rounded-sm" style={{ background: 'rgb(0 0 0 / 0.1)' }} data-test-id="api-tools">
      Reset application:
      <button
        className="px-1 m-1 bg-white border border-black"
        onClick={() => {
          reset();
          navigate('/');
        }}
      >
        All
      </button>
      <button
        className="px-1 m-1 bg-white border border-black"
        onClick={() => {
          resetBoards();
          navigate('/');
        }}
      >
        Boards
      </button>
      <button className="px-1 m-1 bg-white border border-black" onClick={() => resetLists()}>
        Lists
      </button>
      <button className="px-1 m-1 bg-white border border-black" onClick={() => resetCards()}>
        Cards
      </button>
      <button className="px-1 m-1 bg-white border border-black" onClick={() => resetUsers()}>
        Users
      </button>
    </div>
  );
};

export default Tools;
