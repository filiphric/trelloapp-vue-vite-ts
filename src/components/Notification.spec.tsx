import { render, screen, act } from '@testing-library/react';
import Notification from '@/components/Notification';
import { useStore } from '@/store/store';

it('renders a info message', () => {
  const message = 'This is an info message';

  render(<Notification />);

  act(() => {
    useStore.getState().showNotification(message, false);
  });

  expect(screen.getByTestId('notification-message')).toBeVisible();
  expect(screen.getByTestId('notification-message')).toHaveTextContent(message);
  expect(screen.getByTestId('info-icon')).toBeVisible();
});

it('renders a error message', () => {
  const message = 'This is an error message';

  render(<Notification />);

  act(() => {
    useStore.getState().showNotification(message, true);
  });

  expect(screen.getByTestId('notification-message')).toBeVisible();
  expect(screen.getByTestId('notification-message')).toHaveTextContent(message);
  expect(screen.getByTestId('error-icon')).toBeVisible();
});
