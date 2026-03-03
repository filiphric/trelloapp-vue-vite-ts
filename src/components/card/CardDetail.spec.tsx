import { render } from '@testing-library/react';
import CardDetail from '@/components/card/CardDetail';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from '@/store/store';

it('shows card detail', () => {
  useStore.setState({
    activeCard: { id: 1, name: 'test', deadline: '2023-01-01', listId: 1, description: '' },
    lists: [{ id: 1, name: 'list', cards: [] }],
  } as any);
  render(
    <MemoryRouter>
      <CardDetail />
    </MemoryRouter>
  );
});
