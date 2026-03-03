import { render } from '@testing-library/react';
import BoardDetail from '@/components/board/BoardDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

it('shows BoardDetail', () => {
  render(
    <MemoryRouter initialEntries={['/board/1']}>
      <Routes>
        <Route path="/board/:board" element={<BoardDetail />} />
      </Routes>
    </MemoryRouter>
  );
});
