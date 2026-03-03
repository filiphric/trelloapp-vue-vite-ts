import { render } from '@testing-library/react';
import ListCreate from '@/components/list/ListCreate';

it('shows list create button', () => {
  render(<ListCreate board={1} />);
});
