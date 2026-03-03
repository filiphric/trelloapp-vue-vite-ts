import { render } from '@testing-library/react';
import Signup from '@/components/Signup';
import { MemoryRouter } from 'react-router-dom';

it('shows signup', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});
