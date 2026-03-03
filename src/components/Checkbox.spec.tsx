import { render } from '@testing-library/react';
import Checkbox from '@/components/Checkbox';

it('shows checkbox', () => {
  render(<Checkbox card={{ id: 1, completed: false } as any} />);
});
