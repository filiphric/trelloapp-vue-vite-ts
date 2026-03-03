import { render } from '@testing-library/react';
import CardItem from '@/components/card/CardItem';

it('shows card item', () => {
  render(<CardItem card={{ id: 1, name: 'test', deadline: '2023-01-01', completed: false } as any} />);
});
