import React from 'react';
import { useStore } from '@/store/store';
import BoardDetail from '@/components/board/BoardDetail';
import CardDetail from '@/components/card/CardDetail';

const Board: React.FC = () => {
  const cardModule = useStore((s) => s.cardModule);

  return (
    <div className="bg-blue6">
      {cardModule && <CardDetail />}
      <BoardDetail />
    </div>
  );
};

export default Board;
