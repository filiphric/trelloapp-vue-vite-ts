import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useStore } from '@/store/store';
import { useParams, Link } from 'react-router-dom';
import BoardOptions from '@/components/board/BoardOptions';
import ListCreate from '@/components/list/ListCreate';
import ListItem from '@/components/list/ListItem';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import Star from '@/assets/icons/star.svg';
import Board from '@/typings/board';
import Card from '@/typings/card';
import List from '@/typings/list';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useClickOutside } from '@/hooks/useClickOutside';

const BoardDetail: React.FC = () => {
  const params = useParams();
  const boardId = Number(params.board);
  const state = useStore();
  const wrapperRef = useRef<HTMLInputElement>(null);

  const onClickAway = useCallback(() => {}, []);
  useClickOutside(wrapperRef, onClickAway);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cardParam = searchParams.get('card');
    state.getBoardDetail(boardId, cardParam || undefined);
  }, [boardId]);

  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    setBoardName((state.board as Board).name || '');
  }, [(state.board as Board).name]);

  const handleBoardNameChange = () => {
    if (boardName !== (state.board as Board).name) {
      state.patchBoard(state.board as Board, { name: boardName });
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'list') {
      const newLists = [...state.lists];
      const [moved] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, moved);
      useStore.setState({ lists: newLists });
      state.sortLists();
      return;
    }

    if (type === 'card') {
      const newLists = state.lists.map((l: List) => ({ ...l, cards: [...(l.cards || [])] }));
      const sourceListIndex = newLists.findIndex((l: List) => String(l.id) === source.droppableId);
      const destListIndex = newLists.findIndex((l: List) => String(l.id) === destination.droppableId);
      const [movedCard] = newLists[sourceListIndex].cards.splice(source.index, 1);
      newLists[destListIndex].cards.splice(destination.index, 0, movedCard);
      useStore.setState({ lists: newLists });

      // Patch all cards in affected lists
      newLists[destListIndex].cards.forEach((card: Card, order: number) => {
        state.patchCard(card, { listId: newLists[destListIndex].id, order });
      });
      if (sourceListIndex !== destListIndex) {
        newLists[sourceListIndex].cards.forEach((card: Card, order: number) => {
          state.patchCard(card, { listId: newLists[sourceListIndex].id, order });
        });
      }
    }
  };

  if (state.loading) {
    return (
      <div className="grid bg-blue6">
        <div className="grid justify-center content-center h-screen">
          <div>
            <LoadingIcon className="inline-block mb-1" />
            &nbsp;&nbsp;Loading data ...
          </div>
        </div>
      </div>
    );
  }

  if (state.loadingError.show) {
    return (
      <div className="grid bg-white">
        <div className="grid justify-center content-center h-screen" data-test-id="board-list-error-message">
          <span className="block mb-4 text-8xl font-bold text-center text-gray-200">{state.loadingError.status}</span>
          <p className="block mb-4 text-center text-gray-400">{state.loadingError.message || 'There was an error loading board'}</p>
          <Link to="/" className="block font-semibold text-center text-blue7">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid bg-blue6">
      <div className="overflow-x-auto whitespace-nowrap" style={{ height: 'calc(100vh - 40px)' }} data-test-id="board-detail">
        <div className="py-2.5">
          <div className="inline-block relative py-1.5 mr-0 ml-3 h-8">
            <div className="inline-block invisible px-3 font-bold">{boardName}</div>
            <input
              ref={wrapperRef}
              value={boardName}
              className="absolute top-0 right-0 bottom-0 left-0 pl-3 w-full font-bold text-white focus:text-black bg-white focus:bg-gray1 bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-100 rounded-sm outline-none cursor-pointer"
              data-test-id="board-title"
              autoComplete="off"
              name="board-title"
              onChange={(e) => setBoardName(e.target.value)}
              onFocus={(e) => (e.target as HTMLInputElement).select()}
              onBlur={handleBoardNameChange}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />
          </div>
          <div
            className={`inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer ${
              (state.board as Board).starred ? 'fill-current text-yellow-300' : 'stroke-current text-white'
            }`}
            data-test-id="star"
            onClick={() => state.patchBoard(state.board as Board, { starred: !(state.board as Board).starred })}
          >
            <Star className="place-self-center m-2" />
          </div>
          <BoardOptions board={state.board as Board} />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="list">
            {(provided) => (
              <div className="inline-block" ref={provided.innerRef} {...provided.droppableProps}>
                {state.lists.map((list: List, index: number) => (
                  <Draggable key={list.id} draggableId={`list-${list.id}`} index={index}>
                    {(provided) => (
                      <div
                        className="inline-block align-top"
                        data-test-id="list-placeholder"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem list={list} index={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="inline-block align-top">
          <ListCreate board={(state.board as Board).id} />
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
