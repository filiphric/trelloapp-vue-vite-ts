import { render } from '@testing-library/react';
import BoardItem from '@/components/board/BoardItem';
import { MemoryRouter } from 'react-router-dom';

it('shows board item', () => {
  render(
    <MemoryRouter>
      <BoardItem board={{ id: 1, name: 'test board', starred: false } as any} />
    </MemoryRouter>
  );
});
