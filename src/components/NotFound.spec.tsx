import { render } from '@testing-library/react';
import NotFound from '@/components/NotFound';
import { MemoryRouter } from 'react-router-dom';

it('shows not found page', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
});
