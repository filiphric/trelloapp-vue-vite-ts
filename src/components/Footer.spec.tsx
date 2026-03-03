import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

it('shows footer', () => {
  render(<Footer />);

  expect(screen.getByTestId('footer-link')).toBeVisible();
  expect(screen.getByTestId('footer-link')).toHaveTextContent('❤️');
});
