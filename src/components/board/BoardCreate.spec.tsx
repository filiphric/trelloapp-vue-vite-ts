import { render } from '@testing-library/react';
import BoardCreate from '@/components/board/BoardCreate';
import { MemoryRouter } from 'react-router-dom';

it('Loads board create component', () => {
  render(
    <MemoryRouter>
      <BoardCreate />
    </MemoryRouter>
  );
});
