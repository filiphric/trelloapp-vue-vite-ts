import { render } from '@testing-library/react';
import CardCreateButton from '@/components/card/CardCreateButton';

it('shows card create button', () => {
  render(<CardCreateButton onToggleInput={() => {}} />);
});
