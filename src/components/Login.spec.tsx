import { render } from '@testing-library/react';
import Login from '@/components/Login';
import { MemoryRouter } from 'react-router-dom';

it('shows login', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});
