import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tools from '@/components/Tools';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from '@/store/store';
import { vi } from 'vitest';

it('renders a message', async () => {
  const mockReset = vi.fn();
  const mockResetBoards = vi.fn();
  const mockResetLists = vi.fn();
  const mockResetCards = vi.fn();
  const mockResetUsers = vi.fn();

  useStore.setState({
    reset: mockReset,
    resetBoards: mockResetBoards,
    resetLists: mockResetLists,
    resetCards: mockResetCards,
    resetUsers: mockResetUsers,
  });

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Tools />
    </MemoryRouter>
  );

  await user.click(screen.getByText('All'));
  expect(mockReset).toHaveBeenCalled();

  await user.click(screen.getByText('Boards'));
  expect(mockResetBoards).toHaveBeenCalled();

  await user.click(screen.getByText('Lists'));
  expect(mockResetLists).toHaveBeenCalled();

  await user.click(screen.getByText('Cards'));
  expect(mockResetCards).toHaveBeenCalled();

  await user.click(screen.getByText('Users'));
  expect(mockResetUsers).toHaveBeenCalled();
});
