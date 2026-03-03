import { render, screen } from '@testing-library/react';
import SaveButton from '@/components/SaveButton';

it('renders a message', () => {
  const buttontext = 'Add list';

  render(<SaveButton buttontext={buttontext} />);

  expect(screen.getByRole('button')).toHaveTextContent(buttontext);
});
