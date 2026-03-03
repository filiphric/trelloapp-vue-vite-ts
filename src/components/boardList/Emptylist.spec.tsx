import { render } from '@testing-library/react';
import Emptylist from '@/components/boardList/Emptylist';
import { MemoryRouter } from 'react-router-dom';

it('shows empty list', () => {
  render(
    <MemoryRouter>
      <Emptylist />
    </MemoryRouter>
  );
});
