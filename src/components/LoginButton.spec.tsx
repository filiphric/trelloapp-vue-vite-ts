import { render } from '@testing-library/react';
import LoginButton from '@/components/LoginButton';
import { MemoryRouter } from 'react-router-dom';

it('shows login button', () => {
  render(
    <MemoryRouter>
      <LoginButton />
    </MemoryRouter>
  );
});
