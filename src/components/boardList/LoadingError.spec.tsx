import { render } from '@testing-library/react';
import LoadingError from '@/components/boardList/LoadingError';

it('shows loading error', () => {
  render(<LoadingError />);
});
