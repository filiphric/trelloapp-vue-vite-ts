import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
    </MemoryRouter>
  );
});

it('shows a navbar on home page', () => {
  expect(screen.getByTestId('home')).toHaveClass('invisible');
});
