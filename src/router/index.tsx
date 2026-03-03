import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from '@/components/boardList/BoardList';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Pricing from '@/components/Pricing';
import Board from '@/views/Board';
import NotFound from '@/components/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BoardList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/board/:board" element={<Board />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
