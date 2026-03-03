import { render } from '@testing-library/react';
import CardCreateInput from '@/components/card/CardCreateInput';

it('shows card create input', () => {
  render(<CardCreateInput list={{ id: 1, cards: [] } as any} onToggleInput={() => {}} />);
});
