import React from 'react';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox';
import Clock from '@/assets/icons/clock.svg';
import Pen from '@/assets/icons/pen.svg';
import moment from 'moment';

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const showCardModule = useStore((s) => s.showCardModule);

  const overdue = (card: Card) => {
    return card.deadline && moment(card.deadline).diff(moment().startOf('day'), 'days') < 1;
  };

  return (
    <div
      data-test-id="card"
      className="group grid relative p-2 my-1.5 w-full bg-white hover:bg-gray1 rounded border border-gray1 border-solid drop-shadow-sm cursor-pointer"
      onClick={() => showCardModule(card.id, true)}
    >
      <div className="flex px-1.5 pl-0.5">
        <Checkbox card={card} />
        <div className="flex-grow pl-2 text-sm text-gray-800 select-none" style={{ whiteSpace: 'break-spaces' }} data-test-id="card-text">
          {card.name}
        </div>
        <Pen data-test-id="card-edit" className="hidden group-hover:inline-block absolute top-2 right-2 p-1 w-5 h-5 text-gray-700 bg-gray1 bg-opacity-60" />
      </div>
      <div
        className={`py-1 px-1.5 mt-1 w-[fit-content] text-xs rounded-sm ${
          card.completed ? 'bg-green5 text-white' : overdue(card) ? 'bg-red-500 text-white' : 'text-gray9'
        }`}
        data-test-id="due-date"
      >
        <Clock className="inline-block w-4 h-4 fill-current" />
        <span className="ml-2">{new Date(card.deadline).toDateString().substring(4)}</span>
      </div>
    </div>
  );
};

export default CardItem;
