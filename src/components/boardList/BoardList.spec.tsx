import { render } from '@testing-library/react';
import BoardList from '@/components/boardList/BoardList';
import { MemoryRouter } from 'react-router-dom';

it('mounts', () => {
  render(
    <MemoryRouter>
      <BoardList />
    </MemoryRouter>
  );
});
