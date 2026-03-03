import React, { useEffect } from 'react';
import { useStore } from '@/store/store';
import BoardCreate from '@/components/board/BoardCreate';
import BoardItem from '@/components/board/BoardItem';
import Emptylist from '@/components/boardList/Emptylist';
import LoadingError from '@/components/boardList/LoadingError';
import Loading from '@/components/Loading';

const BoardList: React.FC = () => {
  const state = useStore();
  const starred = state.starred();
  const allBoards = state.allBoards();

  useEffect(() => {
    state.getBoardList();
  }, []);

  return (
    <div className="grid h-screen bg-white background" style={{ height: 'calc(100vh - 40px)' }} data-test-id="board-list">
      <Loading />
      {state.loadingError.show && <LoadingError />}
      {!state.loading && !state.loadingError.show && (
        <div className="container mx-auto">
          {starred.length > 0 && (
            <div>
              <h1 className="inline-block py-5 mx-4 text-3xl font-semibold" data-test-id="starred-boards">
                Starred
              </h1>
              <div className="flex flex-wrap flex-grow gap-8 content-start mx-4 flex-cols-3">
                {starred.map((board) => (
                  <BoardItem key={board.id} board={board} />
                ))}
                {!allBoards.length && <BoardCreate />}
              </div>
            </div>
          )}
          {allBoards.length > 0 && (
            <div>
              <h1 className="inline-block py-5 mx-4 text-3xl font-semibold">My Boards</h1>
              <div className="flex flex-wrap flex-grow gap-8 content-start mx-4 flex-cols-3">
                {allBoards.map((board) => (
                  <BoardItem key={board.id} board={board} />
                ))}
                <BoardCreate />
              </div>
            </div>
          )}
        </div>
      )}
      {!state.loading && !state.boardList.all.length && !state.loadingError.show && <Emptylist />}
    </div>
  );
};

export default BoardList;
