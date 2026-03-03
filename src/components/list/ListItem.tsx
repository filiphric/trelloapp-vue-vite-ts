import React, { useState, useRef, useCallback } from 'react';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import CardCreateInput from '@/components/card/CardCreateInput';
import CardItem from '@/components/card/CardItem';
import ListOptions from '@/components/list/ListOptions';
import ListType from '@/typings/list';
import Plus from '@/assets/icons/plus.svg';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useClickOutside } from '@/hooks/useClickOutside';

interface ListItemProps {
  list: ListType;
  index: number;
}

const ListItem: React.FC<ListItemProps> = ({ list }) => {
  const [cardCreate, setCardCreate] = useState(false);
  const patchList = useStore((s) => s.patchList);
  const loadingListCards = useStore((s) => s.loadingListCards);
  const wrapperRef = useRef<HTMLInputElement>(null);

  const onClickAway = useCallback(() => {}, []);
  useClickOutside(wrapperRef, onClickAway);

  const showCardCreate = (flag: boolean) => {
    setCardCreate(flag);
  };

  return (
    <div className="relative p-1.5 mb-32 ml-3 w-list bg-gray2 rounded shadow-md" data-test-id="list">
      <div className="flex mb-1">
        <input
          ref={wrapperRef}
          className="inline-block flex-grow py-0.5 px-1 h-8 text-sm font-semibold text-gray-900 bg-gray2 focus:bg-gray1 rounded-sm border-2 border-transparent focus:border-blue6 outline-none cursor-pointer"
          data-test-id="list-name"
          defaultValue={list.name}
          onMouseUp={(e) => {
            (e.target as HTMLInputElement).select();
          }}
          onChange={(e) => {
            patchList(list, { name: e.target.value });
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        <ListOptions list={list} onToggleInput={showCardCreate} />
      </div>
      <div data-test-id="card-list">
        {loadingListCards[list.id] && (
          <div className="block place-self-center text-xs text-center">
            <LoadingIcon className="inline-block mb-1" />
            &nbsp;&nbsp;Loading cards ...
          </div>
        )}
        <Droppable droppableId={String(list.id)} type="card">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[2px]">
              {list.cards?.map((card: Card, cardIndex: number) => (
                <Draggable key={card.id} draggableId={String(card.id)} index={cardIndex}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <CardItem card={card} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {!cardCreate ? (
          <div
            className="py-1.5 px-2 text-sm font-normal text-gray-500 hover:text-gray-600 hover:bg-gray4 rounded-md cursor-pointer"
            data-test-id="new-card"
            onClick={() => showCardCreate(true)}
          >
            <Plus className="inline-block w-3 h-3" />
            Add another card
          </div>
        ) : (
          <CardCreateInput list={list} onToggleInput={showCardCreate} />
        )}
      </div>
    </div>
  );
};

export default ListItem;
