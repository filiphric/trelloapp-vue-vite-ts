import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useStore } from '@/store/store';
import Attachment from '@/assets/icons/attachment.svg';
import BoardIcon from '@/assets/icons/board.svg';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox';
import Clock from '@/assets/icons/clock.svg';
import Copy from '@/assets/icons/copy.svg';
import Cross from '@/assets/icons/cross.svg';
import Download from '@/assets/icons/download.svg';
import DescriptionIcon from '@/assets/icons/description.svg';
import Downarrow from '@/assets/icons/downarrow.svg';
import Dropzone from '@/components/Dropzone';
import List from '@/typings/list';
import Trash from '@/assets/icons/trash.svg';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';

const CardDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNotification = useStore((s) => s.showNotification);
  const showCardModule = useStore((s) => s.showCardModule);
  const patchCard = useStore((s) => s.patchCard);
  const deleteCard = useStore((s) => s.deleteCard);
  const lists = useStore((s) => s.lists);
  const activeCard = useStore((s) => s.activeCard) as Card;

  const cardList = lists.find((l: List) => l.id === activeCard.listId);
  const cardListName = cardList ? cardList.name : '';

  const [showDate, setShowDate] = useState(false);
  const [cardName, setCardName] = useState(activeCard.name || '');
  const [description, setDescription] = useState(activeCard.description || '');
  const dateRef = useRef<HTMLDivElement>(null);
  const cardNameRef = useRef<HTMLInputElement>(null);

  useClickOutside(dateRef, () => setShowDate(false));

  useEffect(() => {
    setCardName(activeCard.name || '');
    setDescription(activeCard.description || '');
  }, [activeCard.name, activeCard.description]);

  useEffect(() => {
    navigate(`${location.pathname}?card=${activeCard.id}`, { replace: true });
  }, []);

  const updateDate = (date: Date | null) => {
    if (!date) return;
    const formattedDate = moment(date).format('YYYY-MM-DD');
    patchCard(activeCard, { deadline: formattedDate });
    setShowDate(false);
  };

  const copyProperties = (content: Card) => {
    const clipBoardValue = JSON.stringify(content, null, 2);
    const clipboard = window.navigator.clipboard;
    showNotification('Card info copied to clipboard', false);
    return clipboard.writeText(clipBoardValue);
  };

  const overdue = (card: Card) => {
    return card.deadline && moment(card.deadline).diff(moment().startOf('day'), 'days') < 1;
  };

  const closeCard = () => {
    showCardModule(activeCard.id, false);
    navigate(location.pathname);
  };

  return (
    <div
      className="flex fixed top-0 left-0 z-40 justify-center items-center w-full h-full bg-backdrop"
      data-test-id="card-detail-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCard();
      }}
    >
      <div className="grid overflow-scroll grid-cols-8 gap-x-2 p-8 w-cardDetail h-5/6 bg-gray2" data-test-id="card-detail">
        <div className="col-span-6 text-gray-800">
          <div className="mb-4 ml-9">
            <div className="inline-block">
              <BoardIcon className="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
            </div>
            <input
              ref={cardNameRef}
              value={cardName}
              className="py-1 focus:px-1.5 w-full font-bold bg-gray2 focus:bg-white rounded-sm cursor-pointer"
              data-test-id="card-detail-title"
              onFocus={(e) => (e.target as HTMLInputElement).select()}
              onChange={(e) => setCardName(e.target.value)}
              onBlur={() => {
                if (cardName !== activeCard.name) {
                  patchCard(activeCard, { name: cardName });
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />
            <h2 className="text-sm text-gray10">
              in list{' '}
              <span className="underline" data-test-id="card-list-name">
                {cardListName}
              </span>
            </h2>
          </div>
          <div className="mb-4 ml-9">
            <h2 className="block text-sm text-gray10 cursor-default">DUE DATE</h2>
            <div className="inline-block mt-2">
              <Checkbox card={activeCard} />
              <h2 className="inline-block py-1 px-4 font-light text-gray-800 bg-gray3 hover:bg-gray5 rounded-sm cursor-default">
                {new Date(activeCard.deadline).toDateString()}
                {activeCard.completed && <div className="inline-block px-2 mx-1 text-sm text-white bg-green5 rounded-sm">COMPLETED</div>}
                {overdue(activeCard) && !activeCard.completed && <div className="inline-block px-2 mx-1 text-sm text-white bg-red-500 rounded-sm">OVERDUE</div>}
                <button data-test-id="calendar-dropdown" onClick={() => setShowDate(true)}>
                  <Downarrow className="inline-block py-2 pl-2 w-5 text-gray-800 cursor-pointer fill-current stroke-current" />
                </button>
              </h2>
              {showDate && (
                <div className="absolute" ref={dateRef} data-test-id="card-detail-deadline">
                  <DatePicker selected={new Date(activeCard.deadline)} onChange={updateDate} inline showYearDropdown showMonthDropdown dropdownMode="select" />
                </div>
              )}
            </div>
          </div>
          <div className="mb-4 ml-9">
            <div className="inline-block">
              <DescriptionIcon className="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
            </div>
            <h1 className="inline-block mb-4 text-lg font-semibold text-black">Description</h1>
            <textarea
              value={description}
              className="p-3 w-full h-36 resize-none"
              data-test-id="card-description"
              onFocus={(e) => (e.target as HTMLTextAreaElement).select()}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {
                if (description !== activeCard.description) {
                  patchCard(activeCard, { description });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.target as HTMLTextAreaElement).blur();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Escape') {
                  (e.target as HTMLTextAreaElement).blur();
                }
              }}
            />
          </div>
          <div className="mb-4 ml-9">
            <div className="inline-block">
              <Attachment className="-mb-1 -ml-8 w-5 h-5 text-gray-800 fill-current stroke-current" />
            </div>
            <h1 className="inline-block mb-4 text-lg font-semibold text-black">Image</h1>
            {activeCard.image ? (
              <div className="grid grid-cols-6 gap-x-4" data-test-id="image-attachment">
                <div className="col-span-2 row-span-2">
                  <img src={'/backend' + activeCard.image} />
                </div>
                <div className="col-span-4 font-bold">
                  {activeCard.image.replace(`/data/uploaded/${activeCard.id}_`, '')}
                  <a className="block font-normal underline cursor-pointer" data-test-id="image-download" href={'/backend' + activeCard.image} download>
                    <Download className="inline-block mb-1 w-4" />
                    Download
                  </a>
                  <div
                    className="block font-normal underline cursor-pointer"
                    data-test-id="image-delete"
                    onClick={() => patchCard(activeCard, { image: null } as any)}
                  >
                    <Cross className="inline-block mb-1 w-4" />
                    Delete
                  </div>
                </div>
              </div>
            ) : (
              <Dropzone card={activeCard} />
            )}
          </div>
        </div>
        <div className="grid col-span-2 gap-y-2 content-start">
          <div className="grid self-end place-content-center place-self-end w-8 h-8 hover:bg-gray5 cursor-pointer">
            <Cross data-test-id="cancel" className="w-6 h-6 text-gray-600 fill-current" onClick={closeCard} />
          </div>
          <div
            className="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
            data-test-id="calendar-button"
            onClick={() => setShowDate(true)}
          >
            <Clock className="inline-block mr-2 mb-0.5 w-4" />
            Due date
          </div>
          <div
            className="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
            data-test-id="copy-properties"
            onClick={() => copyProperties(activeCard)}
          >
            <Copy className="inline-block mr-2 mb-0.5 w-4" />
            Copy attributes
          </div>
          <div
            className="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
            data-test-id="card-detail-delete"
            onClick={() => {
              deleteCard(activeCard);
              navigate(location.pathname);
            }}
          >
            <Trash className="inline-block mr-2 mb-0.5 w-4" />
            Delete card
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
